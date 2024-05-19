import Model from '/mvc-framework/Model/index.js'
import DynamicEventTarget from '/mvc-framework/Core/DynamicEventTarget/index.js'
function DOMContentLoaded() {
  var model = new Model({
    content: [],
  })
  console.log()
  model.content.defineProperty('aaa', {
    get() { return 111 }
  })
  model.content.defineProperty('bbb', {
    get() { return 222 }
  })
  model.content.addEventListener(
    'defineProperty', ($event) => console.log($event.type, $event.detail)
  )

  model.content.defineProperty('ccc', {
    get() { return 333 }
  })
  model.content.defineProperty('ddd', {
    get() { return 444 }
  })
  model.content.addEventListener(
    'defineProperty:eee', ($event) => console.log($event.type, $event.detail)
  )

  model.content.defineProperty('eee', {
    get() { return 555 }
  })
}
function SubtestI() {
  var model = new Model({})
  // model.content.defineProperties({
  //   ['aaa']: {
  //     enumerable: true,
  //     value: {},
  //     defineProperties: {
  //       ['bbb']: {
  //         enumerable: true,
  //         value: {},
  //         defineProperties: {
  //           ['ccc']: {
  //             enumerable: true,
  //             value: [],
  //             defineProperties: {
  //               0: { value: 444 },
  //               1: { value: 555 },
  //               2: { value: 666 },
  //             },
  //           }
  //         }
  //       }
  //     }
  //   }
  // })
  model.content.defineProperties({
    ['aaa']: {
      enumerable: true,
      value: {},
      defineProperties: {
        ['bbb']: {
          enumerable: true,
          value: {},
          defineProperties: {
            ['ccc']: {
              enumerable: true,
              value: [444,555,666]
            }
          }
        }
      }
    }
  })
  // model.content.defineProperties({
  //   aaa: {
  //     value: [1,2,3]
  //   }
  // })
  console.log('model', model)
  console.log(model.content.aaa.bbb.ccc)
  console.log(model.content.aaa.content.bbb.content.ccc)
}
function SubtestH() {
  var model = new Model({
    content: {
      aaa: {
        bbb: {
          ccc: {
            ddd: 444
          }
        }
      }
    },
    events: {
      'content.aaa.bbb.ccc assign': ($event) => console.log($event.type, $event.detail)
    }
  }, { enable: true })
  model.content.aaa.bbb.ccc.assign({ ddd: 444444 })
}
function SubtestG() {
  var object = new DynamicEventTarget({
    aaa: {
      bbb: {
        ccc: {
          ddd: 444
        }
      }
    }
  })
  // console.log(object.content.aaa.content.bbb.content.ccc.content.ddd)
  // console.log(object.aaa.bbb.ccc.ddd)
  object.aaa.bbb.ccc.assign({ ddd: 444444 })
  // console.log(object.aaa.bbb.ccc.ddd)
  object.aaa.bbb.ccc.assign({ addEventListener: 1445 })
  // console.log(object.aaa.bbb.ccc.addEventListener)
  // console.log(object.aaa.bbb.ccc.entries())
  object.aaa.bbb.ccc.addEventListener(
    'assign', ($event) => console.log($event.type, $event.detail)
  )
  object.aaa.bbb.ccc.assign({ eee: 5555555 })
  // object.addEventListener
  // object.content.aaa.addEventListener
  // object.addEventListener = 33
}
function SubtestF() {
  var model = new Model({
    content: {
      aaa: {
        bbb: 111
      }
    },
    events: {
      'content assign:aaa': ($event) => console.log($event.type, $event.detail)
    }
  })
  model.content.assign
}
function SubtestE() {
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
