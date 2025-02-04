# Socket Router Guide
**MVC Framework \| Guide \| *Socket Router***  
Socket Router facilitates Socket Message Event routing through specialized Socket Message Adapters.  

## Socket Message Adapter
```
import { MessageAdapter } from '/dependencies/mvc-framework.js'
const RESTAdapter = new MessageAdapter({
  name: 'RESTAdapter',
  message: function message($event, $isBinary) {
    const { data } = $event
    try {
      const [$type, $detail] = [].concat(JSON.parse(stringifyBuffer(data)))
      if(this.messages.includes(type)) { return { type: $type, detail: $detail } }
    }
    catch($err) { console.log($err) }
  },
  messages: ['get', 'post', 'delete'],
})
```

## Socket Router
```
const { webSocket } = new SocketRouter({
  active: true, 
  name: 'Some Socket Name',
  protocol: "wss:", 
  port: 8000,
  host: "some.host.name",
  path: '/some/path',
})
```

## Socket Router With Message Adapter
```
const socket = new SocketRouter({
  active: true, 
  name: 'Some Socket Name',
  protocol: "wss:", 
  port: 8000,
  host: "some.host.name",
  path: '/some/path',
  messageAdapters: [RESTAdapter],
  events: {
    'webSocket open': function openWebSocket($event) {
      this.send('get')
    },
    'webSocket get': function getWebSocket($event) {
      console.log($event)
    },
  },
})
```

## Socket Router Without Message Adapter
```
const socket = new SocketRouter({
  active: true, 
  name: 'Some Socket Name',
  protocol: "wss:", 
  port: 8000,
  host: "some.host.name",
  path: '/some/path',
  events: {
    'webSocket open': function webSocketOpen($event) {
      this.send('get')
    },
    'webSocket message': function webSocketOessage($event) {
      this.send('get')
    },
    'webSocket error': function webSocketOrror($event) {
      this.send('get')
    },
    'webSocket close': function webSocketOlose($event) {
      this.send('get')
    },
  },
})
```