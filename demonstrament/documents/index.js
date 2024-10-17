import { Model, View } from '/dependencies/mvc-framework.js'
class ColorControlView extends View {
  model = new Model({
    schema: {
      "brightnessLabel": { type: String },
      "brightness": { type: String, enum: ["MIN", "MAX"] },
    },
    content: {
      "brightnessLabel": "Brightness",
      "brightness": "MIN",
    },
  })
  constructor() {
    super({
      parent: document.createElement('color-control'),
      templates: { default: ($content) => {
        return `
          <buttons-label>Color-Control</buttons-label>
          <buttons
            data-brightness="${$content.brightness}"
          >
            <button
              data-key="brightness"
              data-value="${$content.brightness}"
            >
              <button-label>${$content.brightnessLabel}</button-label>
              <button-value>${$content.brightness}</button-value>
            </button>
          </buttons>`
      } },
      querySelectors: {
        querySelector: {
          buttons: ':scope > buttons',
          brightnessButton: ':scope > buttons > button[data-key="brightness"]',
          brightnessButtonValue: ':scope > buttons > button[data-key="brightness"] > button-value'
        },
      },
      events: {
        'qs.brightnessButton click': ($event) => {
          const { content } = this.model
          const brightness = (content.get("brightness") === "MAX")
            ? "MIN" : "MAX"
          content.set("brightness", brightness)
        },
        'model.content setProperty': ($event) => {
          const { key, value } = $event.detail
          if(key === 'brightness') {
            const { brightnessButton, brightnessButtonValue } = this.qs
            brightnessButton.setAttribute('data-value', value)
            brightnessButtonValue.textContent = value
          }
        }
      },
    })
    this.render(this.model.content.object, 'default')
  }
}
const colorControlView = new ColorControlView()
colorControlView.model.content.addEventListener('setProperty', ($event) => {
  const { key, value } = $event.detail
  if(key === "brightness") {
    document.querySelector('body').setAttribute('data-brightness', value)
  }
})
document.querySelector('body > main').insertAdjacentElement('afterbegin', colorControlView.parent)
/*
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
*/
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