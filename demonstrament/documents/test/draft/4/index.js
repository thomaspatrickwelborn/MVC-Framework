import { Core, Control, Model } from '/dependencies/mvc-framework.js'
const ModelPropertyClass = {
  ID: "MODEL",
  Name: "models",
  Class: Model,
  Names: {
    Monople: { Formal: "Model", Nonformal: "model" },
    Multiple: { Formal: "Models", Nonformal: "models" },
    Minister: {
      Ad: { Formal: "Add", Nonformal: "add" },
      Dead: { Formal: "Remove", Nonformal: "remove" },
    },
  },
  Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
}
const control = new Control()
control.addModels({
  model: new Model({
    content: {
      propertyA: "propertyA"
    }
  })
})
console.log(control.models.model)
// control.addPropertyClasses([ModelPropertyClass])
// control.removePropertyClasses("models")