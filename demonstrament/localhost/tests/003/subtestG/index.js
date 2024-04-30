export default function subtestG() {
  const dynamicEventTarget = new DynamicEventTarget([])
  dynamicEventTarget.addEventListener('set', ($event) => console.log($event))
  dynamicEventTarget[0] = 111
  dynamicEventTarget.push(222)
  dynamicEventTarget[2] = 333
  console.log(dynamicEventTarget[1])
  console.log(dynamicEventTarget[0])
  dynamicEventTarget['addEventListener'] = 444
  console.log(dynamicEventTarget['addEventListener'])
  // dynamicEventTarget.push(1)
  // dynamicEventTarget.push(2)
  // dynamicEventTarget.push(3)
  // dynamicEventTarget.push(4, 5, 6)
  // console.log(dynamicEventTarget.at(3))
  // dynamicEventTarget.splice(3, 1)
  // console.log(dynamicEventTarget.at(3))
  // dynamicEventTarget.splice(3, 1)
  // console.log(dynamicEventTarget.at(3))
  // dynamicEventTarget.content[4] = 7
  // console.log(dynamicEventTarget.content[4])
  // console.log(dynamicEventTarget.content)

  // dynamicEventTarget.set('a', 111)

  // const dynamicEventTarget = new DynamicEventTarget({})
  // console.log(dynamicEventTarget.content)
  // dynamicEventTarget.content.a = 111
  // dynamicEventTarget.content.b = true
  // dynamicEventTarget.content.c = '333'
  // dynamicEventTarget.addEventListener('set', ($event) => console.log($event))
  // dynamicEventTarget.dispatchEvent(new CustomEvent('set', {
  //   detail: 444
  // }))

  // console.log(dynamicEventTarget.content)
  // dynamicEventTarget.content = []
  // console.log(dynamicEventTarget.addEventListener)
  // console.log(dynamicEventTarget.removeEventListener)
  // console.log(dynamicEventTarget.dispatchEvent)
  // console.log(dynamicEventTarget.content)
  // console.log(dynamicEventTarget)
}