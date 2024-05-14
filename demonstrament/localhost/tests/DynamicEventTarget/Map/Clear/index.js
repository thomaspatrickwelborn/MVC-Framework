import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'
export default function MapClearTest() {
  console.log('-----', '\n', 'MapClearTest', '\n', '-----')
  const map = new DynamicEventTarget(new Map([
    ['a', 111],
    ['b', 222],
    ['c', 333],
  ]))
  map.addEventListener(
    'clear', ($event) => console.log($event.type, $event.detail)
  )
  console.log(map.clear())
}