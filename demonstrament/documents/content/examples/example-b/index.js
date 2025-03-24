import { Content } from '/dependencies/mvc-framework.js'
function eventLog($event) {
  console.log(`type: ${$event.type}\npath: ${$event.path}\ndetail: `, JSON.stringify($event.detail, null, 2))
}
const object = new Content({})


console.log("------")
console.log("assign")
console.log("------")
object.addEventListener('assign', eventLog)
object.assign({
  propertyF: false,
}, {
  propertyA: { propertyB: { propertyC: 333 } },
  propertyD: [{
    propertyE: 555
  }],
}, {
  propertyF: true,
})
object.removeEventListener('assign', eventLog)
console.log(object.toString({ replacer: null, space: 2 }))


console.log("------------")
console.log("assignSource")
console.log("------------")
object.addEventListener('assignSource', eventLog)
object.assign({
  propertyF: false
}, {
  propertyA: { propertyB: { propertyG: 777 } },
  propertyD: { '1': { propertyE: 555 } },
}, {
  propertyF: true
})
object.removeEventListener('assignSource', eventLog)
console.log(object.toString({ replacer: null, space: 2 }))


console.log("--------------------")
console.log("assignSourceProperty")
console.log("--------------------")
object.addEventListener('assignSourceProperty', eventLog)
object.assign({
  propertyF: false
}, {
  propertyA: { propertyB: { propertyH: 101010 } },
  propertyD: { '2': { propertyE: 555 } },
}, {
  propertyF: true
})
