import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'
export default function ArrayUnshiftTest() {
  console.log('-----', '\n', 'ArrayUnshiftTest', '\n', '-----')
  const array = new DynamicEventTarget([])
  array.addEventListener(
    'unshift', ($event) => console.log($event.type, $event.detail)
  )
  array.addEventListener(
    'unshiftProp', ($event) => console.log($event.type, $event.detail)
  )
  console.log(array.unshift(1,2,3,4,5,6,7,8,9))
}