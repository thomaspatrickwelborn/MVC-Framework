import DynamicEventTarget from '/mvc-framework/Core/DynamicEventTarget/index.js'

function DOMContentLoaded($event) {
  subtestL()
  // subtestK()
  // subtestJ()
  // subtestI()
  // subtestH()
}

function subtestL() {
  var dynamicEventTarget = new DynamicEventTarget([])
  
}

function subtestK() {
  var dynamicEventTarget = new DynamicEventTarget([])
  // dynamicEventTarget.addEventListener('set', ($event) => console.log($event))
  dynamicEventTarget.addEventListener('set:5.4', ($event) => console.log($event))
  dynamicEventTarget.push(1,2,3,4,5)
  dynamicEventTarget.push([6,7,8,9,10])
  dynamicEventTarget.content[5][4] = {
    aaa: 111,
    bbb: 222,
    ccc: 333,
  }
  dynamicEventTarget.addEventListener('set:5.4.aaa', ($event) => console.log($event))
  dynamicEventTarget.addEventListener('set:5.4.bbb', ($event) => console.log($event))
  dynamicEventTarget.addEventListener('set:5.4.ccc', ($event) => console.log($event))
  dynamicEventTarget.content[5][4].aaa = 111111
  dynamicEventTarget.content[5][4].bbb = 222222
  dynamicEventTarget.content[5][4].ccc = 333333
}

function subtestJ() {
  var dynamicEventTarget = new DynamicEventTarget([])
  dynamicEventTarget.addEventListener(
    'set', ($event) => console.log(
      '\n', '-----', 
      '\n', `Event: $event.type`, $event.detail,
      '\n',  '-----', 
    )
  )
  dynamicEventTarget[0] = null
  dynamicEventTarget.push(undefined)
  // dynamicEventTarget.length = 0
  console.log(dynamicEventTarget.content)
}

function subtestI() {
  var dynamicEventTargetA = new DynamicEventTarget()
  var dynamicEventTargetB = new DynamicEventTarget({})
  var dynamicEventTargetC = new DynamicEventTarget([])
  var dynamicEventTargetD = new DynamicEventTarget({
    aaa: 111,
    bbb: 222,
    ccc: 333,
  })
  var dynamicEventTargetE = new DynamicEventTarget([
    111, 222, 333
  ])
  console.log('dynamicEventTargetD', dynamicEventTargetD)
  console.log('dynamicEventTargetE', dynamicEventTargetE)
}
function subtestH() {
  var dynamicEventTarget = new DynamicEventTarget()
  dynamicEventTarget.length = 3
  dynamicEventTarget.addEventListener(
    'set', ($event) => console.log(
      '\n', '-----', 
      '\n', $event.type, $event.detail,
      '\n',  '-----', 
    )
  )
  dynamicEventTarget.addEventListener = 111
  // console.log('dynamicEventTarget', dynamicEventTarget)
}

document.addEventListener(
  'DOMContentLoaded', DOMContentLoaded
)

