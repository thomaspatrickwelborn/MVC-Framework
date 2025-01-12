import { Model } from '/dependencies/mvc-framework.js'

const model = new Model({
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
})
console.log("model", model)