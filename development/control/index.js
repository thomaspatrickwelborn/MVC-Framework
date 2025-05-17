import Core from '../core/index.js'
import Settings from './settings/index.js'
import Options from './options/index.js'
import Model from '../model/index.js'
import View from '../view/index.js'
import { LocationRouter, FetchRouter, SocketRouter } from '../routers/index.js'
function Instate($target, $property, $value, $definition) {
  if($value && ValidClasses.includes($value.constructor)) {
    console.log($value)
    $value.mount({
      path: ($target.path) ? [$target.path, $property].join('.') : $property,
      parent: $target,
    })
  }
  else if(Array.isArray($value)) {
    const { Class } = $definition
    if(Class.constructor === Model) {
      const [properties, schema, options] = $value
      Object.assign(options, {
        path: ($target.path) ? [$target.path, $property].join('.') : $property,
        parent: $target,
      })
      $value = new Class(properties, schema, options)
    }
    else if(ValidClasses.includes(Class)) {
      const [settings, options] = $value
      Object.assign(options, {
        path: ($target.path) ? [$target.path, $property].join('.') : $property,
        parent: $target,
      })
      $value = new Class(...$value)
    }
  }
  return $value
}
function Deinstate($target, $property, $definition) { return }
class Control extends Core {
  static propertyClasses = [{
    name: "models", definitionValue: 'Object',
    administer: "addModels", deadminister: "removeModels",
    instate: Instate, deinstate: Deinstate, Class: Model,
  }, {
    name: "views", definitionValue: 'Object',
    administer: "addViews", deadminister: "removeViews",
    instate: Instate, deinstate: Deinstate, Class: View,
  }, {
    name: "controls", definitionValue: 'Object',
    administer: "addControls", deadminister: "removeControls",
    instate: Instate, deinstate: Deinstate, Class: Control,
  }, {
    name: "locationRouters", definitionValue: 'Object',
    administer: "addLocationRouters", deadminister: "removeLocationRouters",
    instate: Instate, deinstate: Deinstate, Class: LocationRouter,
  }, {
    name: "fetchRouters", definitionValue: 'Object',
    administer: "addFetchRouters", deadminister: "removeFetchRouters",
    instate: Instate, deinstate: Deinstate, Class: FetchRouter,
  }, {
    name: "socketRouters", definitionValue: 'Object',
    administer: "addSocketRouters", deadminister: "removeSocketRouters",
    instate: Instate, deinstate: Deinstate, Class: SocketRouter,
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
const ValidClasses = [Model, View, Control, LocationRouter, FetchRouter, SocketRouter]
export default Control