import { typeOf } from '../Utils/index.js'
import Core from '../Core/index.js'

const Settings = Object.freeze({
	parentElement: undefined,
	element: undefined, // document.createElement('template'),
	templates: { default: () => `` },
	selectors: {},
	events: {},
})
const Options = Object.freeze({
	enable: false,
	freeze: false,	
})
const RenderSettings = Object.freeze({
	name: 'default', 
	data: {},
})
export default class View extends Core {
	constructor($settings = {}, $options = {}) {
		super(
			Object.assign({}, Settings, $settings),
			Object.assign({}, Options, $options),
		)
		const { parentElement, element, templates, selectors } = this.settings
		const { freeze, enable } = this.options
		// Parent Element, No Element
		if(
			parentElement !== undefined &&
			element === undefined
		) {
			this.parentElement = parentElement
			this.element = document.createElement('template')
		} else
		// No Parent Element, Element
		if((
			parentElement === undefined &&
			element !== undefined
		) || (
			parentElement !== undefined &&
				element !== undefined
		)) {
			this.element = element
			this.parentElement = element.parentElement
		} else
		// No Parent Element, No Element
		if(
			parentElement === undefined &&
			element === undefined
		) {
			this.element = document.createElement('template')
		}
		this.templates = this.settings.templates
		this.selectors = this.settings.selectors
		if(this.options.freeze === true) Object.freeze(this)
		if(this.options.enable === true) this.enable()
	}
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
			_templates[$templateName] = $template.bind(this)
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
			  if(_querySelectors[$selectorName].length === 1) {
			  	_querySelectors[$selectorName] = _querySelectors[$selectorName][0]
			  }
			} else {
				_querySelectors[$selectorName] = this.element
				.querySelectorAll($selector)
				if(_querySelectors[$selectorName].length === 1) {
					_querySelectors[$selectorName] = _querySelectors[$selectorName][0]
				}
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
	renderElement($settings = {}) {
		$settings = Object.assign({}, RenderSettings, $settings)
		const element = this.element
		if(!element instanceof HTMLTemplateElement) return this
		const { name, data } = $settings
		const template = this.templates[name]
		if(
			template !== undefined &&
			typeOf(template) === 'function'
		) {
			this.disable()
			const templateContent = template(data)
			element.innerHTML = templateContent
			this.enable()
			this.dispatchEvent(new CustomEvent('render', {
				detail: this
			}))
		}
		return this
	}
}