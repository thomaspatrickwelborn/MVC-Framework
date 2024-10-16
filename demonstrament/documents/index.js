import { Model, Schema, Content } from '/dependencies/mvc-framework.js'
const validatorEventLog = ($event) => {
  const { type, basename, path, detail } = $event
  console.log('-----')
  console.log('type', type)
  console.log('basename', basename)
  console.log('path', path)
  console.log('detail', detail)
}
const contentEventLog = ($event) => {
  const { type, basename, path, detail } = $event
  console.log('-----')
  console.log('type', type)
  console.log('basename', basename)
  console.log('path', path)
  console.log('detail', detail)
}
const content = new Content({}, new Schema({
  aaa: { type: Number }, bbb: { type: String }, ccc: { type: Boolean },
  ddd: { type: [{
    type: { eee: { type: Number }, fff: { type: String }, ggg: { type: Boolean } }
  }] }
}))
content.addEventListener('validateProperty', validatorEventLog)
content.addEventListener('assignSourceProperty', contentEventLog)
content.assign({
  aaa: 111, bbb: "BBB", ccc: false,
  ddd: [{
    eee: 444, fff: "EEE", ggg: true
  }]
})
console.log(content.string)
// content.addEventListener('assignSource', contentEventLog)
// content.addEventListener('assign', contentEventLog)
// content.set("ddd", [])
// console.log(content)
// content.get("ddd").assign({ 0: { eee: 111111, fff: "BBBBBB", ggg: false, } })
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