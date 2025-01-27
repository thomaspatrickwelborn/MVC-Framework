export default {
  active: true,
  name: 'Index',
  protocol: "wss:",
  port: 3338,
  host: "demonstrament.mvc-framework",
  path: '/',
  source: 'documents',
  target: 'localhost',
  messageAdapters: [
    ['RESTAdapter', {
      name: 'RESTAdapter',
      message: function message($data, $isBinary) {
        try {
          const data = $data
          let message
          const dataString = JSON.stringify(data.toString())
          const dataJSON = [].concat(JSON.parse(dataString))

          const dataJSONIsArray = Array.isArray(dataJSON)
          const [$restMethod] = dataJSON
          message = this.messages[$restMethod]
          console.log(message)
          return message
        }
        catch($err) {
          console.log($err)
        }
        return
      },
      messages: {
        'get': function getMessage($webSocket, $data, $isBinary) {
          // console.log('get', JSON.stringify(data.toString()))
          // $webSocket.send(JSON.stringify({ propertyA: "propertyA" }))
          $webSocket.send("GET")
          return true
        },
        'post': function postMessage($webSocket, $data, $isBinary) {
          console.log('post', JSON.stringify(data.toString()))
        },
        'delete': function deleteMessage($webSocket, $data, $isBinary) {
          console.log('delete', JSON.stringify(data.toString()))
        },
      },
    }]
  ],
}