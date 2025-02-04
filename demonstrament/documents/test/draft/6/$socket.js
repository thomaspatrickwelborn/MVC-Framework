import stringifyBuffer from '../../coutil/stringifyBuffer/index.js'
export default {
  active: true,
  name: 'Draft 6',
  protocol: "wss:",
  port: 3338,
  host: "demonstrament.mvc-framework",
  path: '/test/draft/6',
  source: 'documents/test/draft/6',
  target: 'localhost/test/draft/6',
  open: function open() {},
  close: function close() {},
  error: function error() {},
  messageAdapters: [
    {
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
          const [$type, $detail] = [].concat(stringifyBuffer($data))
          const content = { propertyB: "propertyB" }
          const messageString = JSON.stringify(['get', content])
          $webSocket.send(messageString)
          return { type: 'get', detail: $detail }
        },
        'post': function postMessage($webSocket, $data, $isBinary) {
          console.log('post', JSON.stringify(data.toString()))
          const [$type, $detail] = [].concat(stringifyBuffer($data))
          return { type: 'post', detail: $detail }
        },
        'delete': function deleteMessage($webSocket, $data, $isBinary) {
          console.log('delete', JSON.stringify(data.toString()))
          const [$type, $detail] = [].concat(stringifyBuffer($data))
          return { type: 'delete', detail: $detail }
        },
      },
    }
  ],
}