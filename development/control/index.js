import Core from '../core/index.js'
import Settings from './settings/index.js'
import Options from './options/index.js'
import Model from '../model/index.js'
import View from '../view/index.js'
import { LocationRouter, FetchRouter, SocketRouter } from '../routers/index.js'
function Instate($target, $property, $value, $definition) { return $value }
function Deinstate($target, $property, $definition) { return }
export default class Control extends Core {
  static propertyClasses = [{
    name: "models", definitionValue: 'Object',
    administer: "addModels", deadminister: "removeModels",
    instate: Instate, deinstate: Deinstate,
  }, {
    name: "views", definitionValue: 'Object',
    administer: "addViews", deadminister: "removeViews",
    instate: Instate, deinstate: Deinstate,
  }, {
    name: "controls", definitionValue: 'Object',
    administer: "addControls", deadminister: "removeControls",
    instate: Instate, deinstate: Deinstate,
  }, {
    name: "locationRouters", definitionValue: 'Object',
    administer: "addLocationRouters", deadminister: "removeLocationRouters",
    instate: Instate, deinstate: Deinstate,
  }, {
    name: "fetchRouters", definitionValue: 'Object',
    administer: "addFetchRouters", deadminister: "removeFetchRouters",
    instate: Instate, deinstate: Deinstate,
  }, {
    name: "socketRouters", definitionValue: 'Object',
    administer: "addSocketRouters", deadminister: "removeSocketRouters",
    instate: Instate, deinstate: Deinstate,
  }]
  constructor($settings = {}, $options = {}) {
    super(
      Settings(Object.assign({}, $settings)),
      Options(Object.assign({
        propertyClasses: Control.propertyClasses,
      }, $options)),
    )
  }
}