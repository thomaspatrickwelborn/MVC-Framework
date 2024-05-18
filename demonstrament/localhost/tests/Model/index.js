import Model from '/mvc-framework/Model/index.js'
import DynamicEventTarget from '/mvc-framework/Core/DynamicEventTarget/index.js'
function DOMContentLoaded($event) {
  var object = new DynamicEventTarget({
    aaa: {
      bbb: 111
    }
  })
  object.content.aaa.addEventListener(
    'defineProperty:bbb', ($event) => console.log($event.type, $event.detail)
  )
  object.content.aaa.defineProperty('bbb', {
    value: 111111
  })
}
function SubtestD($event) {
  // const map = new DynamicEventTarget(new Map([
  //   ["aaaa", 1111],
  //   ["bbbb", 2222],
  //   ["cccc", 3333],
  // ]))
  // console.log
  const object = new DynamicEventTarget({
    aaa: 111,
    bbb: 222,
    ccc: 333,
    ddd: {
      eee: 444,
      fff: 555,
      ggg: 666
    },
  })
  // object.addEventListener(
  //   'assignSourceProperty:ddd', ($event) => console.log(
  //     $event.type, $event.detail
  //   )
  // )
  // object.content.ddd.addEventListener(
  //   'assignSourceProperty:eee', ($event) => console.log(
  //     $event.type, $event.detail
  //   )
  // )
  // object.content.ddd.assign({
  //   eee: 444444
  // })
  // object.assign({
  //   ddd: { eee: 555555 }
  // })
  object.addEventListener(
    'defineProperties', ($event) => console.log(
      'EVENT', $event.type, $event.detail
    )
  )
  object.addEventListener(
    'defineProperty', ($event) => console.log(
      'EVENT', $event.type, $event.detail
    )
  )
  object.addEventListener(
    'defineProperty:ddd', ($event) => console.log(
      'EVENT', $event.type, $event.detail
    )
  )

  object.content.ddd.addEventListener(
    'defineProperties', ($event) => console.log(
      'EVENT', $event.type, $event.detail
    )
  )
  object.content.ddd.addEventListener(
    'defineProperty', ($event) => console.log(
      'EVENT', $event.type, $event.detail
    )
  )
  object.content.ddd.addEventListener(
    'defineProperty:eee', ($event) => console.log(
      'EVENT', $event.type, $event.detail
    )
  )
  object.content.ddd.defineProperties({
    eee: { value: 555555 }
  })
  console.log(object)
}

function SubtestC($event) {
  var content = {
    // aaa: 111,
    // bbb: false,
    // ccc: '333',
    ddd: {
      zzz: 262,
      yyy: true,
      xxx: '242',
    },
    // eee: [232, true, '231'],
    // fff: {
    //   ggg: 777,
    //   hhh: false,
    //   iii: '777',
    // },
  }
  var events = {
    // 'content assign': ($event) => { console.log($event.type, $event.detail) },
    // 'content assignSource': ($event) => { console.log($event.type, $event.detail) },
    // 'content assignSourceProperty': ($event) => { console.log($event.type, $event.detail) },
    // 'content assignSourceProperty:aaa': ($event) => { console.log($event.type, $event.detail) },
    // 'content.ddd assign': ($event) => { console.log($event.type, $event.detail) },
    // 'content.ddd assignSource': ($event) => { console.log($event.type, $event.detail) },
    // 'content.ddd assignSourceProperty': ($event) => { console.log($event.type, $event.detail) },
    'content.ddd assignSource': ($event) => { console.log($event.type, $event.detail) },
    'content.ddd assignSourceProperty': ($event) => { console.log($event.type, $event.detail) },
    'content.ddd assignSourceProperty:zzz': ($event) => { console.log($event.type, $event.detail) },
  }
  const model = new Model({ content, events }, { enable: true }).content
  // console.log(schema.aaa(1))
  // console.log(model.content.assign({ aaa: 111111 }))
  model.assign({ ddd: { zzz: 262626 } })
  model.content.ddd.assign(({
    zzz: 262626,
  }))
  // console.log(model.assign({
  //   ddd: {
  //     zzz: 
  //   }
  // }))
  // model.assign( { zzz: 262626 })
  // console.log(model)

  // var schema2 = new Schema(new Array(String, Number, Boolean, Object, Array, Map))
  // console.log(schema2[0]({ aaa: 111 }))
  // console.log(schema2[1](true))
  // var schema3 = new Schema(new Map())
}

function SubtestB($event) {
  const model = new Model({
    content: { aaa: 111, bbb: 222, ccc: 333 },
    events: {
      'content defineProperty': function defineProperty($event) {
        console.log($event.type, $event.detail)
      },
      'content assign': function assign($event) {
        console.log($event.type, $event.detail)
      }
    },
  }, {
    enable: true
  })
  // console.log(model.assign({ aaa: 111111, ccc: 333333 }))
  model.content.assign({ aaa: 111111, ccc: 333333 })
  // console.log(model.defineProperty('bbb', { value: 222222 }))
  model.content.defineProperty('bbb', { value: 222222 })
  // console.log(model.content)
}

function SubtestA() {
  var model = new Model()
  model.content.addEventListener(
    'assign', ($event) => console.log($event.type, $event.detail)
  )
  model.content.addEventListener(
    'defineProperty', ($event) => console.log($event.type, $event.detail)
  )
  model.assign({ aaa: 111 })
  console.log(model.assign({b: 222}))
  console.log(model.defineProperty('c', { value: 333  }))
  model.assign({a: 1})
  console.log(model.keys())
  console.log(model)
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
