import { Control } from '/dependencies/mvc-framework.js'

const control = new Control({
  models: {
    model: {
      schema: {
        // propertyA: {
        //   propertyB: {
        //     propertyC: Boolean,
        //     propertyD: Number,
        //     propertyE: String,
        //   },
          // propertyF: Boolean,
        //   propertyG: Number,
        //   propertyH: String,
        // },
        // propertyI: Boolean,
        // propertyJ: Number,
        propertyK: String,
      },
      content: {
        // propertyA: {
        //   propertyB: {
        //     propertyC: false,
        //     propertyD: 0,
        //     propertyE: "false",
        //   },
          // propertyF: true,
        //   propertyG: 1,
        //   propertyH: "true",
        // },
        // propertyI: false,
        // propertyJ: 0,
        propertyK: "false",
      },
    }
  }
})
const { content } = control.models.model
// NONVALID
console.log(content.assign({ propertyK: 11111 }))
console.log(content.defineProperty("propertyK", 11111))
console.log(content.defineProperties({ propertyK: { value: 11111 } }))
// VALID
console.log(content.assign({ propertyK: "11111" }))
console.log(content.defineProperty("propertyK", "11111"))
console.log(content.defineProperties({ propertyK: { value: "11111" } }))
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