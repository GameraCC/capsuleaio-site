/**
 * Capsule AIO API v1
 * 
 * Discord Handler
 * 
 * This library is for communicating with the Discord API after oauth2
 * 
 * 
 */

const axios = require('axios')
const qs = require('qs')

const discordApi = 'https://discord.com/api'

const {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_REDIRECT_URI,
  DISCORD_SCOPE
} = process.env

/**
 * Request a user token from Discord to access their information
 * @param {string} code - The code returned from the Discord oauth2 process
 * @returns Discord oauth2 token
 */
exports.tokenRequest = code =>
  new Promise((res, rej) => {
    const data = {
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
      grant_type: 'authorization_code',
      code,
      redirect_uri: DISCORD_REDIRECT_URI,
      scope: DISCORD_SCOPE,
    }

    const options = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }

    axios
      .post(`${discordApi}/oauth2/token`, qs.stringify(data), options)
      .then(resp => {
        console.log('response', resp)
        return res(resp.data)
      })
      .catch(err => {
        console.error(err)
        return rej(err)
      })
  })

/**
 * Get user data using a discord access token
 * @param {object} AccessToken - An object containing access_token and token_type
 * @returns 
 */
exports.userRequest = ({access_token, token_type}) =>
  new Promise((res, rej) => {
    const options = {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    }

    axios
      .get(`${discordApi}/users/@me`, options)
      .then(resp => {
        console.log('response', resp)
        return res(resp.data)
      })
      .catch(err => {
        console.error(err)
        return rej(err)
      })
  })
