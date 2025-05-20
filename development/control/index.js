import Core from '../core/index.js'
import Settings from './settings/index.js'
import Options from './options/index.js'
import Model from '../model/index.js'
import View from '../view/index.js'
import { LocationRouter, FetchRouter, SocketRouter } from '../routers/index.js'
function Instate($target, $property, $value, $definition) {
  const definition = $definition
  const parent = $target
  const path = ($target?.path) ? [
    $target.path, $definition.name, $property
  ].join('.') : [$definition.name, $property].join('.')
  if($value && ValidClasses.includes($value.constructor)) {
    $value.mount({ path, parent })
  }
  else if(Array.isArray($value)) {
    const { Class } = definition
    if(Class === Model) {
      let [properties, schema, options] = $value
      schema = schema || null
      options = options || {}
      Object.assign(options, {
        definition, parent, path
      })
      $value = new Class(properties, schema, options)
    }
    else if(ValidClasses.includes(Class)) {
      if($value.length === 2) {
        const [settings, options] = $value
        Object.assign(options, {
          definition, parent, path
        })
        $value = new Class(settings, options)
      }
      if($value.length === 1) {
        const [settings] = $value
        $value = new Class(settings)
      }
    }
  }
  return $value
}
function Deinstate($target, $property, $definition) { return }
class Control extends Core {
  static propertyClasses = [{
    name: "models", targetType: 'Object',
    administer: "addModels", deadminister: "removeModels",
    instate: Instate, deinstate: Deinstate, Class: Model,
  }, {
    name: "views", targetType: 'Object',
    administer: "addViews", deadminister: "removeViews",
    instate: Instate, deinstate: Deinstate, Class: View,
  }, {
    name: "locationRouters", targetType: 'Object',
    administer: "addLocationRouters", deadminister: "removeLocationRouters",
    instate: Instate, deinstate: Deinstate, Class: LocationRouter,
  }, {
    name: "fetchRouters", targetType: 'Object',
    administer: "addFetchRouters", deadminister: "removeFetchRouters",
    instate: Instate, deinstate: Deinstate, Class: FetchRouter,
  }, {
    name: "socketRouters", targetType: 'Object',
    administer: "addSocketRouters", deadminister: "removeSocketRouters",
    instate: Instate, deinstate: Deinstate, Class: SocketRouter,
  }, {
    name: "controls", targetType: 'Object',
    administer: "addControls", deadminister: "removeControls",
    instate: Instate, deinstate: Deinstate, Class: Control,
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