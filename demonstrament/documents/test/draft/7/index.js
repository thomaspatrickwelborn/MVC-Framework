import { Content } from '/dependencies/mvc-framework.js'
const content = new Content({
  propertyA: {
    propertyB: {
      propertyC: [{
        propertyD: 444
      }, {
        propertyD: 555
      }, {
        propertyD: 666
      }]
    }
  },
  propertyG: 777
})
console.log(content.object)