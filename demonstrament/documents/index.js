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
