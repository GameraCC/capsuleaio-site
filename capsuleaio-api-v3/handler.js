const { DashConnect, DashDisconnect, GetUserCount, GetConnectedUserCount } = require('db')

const authorizer = require('./lib/authorizer')

const success = {
  statusCode: 200,
}

exports.authorizer = authorizer

exports.connectionHandler = async (event, context) => {
  console.log('event:', event)

  const {
    requestContext: {
      connectionId,
      authorizer: { principalId },
      identity: { sourceIp },
      routeKey
    },
  } = event

  const { auth, user } = JSON.parse(Buffer.from(principalId, 'base64').toString('ascii'))

  switch (routeKey) {
    case '$connect': {
      await DashConnect(connectionId, sourceIp, user.id, user.keyId, user.admin)

      let body = {
        action: 'hello'
      }

      if (user.admin > 0) {
        /** Admin returns */
        try{
          const userCount = await GetUserCount()
          const connectedUserCount = await GetConnectedUserCount()
  
          body = {
            ...body,
            msg: 'Hello admin!',
            userCount,
            connectedUserCount
          }
        } catch (err) {
          body.msg = 'Hello admin, there was a problem!'
        }
      } else {
        /** Normal Return */
        body = {
          ...body,
          msg: 'Hello user!',
        }
      }

      return {
        ...success,
        body: JSON.stringify(body),
      }
    }
    case '$disconnect':
      await DashDisconnect(connectionId)
      return success
    default:
      console.log('unknown route key: ' + routeKey)
      return success
  }
}

exports.hello = async (event, context) => {
  const {
    requestContext: {
      connectionId,
      authorizer: { principalId },
      identity: { sourceIp },
    },
  } = event

  const { auth, user } = JSON.parse(Buffer.from(principalId, 'base64').toString('ascii'))

  let data = {}

  if (user.admin > 0) {
    data = {
      ...data,
      message: 'Hello Administrator!',
    }
  }
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

exports.adminStreamHandler = async (event, context) => {
  console.log('event:', event)
}
