import Model from '/mvc-framework/Model/index.js'
import DynamicEventTarget from '/mvc-framework/Core/DynamicEventTarget/index.js'
function DOMContentLoaded($event) {
  var model = new Model()
  model.content.addEventListener(
    'assign', ($event) => console.log($event.type, $event.detail)
  )
  model.content.addEventListener(
    'defineProperty', ($event) => console.log($event.type, $event.detail)
  )
  model.assign({ aaa: 111 })
  console.log(model.assign({b: 222}))
  console.log(model.defineProperty('c', { value: 333 }))
  // model.assign({a: 1})
  // console.log(model.keys())
  // console.log(model)
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
