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
const Definition = { Object: 'Object' }
const States = {
  Instate: function Instate($propertyClass, $property, $value) {
    const { Class } = $propertyClass
    return new Class(...$value)
  },
  Deinstate: function Deinstate($propertyClass, $property) {},
}

export default class Control extends Core {
  static propertyClasses = [{
    name: "models",
    class: Model,
    names: {
      monople: { formal: "Model", nonformal: "model" },
      multiple: { formal: "Models", nonformal: "models" },
      minister: Names.Minister,
    },
    definition: Definition,
    states: States,
  }, {
    name: "views",
    class: View,
    names: {
      monople: { formal: "View", nonformal: "view" },
      multiple: { formal: "Views", nonformal: "views" },
      minister: Names.Minister,
    },
    definition: Definition,
    states: States,
  }, {
    name: "controls",
    class: Control,
    names: {
      monople: { formal: "Control", nonformal: "control" },
      multiple: { formal: "Controls", nonformal: "controls" },
      minister: Names.Minister,
    },
    definition: Definition,
    states: States,
  }, {
    name: "locationRouters",
    class: LocationRouter,
    names: {
      monople: { formal: "LocationRouter", nonformal: "locationRouter" },
      multiple: { formal: "LocationRouters", nonformal: "locationRouters" },
      minister: Names.Minister,
    },
    definition: Definition,
    states: States,
  }, {
    name: "fetchRouters",
    class: FetchRouter,
    names: {
      monople: { formal: "FetchRouter", nonformal: "fetchRouter" },
      multiple: { formal: "FetchRouters", nonformal: "fetchRouters" },
      minister: Names.Minister,
    },
    definition: Definition,
    states: States,
  }, {
    name: "socketRouters",
    class: SocketRouter,
    names: {
      monople: { formal: "SocketRouter", nonformal: "socketRouter" },
      multiple: { formal: "SocketRouters", nonformal: "socketRouters" },
      minister: Names.Minister,
    },
    definition: Definition,
    states: States,
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