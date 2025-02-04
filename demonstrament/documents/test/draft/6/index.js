import stringifyBuffer from '../../coutil/stringifyBuffer/index.js'
import { SocketRouter } from '/dependencies/mvc-framework.js'
const socket = new SocketRouter({
  active: true,
  name: 'Draft 6',
  protocol: "wss:",
  port: 3338,
  host: "demonstrament.mvc-framework",
  path: '/test/draft/6',
  messageAdapters: [
    {
      name: 'RESTAdapter',
      message: function message($event, $isBinary) {
        const { data } = $event
        try {
          const [$type, $detail] = [].concat(JSON.parse(stringifyBuffer(data)))
          return { type: $type, detail: $detail }
        }
        catch($err) { console.log($err) }
      },
      messages: ['get', 'post', 'delete'],
    }
  ],
  events: {
    'webSocket open': function openWebSocket($event) {
      this.send('get')
    },
    'webSocket get': function getWebSocket($event) {
      console.log($event)
    },
  },
}, { enableEvents: true })
console.log(socket)