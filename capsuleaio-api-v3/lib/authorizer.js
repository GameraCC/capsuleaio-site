;`use strict`

const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const crypto = require('crypto')
const { decrypt } = require('qq-crypto')
const { GetUser } = require('db')

const generatePolicy = require('./generatePolicy')

const { AUTH_COOKIE, FAKAM_AES_ENCRYPTION_KEY } = process.env

// this endpoint is where the checking is being made
module.exports = async (event, context) => {
  console.log('event', event)

  if (!event.headers.Cookie) throw new Error('Missing authorization token.')

  const cookies = cookie.parse(event.headers.Cookie)
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

        GetUser(decoded.user.id)
          .then(user => {
            if (!user.key) return rej(new Error('User does not have an activated key.'))

            const data = JSON.stringify({ ...decoded, user: { ...decoded.user, ...user } })
            console.log('data', data)

            res(generatePolicy(Buffer.from(data).toString('base64'), 'Allow', event.methodArn))
          })
          .catch(err => rej(err))
      }),
    )
  } catch (err) {
    console.log('Catch error. Invalid token:', err)
    throw new Error()
  }
}
