import "./pandTree/index.js"
// import "./defineProperty/index.js"
// import { Model } from "/dependencies/mvc-framework.js"
// const eventLog = ($event) => {
//   const { type, path, value, change, detail } = $event
//   console.log(
//     "\n", "type", type, 
//     "\n", "path", path,
//     "\n", "value", value,
//     "\n", "change", change,
//     "\n", "detail", detail,
//   )
// }
/*
const model = new Model({
  schema: [{ type: {
    propertyA: { type: {
      propertyB: { type: String }
    } }
  } }],
  content: [{
    propertyA: {
      propertyB: "333"
    }
  }, {
    propertyA: {
      propertyB: "4444"
    }
  }],
  events: {
    "content unshiftProp": eventLog,
    // "change": eventLog
  }
}, {
  changeEvents: true,
  validationEvents: true,
  schema: { validationType: 'primitive' },
  content: { proxyAssignmentMethod: 'assign' },
})
model.content.unshift({
  propertyA: {
    propertyB: "1"
  }
}, {
  propertyA: {
    propertyB: "22"
  }
}, {
  propertyA: {
    propertyB: "333"
  }
})
*/

// const model = new Model({
//   schema: {
//     propertyA: { type: {
//       propertyB: { type: {
//         propertyC: { type: String }
//       } }
//     } }
//   },
//   content: {
//     propertyA: { value: {
//       propertyB: { value: {
//         propertyC: { value: "###" }
//       } }
//     } }
//   },
//   localStorage: "/model",
//   events: {
//     // 'content validProperty': eventLog,
//     // 'content nonvalidProperty': eventLog,
//     'change': eventLog
//   }
// }, {
//   changeEvents: true,
//   validationEvents: true,
//   schema: { validationType: 'primitive' },
//   content: { proxyAssignmentMethod: 'assign' },
// })
// model.content.defineProperties({
//   propertyA: { value: {
//     propertyB: { value: {
//       propertyC: { value: "###" }
//     } }
//   } }
// })


/*
const propertyDescriptorTree = {
  aaa: {
    value: {
      bbb: {
        value: [{
          value: "ccc"
        }, {
          value: "ddd"
        }]
      },
      eee: {
        value: "eee"
      }
    }
  }
}
const definePropertiesTree = ($descriptorTree) => {
  let properties
  if(Array.isArray($descriptorTree)) { properties = [] }
  else if(typeof $descriptorTree === 'object') { properties = {} }
  for(const [$propertyKey, $propertyDescriptor] of Object.entries($descriptorTree)) {
    const propertyDescriptorValue = $propertyDescriptor.value
    if(typeof propertyDescriptorValue === 'object') {
      properties[$propertyKey] = definePropertiesTree(propertyDescriptorValue)
    }
    else {
      properties[$propertyKey] = propertyDescriptorValue
    }
  }
  return properties
}
console.log(propertyDescriptorTree)
console.log(definePropertiesTree(propertyDescriptorTree))
*/
/*
import { Model } from "/dependencies/mvc-framework.js"
const model = new Model({
  schema: {
    propertyA: { type: {
      propertyB: { type: {
        propertyC: { type: String }
      } }
    } }
  },
  content: {
    // propertyA: {
    //   propertyB: {
    //     propertyC: "333333"
    //   }
    // }
  },
  localStorage: "/model",
  events: {
    // 'content validProperty': ($event) => {
    //   console.log($event.type)
    // },
    // 'content nonvalidProperty': ($event) => {
    //   console.log($event.type)
    // },
    // 'change': ($event) => {
    //   console.log(
    //     "\n", "-----",
    //     "\n", $event.type,
    //     "\n", $event.path,
    //     "\n", $event.detail,
    //     // "\n", $event.detail
    //   )
    // }
  }
}, {
  changeEvents: true,
  validationEvents: true,
  schema: { validationType: 'primitive' },
  content: { proxyAssignmentMethod: 'assign' },
})
model.content.defineProperties({
  propertyA: { value: {
    propertyB: { value: {
      propertyC: { value: "###" }
    } }
  } }
})
*/
// model.content.assign({
//   propertyA: {
//     propertyB: {
//       propertyC: "3333"
//     }
//   }
// })
// model.content.assign({
//   propertyA: {
//     propertyB: {
//       propertyC: "3333"
//     }
//   }
// })
// model.content.assign({
//   propertyA: {
//     propertyB: {
//       propertyC: 3333
//     }
//   }
// })
// console.log(model.content.source)
// console.log(model.content.get("propertyA.propertyB").root)
// model.save()
// console.log(model.localStorage.get())
// model.unload()
// console.log(model.localStorage.get())

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
