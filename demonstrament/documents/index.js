import { Control, Model, Schema, Content } from '/dependencies/mvc-framework.js'
console.log(Control)
// const socket = new WebSocket("wss://demonstrament.mvc-framework:3338/ws")
const socket = new WebSocket("/")
socket.addEventListener('open', ($event) => {
  console.log($event.type, $event)
  socket.send("get")
})
socket.addEventListener('error', ($event) => {
  console.log($event.type, $event)
})
socket.addEventListener("message", ($event, $isBinary) => {
  console.log($event.type, $event)
})
// new Control({}, {})
// import DefaultTemplate from './template.js'
// const index = new Control({
//   models: {
//     default: [{
//       schema: [{
//         type: {
//           'data-href': { type: String }, 
//           'textContent': { type: String },
//         }
//       }],
//       content: [{
//         'data-href': "./static-cms",
//         'textContent': "Static CMS"
//       }],
//     }, {}],
//   },
//   views: {
//     default: [{
//       parent: document.querySelector('body > main'),
//       templates: {
//         default: DefaultTemplate
//       },
//       querySelectors: {
//         querySelectorAll: {
//           'button': ':scope > nav > button',
//         },
//       },
//       events: {
//         'querySelectors.button click': ($event) => {
//           window.location = $event.currentTarget.getAttribute('data-href')
//         }
//       },
//     }, {}],
//   },
// }, {
//   defineProperties: {
//     start: { value: function () {
//       console.log(this.models.default.parse())
//       this.views.default.render(
//         this.models.default.parse()
//       )
//       return this
//     } }
//   }
// })
// index.start()
//# sourceMappingURL=index.js.map
