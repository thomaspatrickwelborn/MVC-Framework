export default function subtestF() {
  const dynamicEventTarget = new DynamicEventTarget([])
  console.log(dynamicEventTarget.push)
  console.log(dynamicEventTarget.push(111))
  console.log(dynamicEventTarget.at(0))
  console.log(dynamicEventTarget.includes(111))
  console.log(dynamicEventTarget[0])
  dynamicEventTarget[2] = 333
  console.log(dynamicEventTarget.length)
  dynamicEventTarget.splice(1, 1)
  console.log(dynamicEventTarget.length)
  dynamicEventTarget.addEventListener(
    'set', ($event) => { console.log($event) }
  )
  dynamicEventTarget.dispatchEvent(new CustomEvent(
    'set', { detail: 'set' }
  ))
  console.log(dynamicEventTarget)
} 
