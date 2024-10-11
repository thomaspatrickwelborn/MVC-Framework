import { Model, Schema } from '/dependencies/mvc-framework.js'
const contentEventLog = ($event) => {
  const { type, basename, path, detail } = $event
  console.log('-----')
  console.log('type', type)
  console.log('basename', basename)
  console.log('path', path)
  console.log('detail', detail)
}
const { content } = new Model({
  schema: {
    "aaa": { type: String },
    "bbb": { type: Number },
    "ccc": { type: Boolean },
    "ddd": { type: {
      "eee": { type: String }
    } },
  },
  content: {},
})
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