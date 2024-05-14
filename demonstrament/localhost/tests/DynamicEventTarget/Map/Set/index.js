import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'
export default function MapSetTest() {
  console.log('-----', '\n', 'MapGetTest', '\n', '-----')
  const map = new DynamicEventTarget(new Map())
  map.addEventListener(
    'set', ($event) => console.log($event.type, $event.detail)
  )
  map.addEventListener(
    'set:a', ($event) => console.log($event.type, $event.detail)
  )
  console.log(map.set('a', 1))
}