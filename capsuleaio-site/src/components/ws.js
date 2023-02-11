const apiUri = 'https://api.capsuleaio.com/v3'

class wsClient extends EventTarget {
  constructor() {
    const ws = new WebSocket(apiUri)
    this.ws = ws

    ws.onerror = err => {
      this.dispatchEvent(new Event('error'))
      console.log('cannot open ws')
    }

    ws.onopen = () => {
      this.dispatchEvent(new Event('open'))

      ws.onmessage = event => {
        console.log('message:', event)
        this.dispatchEvent(new CustomEvent('message', { detail: event }))
      }
    }

    ws.onclose = event => {
      console.log('ws closed', event)
      this.dispatchEvent(new Event('close'))
    }
  }

  send(data) {
    const json = typeof data === 'object' ? JSON.stringify(data) : typeof data === 'string' && data

    ws.send(json)
  }

  close() {
    ws.close(666)
  }
}

export default wsClient
