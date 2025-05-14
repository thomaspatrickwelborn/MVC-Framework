import { Model, View, Control, SocketRouter, LocationRouter } from '/dependencies/mvc-framework.js'
const control = new Control({
  models: {
    ui: new Model({}),
    data: new Model({}),
  },
  views: {
    default: new View(),
  },
})
console.log(control)