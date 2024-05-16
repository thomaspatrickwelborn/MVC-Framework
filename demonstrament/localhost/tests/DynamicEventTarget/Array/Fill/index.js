import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'

export default function ArrayFillTest() {
  ArrayFillTestC()
  ArrayFillTestB()
  ArrayFillTestA()
}
function ArrayFillTestC() {
  console.log([
    '-----',
    'ArrayFillTestC',
    'Array Fill Method With Object',
    'Create Array Of Filled Object ',
  ].join('\n'))
  var detObject = new DynamicEventTarget({0:1,1:2,2:3})
  detObject.addEventListener('fillIndex', ($event) => {
    console.log($event.type, $event.detail)
  })
  detObject.addEventListener('fill', ($event) => {
    console.log($event.type, $event.detail)
  })
  detObject.fill(true, 0, 3)
  console.log('of', detObject.of())
}
function ArrayFillTestB() {
  console.log([
    '-----',
    'ArrayFillTestB',
    'Array Fill Method With Object',
    'Create Array',
  ].join('\n'))
  var detObject = new DynamicEventTarget({length: 3, 0:1,1:2,2:3})
  detObject.addEventListener('fillIndex', ($event) => {
    console.log($event.type, $event.detail)
  })
  detObject.addEventListener('fill', ($event) => {
    console.log($event.type, $event.detail)
  })
  detObject.fill(true, 0, 3)
  console.log('detObject.from()', detObject.from())
  console.log('detObject.isArray()', detObject.isArray())
}
function ArrayFillTestA() {
  console.log([
    '-----',
    'ArrayFillTestA',
    'DET Array Fill Method With Array',
    'Array Fill Method With Array',
  ].join('\n'))
  var detArray = new DynamicEventTarget([])
  detArray.addEventListener('fillIndex', ($event) => {
    console.log($event.type, $event.detail)
  })
  detArray.addEventListener('fill', ($event) => {
    console.log($event.type, $event.detail)
  })
  detArray.length = 100
  console.log(
    "detArray.fill({a:1,b:2,c:3}, 0, 100)",
    detArray.fill({a:1,b:2,c:3}, 0, 100)
  )
  var array = new Array([])
  array.length = 100
  console.log(
    "array.fill({a:1,b:2,c:3}, 0, 100)",
    array.fill({a:1,b:2,c:3}, 0, 100)
  )
}
