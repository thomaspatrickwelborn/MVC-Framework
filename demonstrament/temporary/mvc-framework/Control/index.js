import {
	typeOf, parseShortenedEvents
} from '../Utils/index.js'
import Core from '../Core/index.js'
import Model from '../Model/index.js'
import View from '../View/index.js'
import StaticRouter from '../Router/index.js'

const Settings = {
	models: {},
	views: {},
	controls: {},
	routers: {},
	events: {},
}
export default class Control extends Core {
	constructor($settings = Settings, $options = { enableEvents: false }) {
		super(...arguments)
		this.models = $settings.models
		this.views = $settings.views
		this.controls = $settings.controls
		this.routers = $settings.routers
		if($options.enableEvents === true) this.enableEvents()
	}
	#_models = {}
	get models() { return this.#_models }
	set models($models = {}) {
		for(const [
			$modelName, $model
		] of Object.entries($models)) {
			if($model instanceof Model) {
				this.#_models[$modelName] = $model
			} else if(typeOf($model) === 'object') {
				this.#_models[$modelName] = new Model($model)
			}
		}
	}
	#_views = {}
	get views() { return this.#_views }
	set views($views = {}) {
		for(const [
			$viewName, $view
		] of Object.entries($views)) {
			if($view instanceof View) {
				this.#_views[$viewName] = $view
			} else if(typeOf($view) === 'object') {
				this.#_views[$viewName] = new View($view)
			}
		}
	}
	#_controls = {}
	get controls() { return this.#_controls }
	set controls($controls = {}) {
		// controls
		for(const [
			$controlName, $control
		] of Object.entries($controls)) {
			if($control instanceof Control) {
				this.#_controls[$controlName] = $control
			} else if(typeOf($control) === 'object') {
				this.#_controls[$controlName] = new Control($control)
			}
		}
	}
	
	#_routers = {}
	get routers() { return this.#_routers }
	set routers($routers = {}) {
		// routers
		for(const [
			$routerName, $router
		] of Object.entries($routers)) {
			if($router instanceof StaticRouter) {
				this.#_routers[$routerName] = $router
			} else if(typeOf($router) === 'object') {
				this.#_routers[$routerName] = new StaticRouter($router)
			}
		}
	}
	addClassInstances($classes) {
		const ValidClasses = {
			models: Model,
			views: View,
			controls: Control,
			routers: StaticRouter,
		}
		iterateClasses: for(const [
			$className, $classInstances
		] of Object.entries($classes)) {
			if(
				Object.keys(ValidClasses).includes($className) === false
			) continue iterateClasses
			var ValidClass = ValidClasses[$className]
			iterateClassInstances: for(const [
				$classInstanceName, $classInstance
			] of Object.entries($classInstances)) {
				if($classInstance instanceof ValidClass) {
					this[$className][$classInstanceName] = $classInstance
				} else if(typeOf($classInstance) === 'object') {
					this[$className][$classInstanceName] = new ValidClass($classInstance)
				} else if(typeOf($classInstance) === 'array') {
					this[$className][$classInstanceName] = new ValidClass(...$classInstance)
				}
			}
		}
		return this
	}
}