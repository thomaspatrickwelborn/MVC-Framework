import Core from '../Core/index.js'

const Settings = {
	templates: { default: () => `` },
	selectors: {},
	events: {
		querySelectors: [],
	},
}

export default class View extends Core {
	constructor($settings = Settings) {
		super()
		this.templates = $settings.templates
		this.selectors = $settings.selectors
		this.events = $settings.events
		Object.freeze(this)
	}
	#_fragment = document.createElement('template')
	get fragment() { return this.#_fragment }
	#_templates = {}
	get templates() { return this.#_templates }
	set templates($templates = Settings.templates) {
		const templates = this.#_templates
		for(const [
			$templateName, $template
		] of Object.entries($templates)) { templates
			templates[$templateName] = $template
		}
	}
	#_selectors = {}
	get selectors() { return this.#_selectors }
	set selectors($selectors = Settings.selectors) {
		const _selectors = this.#_selectors
		for(const [
			$selectorName, $selector
		] of Object.entries($selectors)) {
			_selectors[$selectorName] = $selector
		}
	}
	// Add Selectors
	addSelectors($selectors) {
		const _selectors = this.#_selectors
		$selectors = (
			$selectors === undefined
		) ? _selectors
		  : $selectors
		for(const [
			$selectorName, $selector
		] of Object.entries($selectors)) {
			_selectors[$selectorName] = $selector
		}
		return this
	}
	// Remove Selectors
	removeSelectors($selectors) {
		const _selectors = this.#_selectors
		$selectors = (
			$selectors === undefined
		) ? _selectors
		  : $selectors
		for(const [
			$selectorName, $selector
		] of Object.entries($selectors)) {
			delete _selectors[selectorName]
		}
		return this
	}
	#_querySelectors = {}
	get querySelectors() { return this.#_querySelectors }
	// Enable Query Selectors
	enableQuerySelectors($selectors) {
		$selectors = (
			$selectors === undefined
		) ? this.selectors
		  : $selectors
		const querySelectors = this.#_querySelectors
		for(const [
			$selectorName, $selector
		] of Object.entries($selectors)) {
			querySelectors[$selectorName] = this.fragment.content
		  .querySelectorAll($selector)
		}
		return this
	}
	// Disable Query Selectors
	disableQuerySelectors($selectors) {
		$selectors = (
			$selectors === undefined
		) ? this.selectors
		  : $selectors
		const querySelectors = this.#_querySelectors
		for(const [
			$selectorName, $selector
		] of Object.entries($selectors)) {
			delete querySelectors[$selectorName]
		}
		return this
	}
	render($templateName = 'default', $templateData = {}) {
		const fragment = this.fragment
		const template = this.templates[$templateName]
		const view = template($templateData)
		fragment.innerHTML = view
		return this
	}
}