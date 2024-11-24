import { Model } from "/dependencies/mvc-framework.js"
const model = new Model({
  schema: {
    propertyA: {
      type: {
        propertyB: { type: {
          propertyC: { type: String }
        } }
      }
    }
  },
  content: {
    propertyA: {
      propertyB: {
        propertyC: "CCC"
      }
    }
  },
  localStorage: "/model"
})
console.log(model.content.source)
console.log(model.content.get("propertyA.propertyB").root)
/*
import { View } from "/dependencies/mvc-framework.js"
const view = new View({
  parent: document.createElement("app"),
  templates: { default: () => `
    <button>BUTTON</button>
  ` },
  querySelectors: {
    querySelector: {
      button: ':scope > button',
    }
  },
  events: {
    "querySelectors.button click": ($event) => {
      console.log($event.type, $event)
    }
  },
}).render()
document
.querySelector('main')
.insertAdjacentElement('afterbegin', view.parent)
*/
/*
import { Content, Model } from '/dependencies/mvc-framework.js'
// const content = new Content({
//   propertyA: "AAA",
// })
// content.addEventListener('getProperty:propertyA', function getPropertyA($event) {
//   console.log($event.type, $event.basename, $event.detail)
// })
// content.addEventListener('setProperty:propertyA', function setPropertyA($event) {
//   console.log($event.type, $event.basename, $event.detail)
// })
// content.addEventListener('deleteProperty:propertyA', function deletePropertyA($event) {
//   console.log($event.type, $event.basename, $event.detail)
// })
// content.get('propertyA')
// content.set('propertyA', "AAAAAA")
// content.delete('propertyA')
// content.get('propertyA')

const { schema, content } = new Model({
  schema: {
    propertyA: {
      type: {
        propertyB: {
          type: {
            propertyC: {
              type: String
            }
          }
        }
      }
    }
  },
  content: {
    propertyA: {
      propertyB: {
        propertyC: "CCC"
      }
    }
  },
  events: {
    "content.propertyA.propertyB getProperty:propertyC": function getPropertyC($event) {
      console.log($event.type, $event.basename, $event.detail)
    },
    "content.propertyA.propertyB setProperty:propertyC": function setPropertyC($event) {
      console.log($event.type, $event.basename, $event.detail)
    },
    "content.propertyA.propertyB deleteProperty:propertyC": function deletePropertyC($event) {
      console.log($event.type, $event.basename, $event.detail)
    },
  }
}, { enableEvents: true })

content.get("propertyA.propertyB.propertyC")
content.set("propertyA.propertyB.propertyC", "CCCCCCCCC")
content.delete("propertyA.propertyB.propertyC")
*/
