import { Model, Schema, Content } from '/dependencies/mvc-framework.js'
const contentEventLog = ($event) => {
  const { type, basename, path, detail } = $event
  console.log('-----')
  console.log('type', type)
  console.log('basename', basename)
  console.log('path', path)
  console.log('detail', detail)
}
const content = new Content({
  aaa: 111, bbb: "BBB", ccc: false
}, new Schema({
  aaa: { type: Number }, bbb: { type: String }, ccc: { type: Boolean }
}))
content.addEventListener('assignSource', contentEventLog)
// console.log(content.string)
content.assign({
  aaa: "111", bbb: 222, ccc: true
})
// console.log(content.string)
content.assign({
  aaa: 111111, bbb: "BBBBBB", ccc: false
})
// console.log(content.string)
// const content = new Content([])
// content.addEventListener('concat', contentEventLog)
// content.addEventListener('concatValue', contentEventLog)
// const concatContent = content.concat([{ aaa: 111 }, { bbb: 222 }, { ccc: 333 }])
// console.log('concatContent', concatContent)
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