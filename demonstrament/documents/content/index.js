import { Content } from '/dependencies/mvc-framework.js'
function eventLog($event) {
  console.log($event.type, $event.detail)
}
const content = new Content()
// content.addEventListener('setProperty', eventLog)
content.addEventListener('set', eventLog)
content.set({
  propertyA: 1,
  propertyB: 2,
  propertyC: 3,
  propertyD: {
    propertyE: 5,
  }
})
content.addEventListener('deleteProperty', eventLog)
content.delete('propertyD.propertyE')
