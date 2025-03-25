console.log("==========")
console.log("set Method")
console.log("==========")

import { Content } from '/dependencies/mvc-framework.js'
function eventLog($event) {
  console.log(
    `type: ${$event.type}\npath: ${$event.path}\ndetail: `, 
    JSON.stringify($event.detail, null, 2), 
  )
}
const object = new Content({})

console.log("------------")
console.log("setProperty")
console.log("------------")
object.addEventListener('setProperty', eventLog)
object.set({
  propertyA: { propertyB: { propertyG: 777 } },
  propertyD: { '0': { propertyE: 555 } },
  propertyF: true,
})
object.removeEventListener('set', eventLog)
console.log(object.toString({ replacer: null, space: 2 }))

console.log("---")
console.log("set")
console.log("---")
object.addEventListener('set', eventLog)
object.set({
  propertyA: { propertyB: { propertyH: 101010 } },
  propertyD: { '1': { propertyE: 555 } },
  propertyF: false,
})
object.removeEventListener('set', eventLog)
console.log(object.toString({ replacer: null, space: 2 }))
