;`use strict`

const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const { encrypt } = require('qq-crypto')
const { UpdateUser } = require('db')
const { tokenRequest, userRequest } = require('./discord')

const {
  DASHBOARD_REDIRECT_URI,
  DASHBOARD_LOGIN_URI,
  AUTH_COOKIE,
  FAKAM_AES_ENCRYPTION_KEY
} = process.env

const redirectToLogin = () => ({
  statusCode: 303,
  headers: {
    /* Required for CORS support to work */
    'Access-Control-Allow-Origin': '*',
    Location: DASHBOARD_LOGIN_URI,
  },
  body: JSON.stringify({
    message: 'Redirecting...',
  }),
})

const redirectToDash = token => ({
  statusCode: 303,
  headers: {
    /* Required for CORS support to work */
    'Access-Control-Allow-Origin': '*',
    'Set-Cookie': cookie.serialize(AUTH_COOKIE, token, {
      domain: 'capsuleaio.com',
      httpOnly: true,
      secure: true,
      path: '/',
    }),
    Location: DASHBOARD_REDIRECT_URI,
  },
  body: JSON.stringify({
    message: 'Redirecting...',
  }),
})

module.exports = async (event, context) => {
  console.log('event', event)
  // console.log('context', context)

  const payload = {}

  if (!event.queryStringParameters || !event.queryStringParameters.code) return redirectToLogin()

  try {
    payload.auth = await tokenRequest(event.queryStringParameters.code)
    // console.log('result', payload.auth)

    payload.user = await userRequest(payload.auth)
    // console.log('getUserResult', payload.user)
  } catch (err) {
    console.error('Error getting user', err)
    return redirectToLogin()
  }

  //db stuff
  try {
    await UpdateUser(payload.auth, payload.user)
  } catch (err) {
    console.error('Error updating user in db')
    return redirectToLogin()
  }

  const encryptKey = crypto
    .createHash('md5')
    .update('Cap$sule|')
    .update(FAKAM_AES_ENCRYPTION_KEY)
    .digest('hex')

  const token = jwt.sign(payload, encryptKey)
  // console.log('token', token)

  const encrypted = encrypt(token, encryptKey)
  // console.log('encrypted', encrypted)

  // const decrypted = decrypt(encrypted, FAKAM_AES_ENCRYPTION_KEY)
  // console.log('decrypted', decrypted)

  // Create the header with the token
  return redirectToDash(encrypted)
}
