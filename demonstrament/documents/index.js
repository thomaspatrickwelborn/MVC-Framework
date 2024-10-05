import { Model } from '/dependencies/mvc-framework.js'
const model = new Model({
  schema: {
    aaa: { type: String }
  },
  content: {},
  events: {
    // 'content defineProperty': ($event) => { console.log($event.type, $event.detail) },
    'content validate': ($event) => {
      console.log('-----')
      const { basename, path, detail, results } = $event
      console.log('basename', basename)
      console.log('path', path)
      console.log('detail', detail)
    },
  },
})
model.content.defineProperty('aaa', { value: "AAA" })
model.content.defineProperty('aaa', { value: 111 })
console.log('model', model)
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