import { Model, Schema } from '/dependencies/mvc-framework.js'

// const schema = new Schema([
//   { type: Number }, { type: Boolean }, { type: String }
// ])
const model = new Model({
  schema: [
    { type: Number }, { type: Boolean }, { type: String }
  ],
  content: [
    true, false, 100, -100, "string", "STRING"
  ],
}, {
  schema: {
    validation: true,
  }
})
console.log(model)
// const validators = []
// // -----
// // Model Without Configuration Object
// // -----
// const modelA = new Model({
//   context: {
//     aaa: Number,
//     bbb: String,
//     ccc: Boolean,
//     ddd: {
//       eee: Number,
//       fff: String,
//       ggg: Boolean,
//       hhh: [Number, String, Boolean],
//     },
//     iii: {
//       jjj: Number,
//       kkk: String,
//       lll: Boolean,
//     },
//   },
//   validators: [TypeValidator],
// })
// // -----
// // Model Without Validators
// // -----
// const modelB = new Model({
//   context: {
//     aaa: { type: Number },
//     bbb: { type: String },
//     ccc: { type: Boolean },
//     ddd: { type: {
//       eee: { type: Number },
//       fff: { type: String },
//       ggg: { type: Boolean },
//       hhh: { type: [Number, String, Boolean] },
//     } },
//     iii: { type: [{
//       jjj: { type: Number },
//       kkk: { type: String },
//       lll: { type: Boolean },
//     }] },
//   },
// })
// // -----
// // Model With Validators
// // -----
// const modelC = new Model({
//   context: {
//     aaa: { type: Number, validators },
//     bbb: { type: String, validators },
//     ccc: { type: Boolean, validators },
//     ddd: { type: {
//       eee: { type: Number, validators },
//       fff: { type: String, validators },
//       ggg: { type: Boolean, validators },
//       hhh: { type: [
//         { type: Number },
//         { type: String },
//         { type: Boolean },
//       ], validators },
//     }, validators },
//     iii: { type: [{
//       jjj: { type: Number, validators },
//       kkk: { type: String, validators },
//       lll: { type: Boolean, validators },
//     }], validators },
//   },
// })
// // -----
// // ~~~
// // -----
// const modelD = new Model({
//   schema: [
//     { type: String }, { type: Number }, { type: Boolean }
//   ]
// })
// import { Control } from '/dependencies/mvc-framework.js'
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