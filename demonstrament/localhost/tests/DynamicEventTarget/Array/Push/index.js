import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'
export default function ArrayPushTest() {
  console.log('-----', '\n', 'ArrayPushTest', '\n', '-----')
  const array = new DynamicEventTarget([])
  array.addEventListener(
    'push', ($event) => console.log($event.type, $event.detail)
  )
  array.addEventListener(
    'pushProp', ($event) => console.log($event.type, $event.detail)
  )
  console.log(array.push(1,2,3,4,5,6,7,8,9))
}