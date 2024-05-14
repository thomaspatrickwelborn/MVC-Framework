import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'
export default function ArrayPopTest() {
  console.log('-----', '\n', 'ArrayPopTest', '\n', '-----')
  const array = new DynamicEventTarget([])
  array.addEventListener(
    'pop', ($event) => console.log($event.type, $event.detail)
  )
  console.log(array.push(1,2,3,4,5,6,7,8,9))
  console.log(array.pop())
}