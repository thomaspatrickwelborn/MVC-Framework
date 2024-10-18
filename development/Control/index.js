import { typeOf, parseShortenedEvents } from '../Coutil/index.js'
import Core from '../Core/index.js'
import Model from '../Model/index.js'
import View from '../View/index.js'
import { LocationRouter, FetchRouter } from '../Router/index.js'
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
			if($model instanceof Model) {
				models[$modelName] = $model
			}
			else if(typeOf($model) === 'object') {
				models[$modelName] = new Model($model)
			}
			else if(typeOf($model) === 'array') {
				models[$modelName] = new Model(...$model)
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
			if($view instanceof View) {
				views[$viewName] = $view
			}
			else if(typeOf($view) === 'object') {
				views[$viewName] = new View($view)
			}
			else if(typeOf($view) === 'array') {
				views[$viewName] = new View(...$view)
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
			if($control instanceof Control) {
				controls[$controlName] = $control
			}
			else if(typeOf($control) === 'object') {
				controls[$controlName] = new Control($control)
			}
			else if(typeOf($control) === 'array') {
				controls[$controlName] = new Control(...$control)
			}
		}
	}
	get routers() { return this.#_routers }
	set routers($routers) {
		const routers = this.routers
		iterateRouterClasses: 
		for(const [
			$routerClassName, $routerClassInstances
		] of Object.entries($routers)) {
			iterateRouterClassInstances: 
			for(const [
				$routerClassInstanceName, $routerClassInstance
			] of Object.entries($routerClassInstances)) {
				if(
					$routerClassInstance instanceof LocationRouter ||
					$routerClassInstance instanceof FetchRouter
				) {
					this[$className][$routerClassName][$routerClassInstanceName] = $routerClassInstance
				}
				else {
					const Router = ($routerClassName === 'location')
						? LocationRouter
					  : ($routerClassName === 'fetch')
						  ? FetchRouter
						  : undefined
				  if(Router !== undefined) {
				  	let routerParameters
						if(typeOf($routerClassInstance) === 'object') { routerParameters = [$routerClassInstance] }
						else if(typeOf($router) === 'array') { routerParameters = [...$routerClassInstance] }
				  	this[$className][$routerClassName][$routerClassInstanceName] = new Router(routerParameters)
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
			this[$className] = $classInstances
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
					$routerClassName, $routerClassInstances
				] of Object.entries($classInstances)) {
					let routerClassInstanceKeys
					if(Array.isArray($routerClassInstances)) { routerClassInstanceKeys = $routerClassInstances }
					else { routerClassInstances = Object.keys($routerClassInstances) }
					iterateRouterClassInstanceKeys: 
					for(const $routerClassInstanceName of routerClassInstanceKeys) {
						delete this[$className][$routerClassName][$routerClassInstanceName]
					}
				}
			}
		}
		return this
	}
}