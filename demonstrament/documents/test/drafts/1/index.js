import { Control } from '/dependencies/mvc-framework.js'

const control = new Control({
  models: {
    model: [{
      schema: {
        propertyA: {
          propertyB: {
            propertyC: Boolean,
            propertyD: Number,
            propertyE: String,
          },
          propertyF: Boolean,
          propertyG: Number,
          propertyH: String,
        },
        propertyI: Boolean,
        propertyJ: Number,
        propertyK: String,
      },
      content: {
        propertyA: {
          propertyB: {
            propertyC: false,
            propertyD: 0,
            propertyE: "false",
          },
          propertyF: true,
          propertyG: 1,
          propertyH: "true",
        },
        propertyI: false,
        propertyJ: 0,
        propertyK: "false",
      },
    }, { schema: { required: true } }]
  },
  events: {
    'models.model.content assign': ($event) => console.log("EVENT", $event.type, $event),
    'models.model.content defineProperties': ($event) => console.log("EVENT", $event.type, $event),
    'models.model.content defineProperty': ($event) => console.log("EVENT", $event.type, $event.key, $event.value),
  },
}, { enableEvents: true })
const { content } = control.models.model
// NONVALID
content.assign({ propertyK: 11111 })
content.defineProperties({ propertyK: { value: 11111 } })
content.defineProperty("propertyK", 11111)
// VALID
content.assign({ propertyK: "11111" })
content.defineProperties({ propertyK: { value: "11111" } })
content.defineProperty("propertyK", { value: "11111" })
// console.log(control)
// const model = new Model({
//   schema: {
//     propertyA: {
//       propertyB: {
//         propertyC: Boolean,
//         propertyD: Number,
//         propertyE: String,
//       },
//       propertyF: Boolean,
//       propertyG: Number,
//       propertyH: String,
//     },
//     propertyI: Boolean,
//     propertyJ: Number,
//     propertyK: String,
//   },
//   content: {
//     propertyA: {
//       propertyB: {
//         propertyC: false,
//         propertyD: 0,
//         propertyE: "false",
//       },
//       propertyF: true,
//       propertyG: 1,
//       propertyH: "true",
//     },
//     propertyI: false,
//     propertyJ: 0,
//     propertyK: "false",
//   },
// })
// console.log("model", model)