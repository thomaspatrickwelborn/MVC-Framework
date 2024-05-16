import Model from '/mvc-framework/Model/index.js'
import DynamicEventTarget from '/mvc-framework/Core/DynamicEventTarget/index.js'
function DOMContentLoaded($event) {
  var model = new Model()
  console.log(model.assign({a: 1}))
  console.log(model)
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
