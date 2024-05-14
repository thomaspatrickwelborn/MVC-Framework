import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'
export default function MapGetTest() {
  console.log('-----', '\n', 'MapGetTest', '\n', '-----')
  const map = new DynamicEventTarget(new Map([
    ['a', 111],
    ['b', 222],
    ['c', 333],
  ]))
  map.addEventListener(
    'get', ($event) => console.log($event.type, $event.detail)
  )
  map.addEventListener(
    'get:a', ($event) => console.log($event.type, $event.detail)
  )
  console.log(map.get('a'))
}