import { Coutil } from "/dependencies/mvc-framework.js"
const { expandTree } = Coutil
console.log("validatorTree", expandTree({
  propertyA: {
    propertyB: String
  }
}, "type"))
console.log("propertyDescriptorTree", expandTree({
  propertyA: {
    propertyB: "propertyB"
  }
}, "value", {
  configurable: false,
  enumerable: true,
  writable: false,
}))

console.log("schemaPropertyConfig", expandTree([{
  propertyA: {
    propertyB: String
  }
}], "value"))