import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'
export default function ArrayFillTest() {
  console.log('-----', '\n', 'ArrayFillTest', '\n', '-----')
  const array = new DynamicEventTarget([])
  array.addEventListener(
    'fill', ($event) => console.log($event.type, $event.detail)
  )
  array.addEventListener(
    'fillIndex', ($event) => console.log($event.type, $event.detail)
  )
  array.length = 3
  console.log(array.fill(123456789, 0, 3))
}