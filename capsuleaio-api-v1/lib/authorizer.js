;`use strict`

const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const crypto = require('crypto')

const { decrypt } = require('qq-crypto')

const generatePolicy = require('./generatePolicy')

const { AUTH_COOKIE, FAKAM_AES_ENCRYPTION_KEY } = process.env

// this endpoint is where the checking is being made
module.exports = async (event, context) => {
  // console.log('event', event)

  if (!event.authorizationToken) throw new Error()

  const cookies = cookie.parse(event.authorizationToken)
  const encryptedValue = cookies[AUTH_COOKIE]

  // console.log('encrypted', encryptedValue)
  const encryptKey = crypto
    .createHash('md5')
    .update('Cap$sule|')
    .update(FAKAM_AES_ENCRYPTION_KEY)
    .digest('hex')

  const tokenValue = decrypt(encryptedValue, encryptKey)
  // console.log('tokenValue', tokenValue)

  try {
    return await new Promise((res, rej) =>
      jwt.verify(tokenValue, encryptKey, {}, (verifyError, decoded) => {
        if (verifyError) {
          console.error('verifyError', verifyError)
          return rej(verifyError)
        }
        // is custom authorizer function
        console.log('Valid from customAuthorizer:', decoded)

        res(
          generatePolicy(
            Buffer.from(JSON.stringify(decoded)).toString('base64'),
            'Allow',
            event.methodArn,
          ),
        )
      }),
    )
  } catch (err) {
    console.log('Catch error. Invalid token:', err)
    throw new Error()
  }
}
