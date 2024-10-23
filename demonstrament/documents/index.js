
import { Content } from '/dependencies/mvc-framework.js'
const arrayEventListener = ($event) => { console.log(
  "\n", "$event.type", $event.type,
  "\n", "$event.basename", $event.basename,
  "\n", "$event.path", $event.path,
  "\n", "$event.detail", $event.detail,
) }
const array = new Content([{
  id: 0, propertyA: true, propertyB: true
}, {
  id: 1, propertyA: true, propertyB: false
}, {
  id: 2, propertyA: false, propertyB: false
}, {
  id: 3, propertyA: false, propertyB: true
}])
console.log("array", array.string)
array.addEventListener("concatValue", arrayEventListener)
array.addEventListener("concat", arrayEventListener)
const concatArray = array.concat({
  id: 4, propertyA: true, propertyB: true
}, {
  id: 5, propertyA: true, propertyB: false
}, {
  id: 6, propertyA: false, propertyB: false
}, {
  id: 7, propertyA: false, propertyB: true
})
console.log("concatArray", concatArray)
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