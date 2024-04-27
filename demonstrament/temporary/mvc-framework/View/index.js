import { typeOf } from '../Utils/index.js'
import Core from '../Core/index.js'

const Settings = {
	type: 'dynamic', // 'static',
	element: document.createElement('template'),
	templates: { default: () => `` },
	selectors: {},
	events: {},
}
Object.freeze(Settings)
const Options = {
	enable: false,
	freeze: false,	
}
Object.freeze(Options)
const RenderSettings = {
	name: 'default', 
	data: {},
}
const RenderOptions = {
	enableSelectors: true,
	enableEvents: true,
}
export default class View extends Core {
	constructor($settings = Settings, $options = Options) {
		super(...arguments)
		if($settings.element instanceof HTMLElement) {
			// Static View
			this.element = $settings.element
			this.parentElement = $settings.element.parentElement
			this.type = 'static'
		} else if(
			!$settings.element instanceof HTMLElement &&
			$settings.parentElement instanceof HTMLElement
		) {
			// Dynamic View (Parent)
			this.element = document.createElement('template')
			this.parentElement = this.settings.parentElement
			this.type = 'dynamic'
		} else {
			// Dynamic View (No Parent)
			this.element = document.createElement('template')
			this.type = 'dynamic'
		}
		this.templates = this.settings.templates
		this.selectors = this.settings.selectors
		if($options.freeze === true) Object.freeze(this)
		if($options.enable === true) this.enable()
	}
	// Type
	#_type
	get type() { return this.#_type }
	set type($type) { this.#_type = $type }
	// Parent
	#_parentElement
	get parentElement() { return this.#_parentElement }
	set parentElement($parentElement) { this.#_parentElement = $parentElement }
	// Element
	#_element
	get element() { return this.#_element }
	set element($element) { this.#_element = $element }
	// Templates
	#_templates = {}
	get templates() { return this.#_templates }
	set templates($templates = Settings.templates) {
		const _templates = this.#_templates
		for(const [
			$templateName, $template
		] of Object.entries($templates)) { _templates
			_templates[$templateName] = $template
		}
	}
	// Selectors
	#_selectors = {}
	#_querySelectors = {}
	get selectors() {
		return this.#_querySelectors
	}
	set selectors($selectors = Settings.selectors) {
		this.addSelectors($selectors)
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
	// Enable
	enable() {
		this.enableSelectors()
		this.enableEvents()
		return this
	}
	// Enable  Selectors
	enableSelectors($selectors) {
		$selectors = (
			$selectors === undefined
		) ? this.#_selectors
		  : $selectors
		const _querySelectors = this.#_querySelectors
		for(const [
			$selectorName, $selector
		] of Object.entries($selectors)) {
			if(this.element instanceof HTMLTemplateElement) {
				_querySelectors[$selectorName] = this.element.content
			  .querySelectorAll($selector)
			} else {
				_querySelectors[$selectorName] = this.element
				.querySelectorAll($selector)
			}
		}
		return this
	}
	// Disable
	disable() {
		this.disableSelectors()
		this.disableEvents()
		return this
	}
	// Disable Selectors
	disableSelectors($selectors) {
		$selectors = (
			$selectors === undefined
		) ? this.#_selectors
		  : $selectors
		const querySelectors = this.#_querySelectors
		for(const [
			$selectorName, $selector
		] of Object.entries($selectors)) {
			delete querySelectors[$selectorName]
		}
		return this
	}
	// Render Element
	renderElement(
		$settings = RenderSettings, 
		$options = RenderOptions,
	) {
		const element = this.element
		if(!element instanceof HTMLTemplateElement) return this
		const { name, data } = $settings
		const {
			enableSelectors, enableEvents,
		}	= $options
		const template = this.templates[name]
		if(
			template !== undefined &&
			typeOf(template) === 'function'
		) {
			this.disable()
			const templateContent = template(data)
			element.innerHTML = templateContent
			if(enableSelectors === true) this.enableSelectors()
			if(enableEvents === true) this.enableEvents()
			this.dispatchEvent(new CustomEvent('render', {
				detail: this
			}))
			return this
		}
	}
}