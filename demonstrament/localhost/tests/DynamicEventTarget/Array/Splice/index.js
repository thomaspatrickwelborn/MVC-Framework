import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'
export default function ArraySpliceTest() {
  console.log('-----', '\n', 'ArraySpliceTest', '\n', '-----')
  const array = new DynamicEventTarget([])
  array.addEventListener(
    'splice', ($event) => console.log($event.type, $event.detail)
  )
  array.addEventListener(
    'spliceAdd', ($event) => console.log($event.type, $event.detail)
  )
  array.addEventListener(
    'spliceDelete', ($event) => console.log($event.type, $event.detail)
  )
  array.push(1,2,3,4,5,6,7,8,9)
  array.splice(5,3,1,-1,-3,-5)
}