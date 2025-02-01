const stringifyBuffer = ($buffer) => [].concat(JSON.parse(
  JSON.stringify($buffer.toString())
))
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
          const [$type/*, $content */] = [].concat(stringifyBuffer($data))
          return this.messages[$type]
        }
        catch($err) { console.log($err) }
      },
      messages: {
        'get': function getMessage($webSocket, $data, $isBinary) {
          const [$type] = [].concat(stringifyBuffer($data))
          const content = { propertyA: "propertyA" }
          const messageString = JSON.stringify(['get', content])
          console.log("messageString", messageString)
          $webSocket.send(messageString)
          return { type: $type, detail: content }
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