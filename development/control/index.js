import { recursiveAssign, recursiveAssignConcat } from '../coutil/index.js'
import Core from '../core/index.js'
import Model from '../model/index.js'
import View from '../view/index.js'
import { LocationRouter, FetchRouter, SocketRouter } from '../routers/index.js'
import Settings from './settings/index.js'
import Options from './options/index.js'
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
    socketRouters: {
      ID: "SOCKETROUTER",
      Name: "socketRouters",
      Class: SocketRouter,
      Names: {
        Monople: { Formal: "SocketRouter", Nonformal: "socketRouter" },
        Multiple: { Formal: "SocketRouters", Nonformal: "socketRouters" },
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