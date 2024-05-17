import Model from '/mvc-framework/Model/index.js'
import DynamicEventTarget from '/mvc-framework/Core/DynamicEventTarget/index.js'
function DOMContentLoaded($event) {
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
