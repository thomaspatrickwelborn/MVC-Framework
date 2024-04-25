import {
	typeOf, parseShortenedPropEvents
} from '../Utils/index.js'
import Core from '../Core/index.js'
import Model from '../Model/index.js'
import View from '../View/index.js'
import StaticRouter from '../Router/index.js'

const EventsSettings = () => {
	return {
		models: {},
		views: {},
		controls: {},
		routers: {},
	}
}

const Settings = {
	models: {},
	views: {},
	controls: {},
	routers: {},
	events: EventsSettings(),
}
export default class Control extends EventTarget {
	constructor($settings = Settings, $options = { enableEvents: false }) {
		super()
		this.options = $options
		this.settings = $settings
		this.models = $settings.models
		this.views = $settings.views
		this.controls = $settings.controls
		this.routers = $settings.routers
		this.events = $settings.events
		if($options.enableEvents === true) this.enableEvents()
	}
	#_settings = {}
	get settings() { return this.#_settings }
	set settings($settings) {
		const _settings = this.#_settings
		for(const [
			$settingKey, $settingVal
		] of Object.entries($settings)) {
			_settings[$settingKey] = $settingVal
		}
	}
	#_options = {}
	get options() { return this.#_options }
	set options($options) {
		const _options = this.#_options
		for(const [
			$optionKey, $optionVal
		] of Object.entries($options)) {
			_options[$optionKey] = $optionVal
		}
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

	#_events = EventsSettings()
	get events() { return this.#_events }
	set events($events) { this.addEvents($events) }
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
	addEvents($events = {}, $enable = false) {
		const events = this.events
		iterateEvents: for(var [
			$className, $classInstances
		] of Object.entries($events)) {
			iteratePropClassInstances: for(var [
				$classInstanceName, $propEvents
			] of Object.entries($classInstances)) {
				if(typeOf($propEvents) === 'object') {
					$propEvents = parseShortenedPropEvents($propEvents)
				}
				iteratePropEvents: for(
					const $propEvent of $propEvents
				) {
					$propEvent.enabled = false
					let prop
					switch($className) {
						case 'models': prop = this.#_models[$classInstanceName]
						break
						case 'views': prop = this.#_views[$classInstanceName]
						break
						case 'controls': prop = this.#_controls[$classInstanceName]
						break
						case 'routers': prop = this.#_routers[$classInstanceName]
						break
					}
					prop.addEvents([$propEvent], false)
					events[$className][$classInstanceName] = events[$className][$classInstanceName] || []
					events[$className][$classInstanceName].push($propEvent)
				}
			}
		}
		if($enable === true) this.enableEvents($events)
		return this
	}
	removeEvents($events = {}) {
		const events = this.events
		iterateEvents: for(var [
			$className, $classInstances
		] of Object.entries($events)) {
			iteratePropClassInstances: for(var [
				$classInstanceName, $propEvents
			] of Object.entries($classInstances)) {
				if(typeOf($propEvents) === 'object') {
					$propEvents = parseShortenedPropEvents($propEvents)
				}
				iteratePropEvents: for(
					const $propEvent of $propEvents
				) {
					let prop
					switch($className) {
						case 'models': prop = this.#_models[$classInstanceName]
						break
						case 'views': prop = this.#_views[$classInstanceName]
						break
						case 'controls': prop = this.#_controls[$classInstanceName]
						break
						case 'routers': prop = this.#_controls[$classInstanceName]
						break
					}
					prop.removeEvents([$propEvent])
					events[$className][$classInstanceName] = events[$className][$classInstanceName] || []
					const spliceIndex = events[$className][$classInstanceName]
					.findIndex(($event) => (
						$event.name === $propEvent.name &&
						$event.target === $propEvent.target &&
						$event.callback === $propEvent.callback
					))
					events[$className][$classInstanceName].splice(spliceIndex, 1)
				}
			}
		}
		this.disableEvents($events)
		return this
	}
	enableEvents($events) {
		$events = $events || this.events
		iterateEvents: for(var [
			$className, $classInstances
		] of Object.entries($events)) {
			iteratePropClassInstances: for(var [
				$classInstanceName, $propEvents
			] of Object.entries($classInstances)) {
				if(typeOf($propEvents) === 'object') {
					$propEvents = parseShortenedPropEvents($propEvents)
				}
				iteratePropEvents: for(
					const $propEvent of $propEvents
				) {
					if($propEvent.enabled === true) continue iteratePropEvents
					$propEvent.enabled = false
					let prop
					switch($className) {
						case 'models': prop = this.#_models[$classInstanceName]
						break
						case 'views': prop = this.#_views[$classInstanceName]
						break
						case 'controls': prop = this.#_controls[$classInstanceName]
						break
						case 'routers': prop = this.#_routers[$classInstanceName]
						break
					}
					if(
						prop instanceof EventTarget ||
						prop instanceof NodeList
					) {
						if(prop instanceof NodeList) {
							for(const $prop of prop) {
								prop.enableEvents([$propEvent])
							}
						} else if(prop instanceof EventTarget) {
							prop.enableEvents([$propEvent])
						}
					}
					$propEvent.enabled = false
				}
			}
		}
		return this
	}
	disableEvents($events) {
		$events = $events || this.events
		iterateEvents: for(var [
			$className, $classInstances
		] of Object.entries($events)) {
			iteratePropClassInstances: for(var [
				$classInstanceName, $propEvents
			] of Object.entries($classInstances)) {
				if(typeOf($propEvents) === 'object') {
					$propEvents = parseShortenedPropEvents($propEvents)
				}
				iteratePropEvents: for(
					const $propEvent of $propEvents
				) {
					if($propEvent.enabled === false) continue iteratePropEvents
					$propEvent.enabled = false
					let prop
					switch($className) {
						case 'models': prop = this.#_models[$classInstanceName]
						break
						case 'views': prop = this.#_views[eventTargetClassInstanceName]
						break
						case 'controls': prop = this.#_controls[eventTargetClassInstanceName]
						break
						case 'routers': prop = this.#_routers[$classInstanceName]
						break
					}
					if(
						prop instanceof EventTarget ||
						prop instanceof NodeList
					) {
						if(prop instanceof NodeList) {
							for(const $prop of prop) {
								prop.disableEvents([$propEvent])
							}
						} else if(prop instanceof EventTarget) {
							prop.disableEvents([$propEvent])
						}
					}
					$propEvent.enabled = false
				}
			}
		}
		return this
	}
}