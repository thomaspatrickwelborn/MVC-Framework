import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'
export default function ArrayShiftTest() {
  console.log('-----', '\n', 'ArrayShiftTest', '\n', '-----')
  const array = new DynamicEventTarget([])
  array.addEventListener(
    'shift', ($event) => console.log($event.type, $event.detail)
  )
  console.log(array.push(1,2,3,4,5,6,7,8,9))
  console.log(array.shift())
}