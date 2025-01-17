import { Core, Control, Model } from '/dependencies/mvc-framework.js'
const control = new Control()
control.removePropertyClasses("models")
control.addPropertyClasses([{
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
}])