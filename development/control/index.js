import { recursiveAssign, recursiveAssignConcat } from '../coutil/index.js'
import Core from '../core/index.js'
import Settings from './settings/index.js'
import Options from './options/index.js'
import Model from '../model/index.js'
import View from '../view/index.js'
import { LocationRouter, FetchRouter, SocketRouter } from '../routers/index.js'
function Instate($propertyClass, $property, $value) {
  const { Class } = $propertyClass
  return new Class(...$value)
}
function Deinstate($propertyClass, $property) {}

export default class Control extends Core {
  static propertyClasses = [{
    name: "models", definitionValue: 'Object',
    administer: "addModels", deadminister: "removeModels",
    instate: Instate, deinstate: Deinstate,
    Class: Model,
  }, {
    name: "views", definitionValue: 'Object',
    administer: "addViews", deadminister: "removeViews",
    instate: Instate, deinstate: Deinstate,
    Class: View,
  }, {
    name: "controls", definitionValue: 'Object',
    administer: "addControls", deadminister: "removeControls",
    instate: Instate, deinstate: Deinstate,
    Class: Control,
  }, {
    name: "locationRouters", definitionValue: 'Object',
    administer: "addLocationRouters", deadminister: "removeLocationRouters",
    instate: Instate, deinstate: Deinstate,
    Class: LocationRouter,
  }, {
    name: "fetchRouters", definitionValue: 'Object',
    administer: "addFetchRouters", deadminister: "removeFetchRouters",
    instate: Instate, deinstate: Deinstate,
    Class: FetchRouter,
  }, {
    name: "socketRouters", definitionValue: 'Object',
    administer: "addSocketRouters", deadminister: "removeSocketRouters",
    instate: Instate, deinstate: Deinstate,
    Class: SocketRouter,
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