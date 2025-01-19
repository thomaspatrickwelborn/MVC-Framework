import { Core, Control, Model } from '/dependencies/mvc-framework.js'
/*
const model = new Model({
  schema: { propertyA: String },
  content: { propertyA: "PROPERTYA" },
  events: { "content setProperty": function contentSetProperty($event) {
    console.log($event.type, $event.path, $event.value)
  } }
})
// model.content.set({ propertyA: "PROPERTYAAA" })
model.content.set("propertyA", "PROPERTYAAA")
const content = model.content
content.set("propertyA", "PROPERTYA")
*/
const { content } = new Model({
  schema: { propertyA: String },
  // schema: null,
  content: { propertyA: "PROPERTYA" },
  events: { "content setProperty": function contentSetProperty($event) {
    console.log($event.type, $event.path, $event.value)
  } }
})
content.set("propertyA", "PROPERTYA")
// const ModelPropertyClass = {
//   ID: "MODEL",
//   Name: "models",
//   Class: Model,
//   Names: {
//     Monople: { Formal: "Model", Nonformal: "model" },
//     Multiple: { Formal: "Models", Nonformal: "models" },
//     Minister: {
//       Ad: { Formal: "Add", Nonformal: "add" },
//       Dead: { Formal: "Remove", Nonformal: "remove" },
//     },
//   },
//   Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
// }
// const core = new Core({
//   events: [{
//     path: "models.model.content",
    // type: "setProperty",
//     listener: function modelSetProperty($event) {
//       console.log($event.type, $event.path, $event.value)
//     },
//     enable: true
//   }]
// })
// core.addPropertyClasses([ModelPropertyClass])
// core.addModels({
//   model: new Model({
//     schema: {
//       propertyA: undefined,
//     },
//     content: {
//       propertyA: "propertyA"
//     }
//   })
// })
// core.enableEvents()
// core.models.model.content.set("propertyA", 1000000)
