import { Control, Model, Schema } from '/dependencies/mvc-framework.js'
// const schemaA = new Schema([
//   { type: {
//     aaa: { type: String },
//     bbb: { type: String },
//   } }
// ])
// // console.log(schemaA)
// const contentA = [
//   { aaa: "AAAAAA", bbb: "BBBBBB" },
//   { aaa: "111111", bbb: "222222" },
//   { aaa: 111111 , bbb: 222222 },
// ]
// console.log(schemaA.validate(contentA))

// -----
/*
const model = new Model({
  schema: {
    aaa: { type: String },
    bbb: { type: String },
    ccc: { type: String },
    ddd: { type: String },
    eee: { type: String },
    fff: { type: String },
  }, 
  content:{
    // aaa: 333333, 
    // bbb: 444444,
  },
  events: {
    'content assignSourceProperty': ($event) => {
      console.log($event.type, $event.detail)
    }
  },
})
model.content.assign(
  { aaa: "AAAAAA", bbb: "BBBBBB" },
  { ccc: "111111", ddd: "222222" },
  { eee: 333333 , fff: 444444 },
)
console.log(model)
*/

// -----
const model = new Model({
  schema: {
    aaa: { type: {
      bbb: { type: String },
      ccc: { type: Number },
      ddd: { type: Boolean },
    } },
    eee: { type: {
      fff: { type: Boolean },
      ggg: { type: String },
      hhh: { type: Number },
    } }
  },
  content: {},
  events: {
    'content assignSourceProperty': ($event) => {
      console.log($event.type, $event.detail)
    },
  }
})
model.content.assign({
  aaa: {
    bbb: "BBB",
    ccc: 333,
    ddd: true,
  }
}, {
  eee: {
    fff: false,
    ggg: "FFF",
    hhh: 777,
  }
})
console.log(model)

// import DefaultTemplate from './template.js'
// const index = new Control({
//   models: {
//     default: [{
//       schema: [{ type: {
//         href: { type: String }, 
//         textContent: { type: String },
//       } }],
//       content: [{
//         href: "./static-cms",
//         textContent: "Static CMS"
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
// console.log(index.models.default)
// index.start()
