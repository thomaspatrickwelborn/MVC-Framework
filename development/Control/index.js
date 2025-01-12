import { typeOf, expandEvents } from '../Coutil/index.js'
import Core from '../Core/index.js'
import Model from '../Model/index.js'
import View from '../View/index.js'
import { LocationRouter, FetchRouter } from '../Router/index.js'
import Settings from './Settings/index.js'
import Options from './Options/index.js'
const ValidClassInstances = ["models", "views", "controls", "routers"]
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
      Object.assign({}, Settings, $settings),
      Object.assign({}, Options, $options),
    )
    this.addClassInstances($settings)
    if(this.options.enableEvents === true) this.enableEvents()
  }
  get models() { return this.#_models }
  set models($models) {
    const models = this.models
    iterateModelInstances: 
    for(const [
      $modelName, $model
    ] of Object.entries($models)) {
      const path = (this.path)
        ? [this.path, $modelName].join('.')
        : $modelName
      const parent = this
      let modelSettings, modelOptions
      if($model instanceof Model) {
        models[$modelName] = $model
      }
      else if(typeOf($model) === 'object') {
        modelSettings = Object.assign({ path, parent }, $model)
        models[$modelName] = new Model(modelSettings)
      }
      else if(typeOf($model) === 'array') {
        modelSettings = Object.assign({ path, parent }, $model[0])
        modelOptions = $model[1]
        models[$modelName] = new Model(modelSettings, modelOptions)
      }
    }
  }
  get views() { return this.#_views }
  set views($views) {
    const views = this.views
    iterateViewInstances: 
    for(const [
      $viewName, $view
    ] of Object.entries($views)) {
      const path = (this.path)
        ? [this.path, $viewName].join('.')
        : $viewName
      const parent = this
      let viewSettings, viewOptions
      if($view instanceof View) {
        views[$viewName] = $view
      }
      else if(typeOf($view) === 'object') {
        viewSettings = Object.assign({ path, parent }, $view)
        views[$viewName] = new View(viewSettings)
      }
      else if(typeOf($view) === 'array') {
        viewSettings = Object.assign({ path, parent }, $view[0])
        viewOptions = $view[1]
        views[$viewName] = new View(viewSettings, viewOptions)
      }
    }
  }
  get controls() { return this.#_controls }
  set controls($controls) {
    const controls = this.controls
    iterateControlInstances: 
    for(const [
      $controlName, $control
    ] of Object.entries($controls)) {
      const path = (this.path)
        ? [this.path, $controlName].join('.')
        : $controlName
      const parent = this
      let controlSettings, controlOptions
      if($control instanceof Control) {
        controls[$controlName] = $control
      }
      else if(typeOf($control) === 'object') {
        controlSettings = Object.assign({ path, parent }, $control)
        controls[$controlName] = new Control(controlSettings)
      }
      else if(typeOf($control) === 'array') {
        controlSettings = Object.assign({ path, parent }, $control[0])
        controlOptions = $control[1]
        controls[$controlName] = new Control(controlSettings, controlOptions)
      }
    }
  }
  get routers() { return this.#_routers }
  set routers($routers) {
    const routers = this.routers
    iterateRouterClasses: 
    for(const [
      $routerClassName, $routers
    ] of Object.entries($routers)) {
      iterateRouterClassInstances: 
      for(const [
        $routerName, $router
      ] of Object.entries($routers)) {
        const path = (this.path)
          ? [this.path, $routerName].join('.')
          : $routerName
        const parent = this
        let routerSettings, routerOptions
        if(
          $router instanceof LocationRouter ||
          $router instanceof FetchRouter
        ) {
          routers[$routerClassName][$routerName] = $router
        }
        else {
          const Router = ($routerClassName === 'location')
            ? LocationRouter
            : ($routerClassName === 'fetch')
              ? FetchRouter
              : undefined
          if(Router !== undefined) {
            let routerParameters
            if(typeOf($router) === 'object') {
              routerSettings = Object.assign({ path, parent }, $router)
              routers[$routerClassName][$routerName] = new Router($router)
            }
            else if(typeOf($router) === 'array') {
              routerSettings = Object.assign({ path, parent }, $router[0])
              routerOptions = $router[1]
              routers[$routerClassName][$routerName] = new Router(...$router)
            }
          }
        }
      }
    }
  }
  addClassInstances() {
    let $classes
    if(arguments.length === 0) { $classes = this.settings } 
    else if(arguments.length === 1) { $classes = arguments[0] }
    iterateClasses:
    for(const [
      $className, $classInstances
    ] of Object.entries($classes)) {
      if(ValidClassInstances.includes($className)) {
        this[$className] = $classInstances
      }
    }
    return this
  }
  removeClassInstances() {
    let $classes
    if(arguments.length === 0) { $classes = this.settings } 
    else if(arguments.length === 1) { $classes = arguments[0] }
    iterateClasses:
    for(const [
      $className, $classInstances
    ] of Object.entries($classes)) {
      // Model, View, Control Class Instances
      if($className !== 'routers') {
        let classInstanceKeys
        if(Array.isArray($classInstances)) { classInstanceKeys = $classInstances }
        else { classInstanceKeys = Object.keys($classInstances) }
        iterateClassInstanceKeys: 
        for(const $classInstanceName of classInstanceKeys) {
          delete this[$className][$classInstanceName]
        }
      }
      // Router Class Instances
      else {
        iterateRouterClasses: 
        for(const [
          $routerClassName, $routers
        ] of Object.entries($classInstances)) {
          let routerClassInstanceKeys
          if(Array.isArray($routers)) { routerClassInstanceKeys = $routers }
          else { routerClassInstances = Object.keys($routers) }
          iterateRouterClassInstanceKeys: 
          for(const $routerName of routerClassInstanceKeys) {
            delete this[$className][$routerClassName][$routerName]
          }
        }
      }
    }
    return this
  }
}