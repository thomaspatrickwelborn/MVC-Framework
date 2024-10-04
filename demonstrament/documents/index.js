import { Control, Model, Schema } from '/dependencies/mvc-framework.js'
import DefaultTemplate from './template.js'
const index = new Control({
  models: {
    default: [{
      schema: [{ type: {
        'data-href': { type: String }, 
        'textContent': { type: String },
      } }],
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
          'button': ':scope > ul > li > button',
        },
      },
      events: {
        'querySelectors.button click': ($event) => { console.log($event.type, $event) }
      },
    }, {}],
  },
  start() {
    this.views.default.render(
      this.models.default.parse()
    )
    console.log(this.views.default)
    return this
  }
}, {
  validSettings: ['start'],
})
index.start()
index.start()