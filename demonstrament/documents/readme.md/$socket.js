import stringifyBuffer from '../coutil/stringifyBuffer/index.js'
export default {
  active: false,
  name: 'README.md',
  protocol: "wss:",
  port: 3338,
  host: "demonstrament.mvc-framework",
  path: '/readme.md',
  source: 'documents/readme.md',
  target: 'localhost/readme.md',
  open: function open() {},
  close: function close() {},
  error: function error() {},
  messageAdapters: [
    {
      name: 'RESTAdapter',
      message: function message($data, $isBinary) {
        console.log("message", $data)
        try {
          const [$type/*, $content */] = [].concat(stringifyBuffer($data))
          return this.messages[$type]
        }
        catch($err) { console.log($err) }
      },
      messages: {
        'get': function getMessage($webSocket, $data, $isBinary) {
          console.log("getMessage", $data)
          const [$type] = [].concat(stringifyBuffer($data))
          const content = { propertyA: "propertyA" }
          const messageString = JSON.stringify(['get', content])
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
    }
  ],
}