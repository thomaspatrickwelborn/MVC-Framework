import { Model, Coutil } from '/dependencies/mvc-framework.js'
import {
  validatorEventLog, contentEventLog, changeEventLog
} from "../../coutil/logs/index.js"
const { expandTree } = Coutil

const array = []
const arrayModel = new Model({
  schema: expandTree([{
    propertyA: {
      propertyB: String
    }
  }], "type"),
  content: [],
  events: {
    "change": changeEventLog,
    "content defineProperties": contentEventLog,
    "content defineProperty": contentEventLog,
    "content validProperty": validatorEventLog,
    "content nonvalidProperty": validatorEventLog,
  },
})
const arraySchema = arrayModel.schema
const arrayContent = arrayModel.content

// Object.defineProperties(array, {
//   "2": { value: {
//     propertyA: {
//       propertyB: "333333"
//     }
//   } },
//   "3": { value: {
//     propertyA: {
//       propertyB: "444444"
//     }
//   } },
// })
// arrayContent.defineProperties({
//   "2": { value: expandTree({
//     propertyA: {
//       propertyB: "333333"
//     }
//   }, "value") },
//   "3": { value: expandTree({
//     propertyA: {
//       propertyB: "444444"
//     }
//   }, "value") },
// })
// console.log(array)
// console.log(arrayContent.object)
// Object.defineProperties(array, [{
//   value: {
//     propertyA: {
//       propertyB: "111111"
//     }
//   }
// }, {
//   value: {
//     propertyA: {
//       propertyB: "222222"
//     }
//   }
// }])
// arrayContent.defineProperties([{
//   value: expandTree({
//     propertyA: {
//       propertyB: "111111"
//     }
//   }, "value")
// }, {
//   value: expandTree({
//     propertyA: {
//       propertyB: "222222"
//     }
//   }, "value")
// }])
// console.log(array)
// console.log(arrayContent.object)

arrayContent.defineProperties({
  "4": { value: 953 }
})
// arrayContent.defineProperties([{
//   value: expandTree({
//     propertyC: {
//       propertyD: true
//     }
//   }, "value")
// }])
