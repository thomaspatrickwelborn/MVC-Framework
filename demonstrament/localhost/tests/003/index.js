import DynamicEventTarget from '/mvc-framework/Core/DynamicEventTarget/index.js'

function DOMContentLoaded($event) {
  subtestT()
  // subtestS()
  // subtestR()
  // subtestQ()
  // subtestP()
  // subtestO()
  // subtestN()
  // subtestM()
  // subtestL()
  // subtestK()
  // subtestJ()
  // subtestI()
  // subtestH()
}

function subtestT() {
  var object = new DynamicEventTarget({})
  object.content.addEventListener = "meh"
  console.log(object.content)
  console.log(object.addEventListener)
  console.log(object.content.addEventListener)
  object.addEventListener = "meh"
  console.log(object.content)
  console.log(object.addEventListener)
  console.log(object.content.addEventListener)
  object.meh = "Meh"
  console.log(object.meh)
  console.log(object.content.meh)
}

function subtestS() {
  var dynamicEventTarget = new DynamicEventTarget([])
  dynamicEventTarget.addEventListener(
    'set', ($event) => console.log($event.type, $event.detail)
  )
  dynamicEventTarget.addEventListener(
    'deleteProperty', ($event) => console.log($event.type, $event.detail)
  )
  dynamicEventTarget.length = 10
  console.log(dynamicEventTarget)
  console.log(dynamicEventTarget.toObject())
  dynamicEventTarget.length = 0
  console.log(dynamicEventTarget)
  console.log(dynamicEventTarget.toObject())
  dynamicEventTarget.length = 5
  dynamicEventTarget.push(0)
  console.log(dynamicEventTarget.toObject())
  dynamicEventTarget.splice(1, 1, 1)
  dynamicEventTarget.fill(2345, 2)
  console.log(dynamicEventTarget.toObject())
}

function subtestR() {
  var dynamicEventTarget = new DynamicEventTarget([])
  dynamicEventTarget.addEventListener(
    'set', ($event) => console.log($event.type, $event.detail)
  )
  dynamicEventTarget.addEventListener(
    'deleteProperty', ($event) => console.log($event.type, $event.detail)
  )
  dynamicEventTarget.unshift(1,2,3,4,5)
  dynamicEventTarget.unshift(5,4,3,2,1)
  dynamicEventTarget.push(5,4,3,2,1)
  dynamicEventTarget.push(1,2,3,4,5)
  dynamicEventTarget.length = 30
  dynamicEventTarget.fill(333, 20, 30)
  console.log(dynamicEventTarget.toObject())
}

function subtestQ() {
  var dynamicEventTarget = new DynamicEventTarget([])
  dynamicEventTarget.addEventListener(
    'set', ($event) => console.log($event.type, $event.detail)
  )
  dynamicEventTarget.addEventListener(
    'deleteProperty', ($event) => console.log($event.type, $event.detail)
  )
  dynamicEventTarget.push(1)
  dynamicEventTarget.push(2,3,4,5)
  dynamicEventTarget.push([6,7,8,9,10])
  dynamicEventTarget[5].push([11,12,13,14,15])
  dynamicEventTarget[5][5].push({
    aaa: "aaa"
  })
  dynamicEventTarget[5][5][5].bbb = "bbb"
  dynamicEventTarget.shift()
  console.log(dynamicEventTarget.toObject())
  dynamicEventTarget.shift()
  console.log(dynamicEventTarget.toObject())
  dynamicEventTarget[3].shift()
  console.log(dynamicEventTarget.toObject())
  dynamicEventTarget.pop()
  console.log(dynamicEventTarget.toObject())
}

function subtestP() {
  var dynamicEventTarget = new DynamicEventTarget({
    aaa: "AAA",
    bbb: "BBB",
    ccc: "CCC",
  })
  dynamicEventTarget.addEventListener(
    'set', ($event) => console.log($event.type, $event.detail)
  )
  dynamicEventTarget.addEventListener(
    'deleteProperty', ($event) => console.log($event.type, $event.detail)
  )
  dynamicEventTarget.ddd = {
    eee: "EEE",
    fff: "FFF",
    ggg: "GGG"
  }
  dynamicEventTarget.ddd.hhh = [
    "III", "JJJ", "KKK", {
      lll: "LLL",
      mmm: "MMM",
      nnn: "NNN"
    }
  ]
  dynamicEventTarget.ddd.hhh[4] = {
    ooo: "OOO",
    ppp: "PPP",
    qqq: "QQQ"
  }
  dynamicEventTarget.ddd.hhh[4].rrr = "RRR"

  delete dynamicEventTarget.ddd.hhh[4].rrr
  dynamicEventTarget.ddd.hhh.splice(1, 2)
}

function subtestO() {
  var dynamicEventTarget = new DynamicEventTarget([])
  dynamicEventTarget.addEventListener(
    'set', ($event) => console.log($event.type, $event.detail)
  )
  dynamicEventTarget.addEventListener(
    'delete', ($event) => console.log($event.type, $event.detail)
  )
  dynamicEventTarget.splice(1, 3)
  dynamicEventTarget.push(1)
  dynamicEventTarget.push(2,3,4,5)
  dynamicEventTarget.splice(3, 3, 6, 7, 8, 9)
  console.log(dynamicEventTarget.toObject())
}

function subtestN() {
  var dynamicEventTarget = new DynamicEventTarget([])
  dynamicEventTarget.addEventListener(
    'set', ($event) => console.log($event.type, $event.detail)
  )
  dynamicEventTarget.addEventListener(
    'delete', ($event) => console.log($event.type, $event.detail)
  )
  dynamicEventTarget[1] = 1
  dynamicEventTarget[3] = 3
  dynamicEventTarget[5] = [
    7, 9, 11
  ]
  dynamicEventTarget[5][13] = {
    aaa: "AAA"
  }
  dynamicEventTarget[5][13].bbb = "BBB"
  dynamicEventTarget.splice(1, 1)
  dynamicEventTarget.splice(0, 4)
  delete dynamicEventTarget[0][13].aaa
}

function subtestM() {
  var dynamicEventTarget = new DynamicEventTarget()
  dynamicEventTarget.addEventListener('set', ($event) => console.log($event.detail))
  // dynamicEventTarget.addEventListener('delete', ($event) => console.log($event))
  dynamicEventTarget.aaa = "AAA"
  dynamicEventTarget.bbb = {
    ccc: "CCC"
  }
  dynamicEventTarget.bbb.ddd = {
    eee: "EEE"
  }
}

function subtestL() {
  var dynamicEventTarget = new DynamicEventTarget([])
  dynamicEventTarget.addEventListener(
    'set', ($event) => console.log($event.type, $event.detail)
  )
  dynamicEventTarget.addEventListener(
    'delete', ($event) => console.log($event.type, $event.detail)
  )
  dynamicEventTarget.push(111,222,333)
  dynamicEventTarget.splice(2, 1)
  dynamicEventTarget.push([444, 555, 666])
  dynamicEventTarget[2].splice(2, 1)
  dynamicEventTarget[3] = 4
  console.log(dynamicEventTarget)
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

