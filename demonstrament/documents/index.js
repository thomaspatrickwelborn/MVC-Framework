import { Schema } from '/dependencies/mvc-framework.js'
const schemaA = new Schema([ { type: Number } ])
const content = [111,222,333]
console.log(schemaA.validate(content))
// import { Control, Model, Schema } from '/dependencies/mvc-framework.js'
// import DefaultTemplate from './template.js'
// const index = new Control({
//   models: {
//     default: [{
//       content: [{
//         'href': "./static-cms",
//         'textContent': "Static CMS"
//       }],
//     }, {}],
//   },
//   views: {
//     default: [{
//       parent: document.querySelector('body > main'),
//       templates: {
//         default: DefaultTemplate
//       },
//     }, {}],
//   },
//   start() {
//     this.views.default.render(
//       this.models.default.parse()
//     )
//     return this
//   }
// }, {
//   validSettings: ['start'],
// })
// index.start()