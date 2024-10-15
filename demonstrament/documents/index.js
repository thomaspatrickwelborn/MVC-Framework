import { Model, Schema, Content } from '/dependencies/mvc-framework.js'
const contentEventLog = ($event) => {
  const { type, basename, path, detail } = $event
  console.log('-----')
  console.log('type', type)
  console.log('basename', basename)
  console.log('path', path)
  console.log('detail', detail)
}
// let { content } = new Model({
//   content: {},
//   events: {
//     'content setProperty': contentEventLog,
//     'content deleteProperty': contentEventLog,
//   }
// })//.enableEvents()
// content.set({
//   aaa: {
//     bbb: {
//       ccc: true
//     }
//   }
// })
// content.delete()
  // console.log(content.string)
// console.log(content.string)
// content.delete()
// console.log(content.string)
/*
const { content } = new Model({
  schema: {
    "aaa": { type: String },
    "bbb": { type: Number },
    "ccc": { type: Boolean },
    "ddd": { type: {
      "eee": { type: String },
      "fff": { type: Number },
      "ggg": { type: Boolean },
    } },
  },
  content: {},
})
console.log(content.assign({ aaa: "AAA" }))
console.log(content)
*/
// console.log(content.set({
//   "aaa": "AAA",
//   "bbb": 222,
//   "ccc": false,
//   "ddd": {
//     "eee": "EEE",
//     "fff": 666,
//     "ggg": true
//   },
// }).string)
// console.log(content.set("ddd", {
//   "eee": "EEEEEE",
//   "fff": 666666,
//   "ggg": false
// }).string)
// content.set("ddd.eee", "EEEEEEEEE")
// content.set("ddd.fff", 666666666)
// content.set("ddd.ggg", true)
// console.log(content.string)
// console.log(content.string)
// content.set("aaa", "AAAAAA")
// content.set("bbb", 222222)
// content.set("ccc", true)
// console.log(content.string)
// content.set("ddd.eee", "EEEEEE")
// content.set("ddd.fff", 666666)
// content.set("ddd.ggg", false)
// console.log(content.string)
/*
import { Control, Model, Schema } from '/dependencies/mvc-framework.js'
import DefaultTemplate from './template.js'
const index = new Control({
  models: {
    default: [{
      schema: [{
        'data-href': String, 
        'textContent': String,
      }],
      content: [{
        'data-href': "./static-cms",
        'textContent': "Static CMS"
      }],
    }, {}],
  },
  views: {
    default: [{
      parent: document.querySelector('body > main'),
      templates: {
        default: DefaultTemplate
      },
      querySelectors: {
        querySelectorAll: {
          'button': ':scope > nav > button',
        },
      },
      events: {
        'querySelectors.button click': ($event) => {
          window.location = $event.currentTarget.getAttribute('data-href')
        }
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
index.start()
*/