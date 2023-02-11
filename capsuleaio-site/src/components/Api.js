import axios from 'axios'
import qs from 'qs'

axios.defaults.withCredentials = true

const apiUri = 'https://api.capsuleaio.com/v1'

const formOptions = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}

export const getUser = () =>
  new Promise((res, rej) => {
    axios
      .get(`${apiUri}/user`)
      .then(resp => {
        // console.log('response', resp)
        return res(resp.data)
      })
      .catch(err => {
        // console.log(err)
        return rej(err)
      })
  })

export const activateKey = key =>
  new Promise((res, rej) => {
    axios
      .post(`${apiUri}/key/activate`, qs.stringify({ key }), formOptions)
      .then(resp => {
        return res(resp.data)
      })
      .catch(err => {
        return rej(err)
      })
  })

export const unbind = () =>
  new Promise((res, rej) => {
    axios
      .get(`${apiUri}/key/unbind`)
      .then(() => {
        // console.log('response', resp)
        // return res(resp.data)
        getUser().then(response => {
          return res(response.data)
        })
      })
      .catch(err => {
        // console.log(err)
        return rej(err)
      })
  })

/**
 * Admin Api Commands
 */

/**
 * Get User Count
 * Get count of users with activated keys
 */
export const getUserCount = () =>
  new Promise((res, rej) =>
    axios
      .get(`${apiUri}/admin/getUserCount`)
      .then(({ data: { count } }) => res(count))
      .catch(err => rej(err)),
  )

/**
 * Get Connected User Count
 * Get count of users currently connected
 */
export const getConnectedUserCount = () =>
  new Promise((res, rej) =>
    axios
      .get(`${apiUri}/admin/getConnectedUserCount`)
      .then(({ data: { count } }) => res(count))
      .catch(err => rej(err)),
  )
