import { recursiveAssign, recursiveAssignConcat } from '../coutil/index.js'
import { Core } from 'core-plex'
import Settings from './settings/index.js'
import Options from './options/index.js'
import Model from '../model/index.js'
import View from '../view/index.js'
import { LocationRouter, FetchRouter, SocketRouter } from '../routers/index.js'
const Names = {
  Minister: {
    Ad: { Formal: "Add", Nonformal: "add" },
    Dead: { Formal: "Remove", Nonformal: "remove" },
  }
}
const Events = { Assign: "addEventListener", Deassign: "removeEventListener" }
const Definition = { Object: 'Object' }
const States = {
  Instate: function Instate($propertyClass, $property, $value) {
    const { /*Name, */ Class /*, Names, Events, Definition*/ } = $propertyClass
    return new Class(...$value)
  },
  Deinstate: function Deinstate($propertyClass, $property) {},
}

export default class Control extends Core {
  static propertyClasses = [{
    Name: "models",
    Class: Model,
    Names: {
      Monople: { Formal: "Model", Nonformal: "model" },
      Multiple: { Formal: "Models", Nonformal: "models" },
      Minister: Names.Minister,
    },
    Events, Definition, States,
  }, {
    Name: "views",
    Class: View,
    Names: {
      Monople: { Formal: "View", Nonformal: "view" },
      Multiple: { Formal: "Views", Nonformal: "views" },
      Minister: Names.Minister,
    },
    Events, Definition, States,
  }, {
    Name: "controls",
    Class: Control,
    Names: {
      Monople: { Formal: "Control", Nonformal: "control" },
      Multiple: { Formal: "Controls", Nonformal: "controls" },
      Minister: Names.Minister,
    },
    Events, Definition, States,
  }, {
    Name: "locationRouters",
    Class: LocationRouter,
    Names: {
      Monople: { Formal: "LocationRouter", Nonformal: "locationRouter" },
      Multiple: { Formal: "LocationRouters", Nonformal: "locationRouters" },
      Minister: Names.Minister,
    },
    Events, Definition, States,
  }, {
    Name: "fetchRouters",
    Class: FetchRouter,
    Names: {
      Monople: { Formal: "FetchRouter", Nonformal: "fetchRouter" },
      Multiple: { Formal: "FetchRouters", Nonformal: "fetchRouters" },
      Minister: Names.Minister,
    },
    Events, Definition, States,
  }, {
    Name: "socketRouters",
    Class: SocketRouter,
    Names: {
      Monople: { Formal: "SocketRouter", Nonformal: "socketRouter" },
      Multiple: { Formal: "SocketRouters", Nonformal: "socketRouters" },
      Minister: Names.Minister,
    },
    Events, Definition, States,
  }]
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