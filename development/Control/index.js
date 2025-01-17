import { recursiveAssign, recursiveAssignConcat } from '../Coutil/index.js'
import Core from '../Core/index.js'
import Model from '../Model/index.js'
import View from '../View/index.js'
import { LocationRouter, FetchRouter } from '../Routers/index.js'
import Settings from './Settings/index.js'
import Options from './Options/index.js'
export default class Control extends Core {
  static propertyClasses = {
    models: {
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
    },
    views: {
      ID: "VIEW",
      Name: "views",
      Class: View,
      Names: {
        Monople: { Formal: "View", Nonformal: "view" },
        Multiple: { Formal: "Views", Nonformal: "views" },
        Minister: {
          Ad: { Formal: "Add", Nonformal: "add" },
          Dead: { Formal: "Remove", Nonformal: "remove" },
        },
      },
      Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
    },
    controls: {
      ID: "CONTROL",
      Name: "controls",
      Class: Control,
      Names: {
        Monople: { Formal: "Control", Nonformal: "control" },
        Multiple: { Formal: "Controls", Nonformal: "controls" },
        Minister: {
          Ad: { Formal: "Add", Nonformal: "add" },
          Dead: { Formal: "Remove", Nonformal: "remove" },
        },
      },
      Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
    },
    locationRouters: {
      ID: "LOCATIONROUTER",
      Name: "locationRouters",
      Class: LocationRouter,
      Names: {
        Monople: { Formal: "LocationRouter", Nonformal: "locationRouter" },
        Multiple: { Formal: "LocationRouters", Nonformal: "locationRouters" },
        Minister: {
          Ad: { Formal: "Add", Nonformal: "add" },
          Dead: { Formal: "Remove", Nonformal: "remove" },
        },
      },
      Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
    },
    fetchRouters: {
      ID: "FETCHROUTER",
      Name: "fetchRouters",
      Class: FetchRouter,
      Names: {
        Monople: { Formal: "FetchRouter", Nonformal: "fetchRouter" },
        Multiple: { Formal: "FetchRouters", Nonformal: "fetchRouters" },
        Minister: {
          Ad: { Formal: "Add", Nonformal: "add" },
          Dead: { Formal: "Remove", Nonformal: "remove" },
        },
      },
      Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
    },
  }
  constructor($settings = {}, $options = {}) {
    super(
      recursiveAssign({
        propertyClasses: Control.propertyClasses,
      }, Settings, $settings),
      recursiveAssign({}, Options, $options),
    )
    const { enableEvents } = this.options
    if(enableEvents) this.enableEvents()
  }
}