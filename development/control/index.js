import Core from '../core/index.js'
import Settings from './settings/index.js'
import Options from './options/index.js'
import Model from '../model/index.js'
import View from '../view/index.js'
import { LocationRouter, FetchRouter, SocketRouter } from '../routers/index.js'
function Instate($propertyClass, $target, $property, ...$arguments) {
  console.log($propertyClass, $target, $property, ...$arguments)
  const { Class } = $propertyClass
  let propertyClassInstance
  if(Class instanceof Model) {
    const [$properties, $schema, $options] = $arguments
    const path = ($options.path) ? [$options.path, $property].join('.') : $property
    console.log("path", path)
    console.log("$target", $target)
    const parent = $target
    propertyClassInstance = new Class($properties, $schema, Object.assign($options, { path, parent }))
  }
  else {
    const [$settings, $options = {}] = [...$arguments]
    const path = ($options.path) ? [$options.path, $property].join('.') : $property
    console.log("path", path)
    console.log("$target", $target)
    const parent = $target
    propertyClassInstance = new Class($settings, Object.assign($options, { path, parent }))
  }
  return propertyClassInstance
}
function Deinstate($propertyClass, $target, $property) {}

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
      Settings(Object.assign({}, $settings)),
      Options(Object.assign({
        propertyClasses: Control.propertyClasses,
      }, $options)),
    )
  }
}