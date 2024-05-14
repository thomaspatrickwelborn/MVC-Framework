import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'
export default function MapDeleteTest() {
  console.log('-----', '\n', 'MapGetTest', '\n', '-----')
  const map = new DynamicEventTarget(new Map())
  map.addEventListener(
    'delete', ($event) => console.log($event.type, $event.detail)
  )
  map.addEventListener(
    'delete:a', ($event) => console.log($event.type, $event.detail)
  )
  console.log(map.delete('a'))
}