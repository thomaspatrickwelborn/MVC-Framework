import { Core, Control, Model } from '/dependencies/mvc-framework.js'

const model = new Model({
  schema: {
    propertyA: {
      propertyB: {
        propertyC: Number
      }
    }
  },
  content: {
    propertyA: {
      propertyB: {
        propertyC: 333333333
      }
    }
  },
})

model.content.set(model.content)
console.log(model.content.object)