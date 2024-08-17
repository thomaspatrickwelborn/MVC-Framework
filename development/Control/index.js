import {
	typeOf, parseShortenedEvents
} from '../Coutil/index.js'
import Core from '../Core/index.js'
import Model from '../Model/index.js'
import { StaticView, DynamicView } from '../View/index.js'
import { StaticRouter, FetchRouter } from '../Router/index.js'

const Settings = Object.freeze({
	models: {},
	views: {},
	controls: {},
	routers: {
		fetch: {},
		static: {},
	},
	events: {},
})

const Options = Object.freeze({
	enableEvents: true
})

export default class Control extends Core {
	constructor($settings = {}, $options = {}) {
		super(
			Object.assign({}, Settings, $settings),
			Object.assign({}, Options, $options),
		)
		this.models = this.settings.models
		this.views = this.settings.views
		this.controls = this.settings.controls
		this.routers = this.settings.routers
		if(this.options.enableEvents === true) this.enableEvents()
	}
	#_models = {}
	get models() { return this.#_models }
	set models($models = {}) {
		const _models = this.#_models
		for(const [
			$modelName, $model
		] of Object.entries($models)) {
			if($model instanceof Model) {
				_models[$modelName] = $model
			} else if(typeOf($model) === 'object') {
				_models[$modelName] = new Model($model)
			}
		}
	}
	#_views = {}
	get views() { return this.#_views }
	set views($views = {}) {
		const _views = this.#_views
		for(const [
			$viewName, $view
		] of Object.entries($views)) {
			if(
				$view instanceof StaticView || 
				$view instanceof DynamicView
			) {
				_views[$viewName] = $view
			} else
			if(
				typeOf($view) === 'object'
			) {
				if($view.type === 'static') {
					_views[$viewName] = new StaticView($view)
				} else
				if($view.type === 'dynamic') {
					_views[$viewName] = new DynamicView($view)
				}
			}
		}
	}
	#_controls = {}
	get controls() { return this.#_controls }
	set controls($controls = {}) {
		const _controls = this.#_controls
		for(const [
			$controlName, $control
		] of Object.entries($controls)) {
			if($control instanceof Control) {
				_controls[$controlName] = $control
			} else if(typeOf($control) === 'object') {
				_controls[$controlName] = new Control($control)
			}
		}
	}
	
	#_routers = {}
	get routers() { return this.#_routers }
	set routers($routers = {}) {
		const _routers = this.#_routers
		iterateRouterClasses: 
		for(const [
			$routerClass, $routerClassInstances
		] of Object.entries($routers)) {
			_routers[$routerClass] = _routers[$routerClass] || {}
			iterateRoutes:
			for(const [
				$routerName, $router
			] of Object.entries($routerClassInstances)) {
				if(
					$router instanceof StaticRouter ||
					$router instanceof FetchRouter
				) {
					_routers[$routerClass][$routerName] = $router
				} else
				if(typeOf($router) === 'object') {
					const Router = (
						$routerClass === 'static'
					) ? StaticRouter
					  : (
				  	$routerClass === 'fetch'
			  	) ? FetchRouter
					  : undefined
				  if(Router !== undefined) {
				  	_routers[$routerClass][$routerName] = new Router($router)
				  }
				}
			}
		}
	}
	addClassInstances($classes) {
		iterateClasses: for(const [
			$className, $classInstances
		] of Object.entries($classes)) {
			this[$className] = $classInstances
		}
		return this
	}
}