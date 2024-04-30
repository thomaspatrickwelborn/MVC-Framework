export default function subtestD() {
  var arrayEventTarget = new DynamicEventTarget(
    [1,2,3,[4,5,6]]
  )
  // console.log('arrayEventTarget', arrayEventTarget)
  var objectEventTarget = new DynamicEventTarget({
    "111": 111,
    "222": 222,
    "333": 333,
  })
  // console.log('objectEventTarget', objectEventTarget)
  arrayEventTarget.addEventListener('change', ($event) => console.log($event) )
  arrayEventTarget.dispatchEvent(new CustomEvent('change'))
  objectEventTarget["444"] = [555, 666, 777]
  // console.log('objectEventTarget', objectEventTarget['111'])
  console.log(arrayEventTarget)
  console.log(objectEventTarget)
}