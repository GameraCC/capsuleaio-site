const { AioConnect, AioDisconnect, GetAioConnections } = require('db')
const { deleteConnection } = require('mgmt')

exports.doConnect = async event => {
    const {
      requestContext: {
        connectionId,
        authorizer: { principalId },
        identity: { sourceIp }
      },
    } = event
    console.log('User has connected! Connection ID: ' + connectionId)
  
    const user = JSON.parse(Buffer.from(principalId, 'base64').toString('ascii'))
    console.log('user', user)
  
    /**
     * Disconnect any previous sessions
     */
    const otherSessions = await GetAioConnections(user.keyId)
    console.log('otherSessions', otherSessions)
  
    for(var session of otherSessions){
      console.log('Deleting connection:', session.id)
      await deleteConnection(session.id)
      await AioDisconnect(session.id)
    }
  
    await AioConnect(connectionId, sourceIp, user.id, user.keyId)
  }
  
exports.doDisconnect = async event => {
    const {
      requestContext: {
        connectionId,
        authorizer: { principalId },
      },
    } = event
    console.log('User has disconnected! Connection ID: ' + connectionId)
  
    const user = JSON.parse(Buffer.from(principalId, 'base64').toString('ascii'))
    console.log('user', user)
  
    await AioDisconnect(connectionId)
  }
  