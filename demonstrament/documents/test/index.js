import { Content, Model } from '/dependencies/mvc-framework.js'
// const content = new Content({
//   propertyA: "AAA",
// })
// content.addEventListener('getProperty:propertyA', function getPropertyA($event) {
//   console.log($event.type, $event.basename, $event.detail)
// })
// content.addEventListener('setProperty:propertyA', function setPropertyA($event) {
//   console.log($event.type, $event.basename, $event.detail)
// })
// content.addEventListener('deleteProperty:propertyA', function deletePropertyA($event) {
//   console.log($event.type, $event.basename, $event.detail)
// })
// content.get('propertyA')
// content.set('propertyA', "AAAAAA")
// content.delete('propertyA')
// content.get('propertyA')

const { content } = new Model({
  content: {
    propertyA: {
      propertyB: {
        propertyC: "CCC"
      }
    }
  },
  events: {
    // "content.propertyA.propertyB getProperty": function getProperty($event) {
    //   $event.type, $event.basename, $event.detail
    // },
    "content.propertyA.propertyB getProperty:propertyC": function getPropertyC($event) {
      console.log($event.type, $event.basename, $event.detail)
    }
  }
}, { enableEvents: true })

console.log(content.get("propertyA.propertyB.propertyC"))