import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
const schema = new Schema(expandTree([{
  propertyA: {
    propertyB: String
  }
}], 'type'))
const content = [{
  propertyA: {
    propertyB: "BBBBBB"
  }
}]
console.log(content)
console.log(schema.validate(content))
