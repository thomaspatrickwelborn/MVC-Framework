import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'

export default function ArrayFillTest() {
  var detArray = new DynamicEventTarget([])
  detArray.addEventListener('fillIndex', ($event) => {
    console.log($event.type, $event.detail)
  })
  detArray.addEventListener('fill', ($event) => {
    console.log($event.type, $event.detail)
  })
  detArray.length = 100
  console.log(detArray.fill({a:1,b:2,c:3}, 0, 100))
  var array = new Array([])
  array.length = 100
  console.log(array.fill({a:1,b:2,c:3}, 0, 100))
}
