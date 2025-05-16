import { Model, View, Control, SocketRouter, LocationRouter } from '/dependencies/mvc-framework.js'
// const model = new Model([{
//       id: 0,
//       name: 'Some Item',
//       price: {
//         sign: '$',
//         value: 116.16,
//         currency: 'USD',
//       },
//       quantity: 1,
//     }, {
//       id: 1,
//       name: 'Some Other Item',
//       price: {
//         sign: '$',
//         value: 333.33,
//         currency: 'USD',
//       },
//       quantity: 1,
//     }], null, {
//   events: {
//     'setProperty': function($event) { console.log($event.type, $event) }
//   },
//   enableEvents: true,
// })
// console.log(model)
// const control = new Control({
//   models: {
//     default: new Model([{
//       id: 0,
//       name: 'Some Item',
//       price: {
//         sign: '$',
//         value: 116.16,
//         currency: 'USD',
//       },
//       quantity: 1,
//     }, {
//       id: 1,
//       name: 'Some Other Item',
//       price: {
//         sign: '$',
//         value: 333.33,
//         currency: 'USD',
//       },
//       quantity: 1,
//     }])
//   },
//   views: {
//     default: new View(),
//   },
// }, {
//   // events: {
//   //   'models.default.** setProperty': function($event) { console.log($event.type, $event) },
//   //   // 'views.default.** setProperty': function($event) { console.log($event.type, $event) }
//   // },
//   // enableEvents: true,
// })
const control = new Control({
  models: {
    default: new Model([{
      id: 0,
      name: 'Some Item',
      price: {
        sign: '$',
        value: 116.16,
        currency: 'USD',
      },
      quantity: 1,
    }, {
      id: 1,
      name: 'Some Other Item',
      price: {
        sign: '$',
        value: 333.33,
        currency: 'USD',
      },
      quantity: 1,
    }])
  },
  views: {
    default: new View(),
  },
}, {
  // events: {
  //   'models.default.** setProperty': function($event) { console.log($event.type, $event) },
  //   // 'views.default.** setProperty': function($event) { console.log($event.type, $event) }
  // },
  // enableEvents: true,
})
console.log(control.models.default)
control.removePropertyClasses('models')
console.log(control.models?.default)
console.log(control.models)
control.addPropertyClasses([{
  name: "models", definitionValue: 'Object',
  administer: "addModels", deadminister: "removeModels",
  instate: function Instate($target, $property, $value, $definition) { return $value }, deinstate: function Deinstate($target, $property, $definition) { return },
}])
control.addModels({
  default: new Model([{
    id: 0,
    name: 'Some Item',
    price: {
      sign: '$',
      value: 116.16,
      currency: 'USD',
    },
    quantity: 1,
  }, {
    id: 1,
    name: 'Some Other Item',
    price: {
      sign: '$',
      value: 333.33,
      currency: 'USD',
    },
    quantity: 1,
  }])
})
console.log(control.models?.default)
console.log(control.models)
control.removeModels(['default'])
console.log(control.models?.default)
console.log(control.models)
// console.log(control)
// control.enableEvents()
// control.models.default.set('2', {
//   id: 2,
//   name: 'Yet Another Other Item',
//   price: {
//     sign: '$',
//     value: 666.66,
//     currency: 'USD',
//   },
//   quantity: 1,
// })
// console.log(control.models.default.valueOf())
// console.log(control, control.getEvents())