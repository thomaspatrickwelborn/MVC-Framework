import Core from '../Core/index.js'
import Model from '../Model/index.js'
import View from '../View/index.js'

const Settings = {
	models: {},
	views: {},
	controls: {},
	events: {
		models: {},
		views: {},
		controls: {},
	},
}

export default class Control extends Core {
	constructor($settings = Settings) {
		super()
		this.models = $settings.models
		this.views = $settings.views
		this.controls = $settings.controls
		this.events = $settings.events
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
	#_controls
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
}