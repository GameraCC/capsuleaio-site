const nokamai = require('capsuleaio-nokamai')
const pixel = require('capsuleaio-nokamai-pixel')
const initialFingerprint = require('capsuleaio-initial-fingerprint')

const Nokamai = new nokamai()
const Pixel = new pixel()
const InitialFingerprint = new initialFingerprint()

const json = body => ({
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json',
  },
  body: typeof body === 'object' ? JSON.stringify(body) : typeof body === 'string' && body,
})

const badRequest = {
  statusCode: 400,
}

exports.getToken = async (event, context) => {
  // console.log('event:', event)

  const {
    requestContext: {
      identity: { sourceIp },
    },
  } = event

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    console.error('Bad Request.', event)
    return badRequest
  }

  const { action, uid, parameters, url, cookie, hash, id } = body
  console.log('uid', uid)

  try {
    let token

    switch (action) {
      case 'nok': 
        token = await Nokamai.handleGeneration(parameters, url, cookie)
        break
      case 'pix': 
        token = await Pixel.handleGeneration(parameters, id, hash)
        break
      case 'init':
        token = await InitialFingerprint.handleGeneration()
        break
      default:
        return badRequest
    }

    return json({ uid, token })
  } catch (err) {
    console.error('Error getting nokamai token', err)

    return json({
      uid,
      token: {
        success: false,
      },
    })
  }
}

exports.getNokamai = async (event, context) => {
  // console.log('event:', event)

  const {
    requestContext: {
      identity: { sourceIp },
    },
  } = event

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    console.error('Bad Request.', event)
    return badRequest
  }

  const { parameters, url, cookie, uid } = body
  console.log('uid', uid)

  try {
    const token = await Nokamai.handleGeneration(parameters, url, cookie)
    console.log('token', typeof token !== 'undefined', token && token.success)

    return json({ uid, token })
  } catch (err) {
    console.error('Error getting nokamai token', err)

    return json({
      uid,
      token: {
        success: false,
      },
    })
  }
}

exports.getPixel = async (event, context) => {
  // console.log('event:', event)

  const {
    requestContext: {
      identity: { sourceIp },
    },
  } = event

  let body
  try {
    body = JSON.parse(event.body)
  } catch {
    console.error('Bad Request.', event)
    return badRequest
  }

  const { parameters, id, hash, uid } = body
  console.log('uid', uid)

  try {
    const token = await Pixel.handleGeneration(parameters, id, hash)
    console.log('token', typeof token !== 'undefined', token && token.success)

    return json({ uid, token })
  } catch (err) {
    console.error('Error getting nokamai-pixel token', err)

    return json({
      uid,
      token: {
        success: false,
      },
    })
  }
}

exports.getInitialFingerprint = async (event, context) => {
  // console.log('event:', event)

  const {
    requestContext: {
      identity: { sourceIp },
    },
  } = event

  let uid
  try {
    uid = JSON.parse(event.body).uid
  } catch {
    console.error('Bad Request.', event)
    return badRequest
  }

  console.log('uid', uid)

  try {
    const token = await InitialFingerprint.handleGeneration()
    console.log('token', typeof token !== 'undefined', token && token.success)

    return json({ uid, token })
  } catch (err) {
    console.error('Error getting initial-fingerprint token', err)

    return json({
      uid,
      token: {
        success: false,
      },
    })
  }
}
