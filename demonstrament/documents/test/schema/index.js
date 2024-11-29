import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
const schemaA = new Schema(expandTree([{
  propertyA: {
    propertyB: String
  }
}], 'type'), {
  validationType: 'primitive'
})
const schemaB = new Schema(expandTree({
  propertyA: String
}, "type"))

// console.log("-----")
// const contentA = [{
//   propertyA: {
//     propertyB: "BBBBBB"
//   }
// }]
// const contentAValidation = schemaA.validate(contentA)
// console.log("contentAValidation", contentAValidation)

// console.log("-----")
// const contentB = [{
//   propertyC: {
//     propertyD: "DDDDDD"
//   }
// }]
// const contentBValidation = schemaA.validate(contentB)
// console.log("contentBValidation", contentBValidation)

// console.log("-----")
// const contentC = [{
//   propertyC: {
//     propertyD: 444444
//   }
// }]
// const contentCValidation = schemaA.validate(contentC)
// console.log("contentCValidation", contentCValidation)

const contentD1 = {
  propertyA: "AAAAAA"
}
const contentD2 = {
  propertyA: 111111
}
const contentD3 = {
  propertyB: true
}
console.log(`schemaB.validateProperty(${"propertyA"}, ${contentD1.propertyA})`)
console.log(schemaB.validateProperty("propertyA", contentD1.propertyA))
