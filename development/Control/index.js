import { recursiveAssign, recursiveAssignConcat } from '../Coutil/index.js'
import Core from '../Core/index.js'
import Model from '../Model/index.js'
import View from '../View/index.js'
import { LocationRouter, FetchRouter } from '../Routers/index.js'
import Settings from './Settings/index.js'
import Options from './Options/index.js'
export default class Control extends Core {
  #_models = {}
  #_views = {}
  #_controls = {}
  #_routers = {
    location: {},
    fetch: {},
  }
  constructor($settings = {}, $options = {}) {
    super(
      recursiveAssign({
        propertyClasses: {
          models: {
            Class: Model,
            Names: {
              Monople: { Formal: "Model", Nonformal: "model" },
              Multiple: { Formal: "Models", Nonformal: "models" },
            },
            Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
          },
          views: {
            Class: View,
            Names: {
              Monople: { Formal: "View", Nonformal: "view" },
              Multiple: { Formal: "Views", Nonformal: "views" },
            },
            Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
          },
          controls: {
            Class: Control,
            Names: {
              Monople: { Formal: "Control", Nonformal: "control" },
              Multiple: { Formal: "Controls", Nonformal: "controls" },
            },
            Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
          },
          locationRouters: {
            Class: LocationRouter,
            Names: {
              Monople: { Formal: "LocationRouter", Nonformal: "locationRouter" },
              Multiple: { Formal: "LocationRouters", Nonformal: "locationRouters" },
            },
            Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
          },
          fetchRouters: {
            Class: FetchRouter,
            Names: {
              Montiple: { Formal: "FetchRouter", Nonformal: "fetchRouter" },
              Multiple: { Formal: "FetchRouters", Nonformal: "fetchRouters" },
            },
            Events: { Assign: "addEventListener", Deassign: "removeEventListener" },
          },
        }
      }, Settings, $settings),
      recursiveAssign({}, Options, $options),
    )
    const { enableEvents } = this.options
    if(enableEvents) this.enableEvents()
  }
}