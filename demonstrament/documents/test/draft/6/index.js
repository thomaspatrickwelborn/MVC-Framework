import { SocketRouter } from '/dependencies/mvc-framework.js'
// const socket = new WebSocket("/test/draft/6")
const socket = new WebSocket("/test/draft/6")
console.log(socket)
// const socket = new WebSocket("wss://demonstrament.mvc-framework:3339/")
socket.addEventListener('open', ($event) => {
  console.log($event)
  socket.send('get')
})
socket.addEventListener('close', ($event) => {
  console.log($event)
})
socket.addEventListener('error', ($event) => {
  console.log($event)
})
socket.addEventListener("message", ($event, $isBinary) => {
  console.log($event)
})
// const socket = new SocketRouter({
//   active: true,
//   name: 'Draft 6',
//   protocol: "wss:",
//   port: 3338,
//   host: "demonstrament.mvc-framework",
//   path: '/test/draft/6',
//   messageAdapters: [
//     ['RESTAdapter', {
//       name: 'RESTAdapter',
//       message: function message($data, $isBinary) {
//         try {
//           const [$type, $detail] = [].concat(stringifyBuffer($data))
//           return { type: 'get', detail: $detail }
//         }
//         catch($err) { console.log($err) }
//       },
//       messages: ['get', 'post', 'delete'],
//     }]
//   ],
// })
// socket.addEventListener('get', function get($event) {
//   console.log($event)
// })