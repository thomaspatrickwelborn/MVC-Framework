import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'
export default function ArrayFillTest() {
  ArrayFillTestA()
}

function ArrayFillTestA() {
  console.log(
    '\n', '-----', 
    '\n', 'ArrayFillTestA', 
    '\n', '-----'
  )
  const array = new DynamicEventTarget([])
  const array2 = new Array([])
  // array.addEventListener(
  //   'fill', ($event) => console.log($event.type, $event.detail)
  // )
  // array.addEventListener(
  //   'fillIndex', ($event) => console.log('Event', $event.type, $event.detail)
  // )
  array.length = 3
  const arrayFill = array.fill(123456789, 0, 3)
  array2.length = 3
  const array2Fill = array2.fill(123456789, 0, 3)
  let arrayIndex = 0
  while(arrayIndex < arrayFill.length) {
    console.assert(
      array.at(arrayIndex) === array2.at(arrayIndex),
      [
        `array.at(${arrayIndex}) !== array2.at(${arrayIndex})`,
        `${array.at(arrayIndex)} !== ${array2.at(arrayIndex)}`
      ].join('\n'),
    )
    arrayIndex++
  }
}
