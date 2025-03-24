import { Content } from '/dependencies/mvc-framework.js'
function eventLog($event) {
  console.log($event.type, $event.path, $event.detail)
}
// const object = new Content({})
const object = new Content({
  propertyA: { propertyB: { propertyC: 333 } },
  propertyD: [{
    propertyE: 555
  }],
  propertyF: false,
})
object.addEventListener('assign', eventLog)
object.assign({
  propertyA: { propertyB: { propertyC: 333 } },
  propertyD: [{
    propertyE: 555
  }],
  propertyF: false,
})
console.log(object.object)
/*
const content = new Content()
content.addEventListener('setProperty', eventLog)
content.addEventListener('set', eventLog)
content.set({
  propertyA: 1,
  propertyB: 2,
  propertyC: 3,
  propertyD: {
    propertyE: 5,
    propertyF: {
      propertyG: 7
    }
  }
})
*/
// content.addEventListener('deleteProperty', eventLog)
// content.delete('propertyD.propertyE')
