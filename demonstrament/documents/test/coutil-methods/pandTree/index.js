import { Coutil } from "/dependencies/mvc-framework.js"
const { expandTree, impandTree } = Coutil
const impandedTree = {
  propertyA: Number,
  propertyB: String,
  propertyC: Boolean,
}
const expandedTree = {
  propertyA: {
    type: {
      value: Number
    }
  },
  propertyB: {
    type: {
      value: String
    }
  },
  propertyC: {
    type: {
      value: Boolean
    }
  },
}
console.log("impandTree", impandTree(expandedTree, "type.value"))
console.log("expandTree", expandTree(impandedTree, "type.value"))
/*
console.log(
  "\n", "expandTree", expandTree({
    type: Number
  }, "type.value")
)
console.log(
  "\n", "impandTree", impandTree({
    type: {
      value: Number
    }
  }, "type.value")
)
*/
// console.log(impandTree({
//   type: {
//     value: Number
//   }
// }, "type.value"))
/*
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
*/
