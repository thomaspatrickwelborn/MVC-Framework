import { Content } from '/dependencies/mvc-framework.js'
const eventLog = ($event) => { console.log(
  "\n", "$event.type", $event.type,
  "\n", "$event.basename", $event.basename,
  "\n", "$event.path", $event.path,
  "\n", "$event.detail", $event.detail,
) }
const object = new Content({propertyA: { propertyB: "BBB" }})
const array = new Content(
  [
    []
  ]
)
array.get('0').push(object)
array.get("0").set("0", { propertyA: { propertyB: "BBB" } } )
array.get("0.0").assign({ propertyA: { propertyB: "BBBBBB" } } )
array.get("0").assign({
  "1": { propertyA: { propertyB: "BBB" } }
})
console.log(array.string)
// array.get("0.1.propertyA")
// .set("propertyB", "BBBBBB")
// console.log(array.string)
// array.get("0")
// .assign([
//   { propertyA: { propertyB: "BBB" } },
//   { propertyA: { propertyB: "BBBBBB" } }
// ])
// console.log(array.string)
// console.log(array.get("1"))
/*
const object = new Content()
object.addEventListener('setProperty', eventLog)
object.addEventListener('set', eventLog)
object.set({
  propertyA: {
    propertyB: {
      propertyC: 333,
      propertyD: "DDD",
      propertyE: false
    
}  },
  propertyF: {
    propertyG: {
      propertyH: 888,
      propertyI: "III",
      propertyJ: true
    }
  }
})
*/
/*
const object = new Content({
  propertyA: {
    propertyB: {
      propertyC: 333,
      propertyD: "DDD",
      propertyE: false
    }
  },
  propertyF: {
    propertyG: {
      propertyH: 888,
      propertyI: "III",
      propertyJ: true
    }
  }
})
object.addEventListener("assign", eventLog)
object.addEventListener("assignSource", eventLog)
object.addEventListener("assignSourceProperty", eventLog)
object.assign({
  propertyA: {
    propertyB: {
      propertyC: 333333
    }
  }
})
*/
// , {
//   propertyF: {
//     propertyG: {
//       propertyI: "IIIIII"
//     }
//   }
// })
/*
const array = new Content([{
  id: 0, propertyA: true, propertyB: true
}, {
  id: 1, propertyA: true, propertyB: false
}, {
  id: 2, propertyA: false, propertyB: false
}, {
  id: 3, propertyA: false, propertyB: true
}])
array.addEventListener("copyWithinIndex", eventLog)
array.addEventListener("copyWithin", eventLog)
array.length = 8
array.copyWithin(4, 0, 4)
*/
/*
const array = new Content([], new Schema([{ type: Number }]), {})
array.addEventListener('setProperty', eventLog)
array.addEventListener('set', eventLog)
array.addEventListener('validateProperty', eventLog)
array.set("0", 0)
array.set("0", "0")
*/
/*
const array = new Content([])
array.addEventListener("concatValue", eventLog)
array.addEventListener("concat", eventLog)
let concatArray = array.concat({
  id: 0, propertyA: true, propertyB: true
}, {
  id: 1, propertyA: true, propertyB: false
}, {
  id: 2, propertyA: false, propertyB: false
}, {
  id: 3, propertyA: false, propertyB: true
})
console.log("concatArray.string", concatArray.string)
concatArray.addEventListener("concatValue", eventLog)
concatArray.addEventListener("concat", eventLog)
concatArray = concatArray.concat([{
  id: 4, propertyA: true, propertyB: true
}, {
  id: 5, propertyA: true, propertyB: false
}, {
  id: 6, propertyA: false, propertyB: false
}, {
  id: 7, propertyA: false, propertyB: true
}])
console.log("concatArray.string", concatArray.string)
*/
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