
import { Content } from '/dependencies/mvc-framework.js'
const $objectSchema = {
  aaa: { type: { bbb: { type: { ccc: { type: Number } } } } }
}
const $objectContent = {
  aaa: { bbb: { ccc: 333 } }
}
const $objectEventType = 'setProperty'
const $arraySchema = [$objectSchema]
const $arrayContent = [$objectContent]
const $arrayEventType = 'pushProp'
const $eventListener = ($event) => { console.log($event.type, $event) }
const objectContent = new Content($objectContent, $objectSchema)
objectContent.get("aaa.bbb").addEventListener($objectEventType, $eventListener)
objectContent.set("aaa.bbb.ccc", 333333)
const arrayContent = new Content($arrayContent, $arraySchema)
arrayContent.addEventListener($arrayEventType, $eventListener)
arrayContent.push(
  { aaa: { bbb: { ccc: 666 } } },
  { aaa: { bbb: { ccc: 999 } } },
)
/*
import { Core } from '/dependencies/mvc-framework.js'
const $eventTargetProperty = document.querySelector('body')
const $eventType = "click"
const $eventTargetPath = "eventTargetProperty"
const $eventListener = ($event) => {
  console.log($event.type, $event.currentTarget)
}
const $events = {
  [`${$eventTargetPath} ${$eventType}`]: $eventListener
}
const core = new Core({
  eventTargetProperty: $eventTargetProperty,
  events: $events,
}, { defineProperties: {
  "eventTargetProperty": { enumerable: true, writable: true, configurable: true }
} })
core.enableEvents()
*/
// import './examples/color-control-view.js'

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
*/