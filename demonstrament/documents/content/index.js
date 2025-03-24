import { Content } from '/dependencies/mvc-framework.js'
const content = new Content()
content.addEventListener('set', function($event) { console.log($event.type, $event) })
content.set('propertyA', 333)
content.set({
  propertyA: 333333
})
console.log("content", content.get("propertyA"))