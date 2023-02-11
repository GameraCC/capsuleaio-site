const { ALLOW_ORIGIN } = process.env

exports.fail = {
  statusCode: 400,
  headers: {
    /* Required for CORS support to work */
    'Access-Control-Allow-Origin': ALLOW_ORIGIN,
    // 'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': true,
  },
}

exports.unauthorized = {
  statusCode: 401,
  headers: {
    /* Required for CORS support to work */
    'Access-Control-Allow-Origin': ALLOW_ORIGIN,
    // 'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': true,
  },
}

exports.success = {
  statusCode: 200,
  headers: {
    /* Required for CORS support to work */
    'Access-Control-Allow-Origin': ALLOW_ORIGIN,
    // 'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': true,
  },
}

exports.invalidDataResponse = {
  statusCode: 400,
  headers: {
    /* Required for CORS support to work */
    'Access-Control-Allow-Origin': ALLOW_ORIGIN,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': true,
  },
  body: JSON.stringify({ message: 'Invalid data' })
}
