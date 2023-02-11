;`use strict`

const crypto = require('crypto')
const DynamoDb = require('aws-sdk/clients/dynamodb')
const { v4: uuidv4 } = require('uuid')

const kms = require('kms')
const { sendMessageToClient } = require('mgmt')
const { GetUserByKeyId, GetLiveVariables, GetAllAioConnections, PutAnalytics } = require('db')

const objectSize = require('../libs/objectsize')
const { doConnect, doDisconnect } = require('./lib/connections')
const { getQqr } = require('./lib/lic')

const getIat = () => Math.round(new Date().getTime() / 1000)

const success = {
  statusCode: 200,
}

const generatePolicy = (principalId, Effect, Resource) => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect,
        Resource,
      },
    ],
  },
})

/**
 * This is the main handshake to establish the websocket connection that will be
 * maintained in the bot to send/receive information from the server.
 *
 * This will require that a user already has bound a key to this unique version
 * of the Capsule AIO app and is accessing the app from their same IP.
 *
 * There is a cryptographic verification of identity here:
 * The user's initial authorization is sent encrypted using the Capsule AIO public
 * key that was supplied to them when they did their initial bind. This is the same
 * public key supplied to all clients.
 * The server will decrypt the information and then verify the signature using the
 * user's public key that was sent at time of bind. That public key was generated
 * by the client and should be unique to each user and each bind instance.
 * @param {*} event
 * @param {*} context
 * @returns
 */
exports.authorizer = async (event, context) => {
  console.log('event', event)

  if (!event.queryStringParameters.auth || !event.queryStringParameters.sig) {
    console.error('Invalid token')
    throw new Error()
  }

  const { auth, sig } = event.queryStringParameters
  const ip = event.requestContext.identity.sourceIp

  // decode auth
  try {
    const decrypted = await kms.decrypt(auth)
    // console.log('decrypted', decrypted)

    var { lic, iat } = JSON.parse(decrypted.toString())
    // console.log('decrypted auth:', lic, iat)
  } catch (err) {
    console.error('Error decoding authorization', err)
    throw new Error()
  }

  if (typeof lic !== 'string' || typeof sig !== 'string' || typeof iat !== 'number')
    throw new Error('Invalid input format')

  try {
    var user = await GetUserByKeyId(lic)

    if (!user.bind) throw new Error('Not bound')
    if (user.bind.ip !== ip) throw new Error('Incorrect Ip')

    const verified = crypto
      .createVerify('sha256')
      .update(JSON.stringify({ lic, iat }))
      .verify(user.bind.userKey, sig, 'base64')

    if (!verified) throw new Error('Signature is not valid')
  } catch (err) {
    console.error('Error verifying user', err)
    throw new Error()
  }

  // check that iat is not older than 8 hours and not newer than 60 seconds
  const newIat = getIat()

  if (iat + 28800 < newIat || iat - 60 > newIat) {
    console.error('Invalid iat')
    throw new Error()
  }

  return generatePolicy(
    Buffer.from(
      JSON.stringify({
        ...user,
        activations: undefined,
        binds: undefined,
        discord_emails: undefined,
        discord_usernames: undefined,
        key: user.apiKey ? user.apiKey.key : undefined,
      }),
    ).toString('base64'),
    'Allow',
    event.methodArn,
  )
}

exports.connectionHandler = async (event, context) => {
  console.log('event:', event)

  switch (event.requestContext.routeKey) {
    case '$connect':
      await doConnect(event)
      break
    case '$disconnect':
      await doDisconnect(event)
      break
    default:
      console.log('unknown route key: ' + event.requestContext.routeKey)
      return
  }

  return success
}

exports.defaultHandler = async (event, context) => {
  console.log('event:', event)

  switch (event.requestContext.routeKey) {
    default:
      console.log('unknown route key:', event.requestContext.routeKey)
      break
  }

  return success
}

exports.getHello = async (event, context) => {
  console.log('event:', event)

  const {
    requestContext: {
      connectionId,
      authorizer: { principalId },
      identity: { sourceIp },
    },
  } = event

  const user = JSON.parse(Buffer.from(principalId, 'base64').toString('ascii'))
  console.log('user', user)

  const liveVariables = await GetLiveVariables()
  console.log('liveVaraibles', liveVariables)

  const lic = await getQqr(user)

  const body = JSON.stringify({
    action: 'helloReturn',
    id: user.id,
    avatar: user.discord.avatar,
    username: user.discord.username,
    discriminator: user.discord.discriminator,
    email: user.discord.email,
    key: user.key,
    liveVariables,
    lic,
  })

  return {
    ...success,
    body,
  }
}

exports.getQqrLicense = async (event, context) => {
  console.log('event:', event)

  const {
    requestContext: {
      connectionId,
      authorizer: { principalId },
      identity: { sourceIp },
    },
  } = event

  const user = JSON.parse(Buffer.from(principalId, 'base64').toString('ascii'))
  console.log('user', user)

  const lic = await getQqr(user)
  const body = JSON.stringify({ action: 'qqrLic', lic })

  return {
    statusCode: 200,
    body,
  }
}

exports.liveVariableStreamHandler = async (event, context) => {
  // console.log('event', event)
  // console.log('context', context)

  const liveVariables = event.Records.filter(
    ({ dynamodb }) => dynamodb.NewImage && dynamodb.NewImage.value,
  ).map(({ dynamodb }) => ({
    [dynamodb.Keys.key.S]: DynamoDb.Converter.unmarshall(dynamodb.NewImage).value,
  }))

  if (liveVariables.length > 0) {
    const connections = await GetAllAioConnections()
    if (connections.length > 0)
      for (const connection of connections) {
        try {
          await sendMessageToClient(connection.id, {
            action: 'liveVariables',
            liveVariables,
          })
          // console.log('Message sent to', connection.id, liveVariables)
        } catch {
          console.error('Could not send message to', connection.id)
        }
      }
  }
}

exports.analyticsHandler = async (event, context) => {
  // console.log('event', event)
  // console.log('context', context)

  const {
    requestContext: {
      connectionId,
      authorizer: { principalId },
      identity: { sourceIp },
    },
  } = event

  const user = JSON.parse(Buffer.from(principalId, 'base64').toString('ascii'))
  console.log('user', user)

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    return console.error('Bad request.')
  }

  const { type, params } = body
  if (typeof type !== 'string' || typeof params !== 'object') return console.error('Bad request.')

  const id = uuidv4()
  const item = DynamoDb.Converter.marshall({
    ...params
  })

  if(objectSize(item) > 390 * 1024){
    console.error('Analytics item is too large, database will only save keys.')
    await PutAnalytics(id, user.id, type)
  } else await PutAnalytics(id, user.id, type, params)
}
