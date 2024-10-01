import { Model } from '/dependencies/mvc-framework.js'
const model = new Model({
  schema: [{ type: {
    aaa: { type: String },
    BBB: { type: Number },
    ccc: { type: Boolean },
  } }],
  content: [],
  events: {
    'content defineProperty': ($event) => { console.log($event.type, $event.detail) }
  },
  // content: ,
})
const { content, schema } = model
content.unshift({
  aaa: 111,
  BBB: "bbb",
  ccc: null,
})
content.unshift({
  aaa: "111",
  BBB: 222,
  ccc: true,
})
content.push({
  aaa: 111,
  BBB: "bbb",
  ccc: null,
})
content.push({
  aaa: "111",
  BBB: 222,
  ccc: true,
})
console.log(content)

// /*console.log(*/content.defineProperties({
//   aaa: { value: "AAA", writable: true, configurable: true, enumerable: true },
//   BBB: { value: 222, writable: true, configurable: true, enumerable: true },
//   ccc: { value: true, writable: true, configurable: true, enumerable: true },
// })/*)*/
// /*console.log(*/content.defineProperties({
//   aaa: { value: 111, writable: true, configurable: true, enumerable: true },
//   BBB: { value: "bbb", writable: true, configurable: true, enumerable: true },
//   ccc: { value: null, writable: true, configurable: true, enumerable: true },
// })/*)*/
// /*console.log(*/content.defineProperties({
//   aaa: { value: "AAAAAA", writable: true, configurable: true, enumerable: true },
//   BBB: { value: 222222, writable: true, configurable: true, enumerable: true },
//   ccc: { value: false, writable: true, configurable: true, enumerable: true },
// })/*)*/
// console.log(content.assign({
//   aaa: 111,
//   BBB: "bbb",
//   ccc: null,
// }))
/*
import { Control, Model, Schema } from '/dependencies/mvc-framework.js'
import DefaultTemplate from './template.js'
const index = new Control({
  models: {
    default: [{
      schema: [{ type: {
        href: { type: String }, 
        textContent: { type: String },
      } }],
      content: [{
        href: "./static-cms",
        textContent: "Static CMS"
      }],
    }, {}],
  },
  views: {
    default: [{
      parent: document.querySelector('body > main'),
      templates: {
        default: DefaultTemplate
      },
    }, {}],
  },
  start() {
    this.views.default.render(
      this.models.default.parse()
    )
    return this
  }
}, {
  validSettings: ['start'],
})
index.start()
*/