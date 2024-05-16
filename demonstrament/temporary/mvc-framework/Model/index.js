import { typeOf } from '../Utils/index.js'
import DynamicEventTarget from '../Core/DynamicEventTarget/index.js'
import Core from '../Core/index.js'
import Schema from './Schema/index.js'
import Validate from './Validate/index.js'
export default class Model extends Core {
	#DynamicEventTargetPropertyNames = [].concat(
		Object.getOwnPropertyNames(EventTarget.prototype),
	  Object.getOwnPropertyNames(Object.prototype),
	  Object.getOwnPropertyNames(Array.prototype),
	  Object.getOwnPropertyNames(Map.prototype),
		Object.getOwnPropertyNames(EventTarget),
		Object.getOwnPropertyNames(Object),
	  Object.getOwnPropertyNames(Array),
	  Object.getOwnPropertyNames(Map),
	)
	constructor($settings = {
		content: {},
		schema: {},
		validate: {},
	}, $options = {
		enable: true,
		freeze: false,
	}) {
		super(...arguments)
		this.events = $settings.events
		this.#schema = $settings.schema
		this.#validate = $settings.validate
		this.#root = new DynamicEventTarget($settings.content)
		this.#proxy = this.#root
		return this.#proxy
	}
	#schema
	#root
	#_proxy
	get #proxy() { return this.#_proxy }
	set #proxy($content) {
		const $this = this
		const $root = this.#root
		this.#_proxy = new Proxy(
			this.#root, {
				get($target, $property) {
					if(
						$this.#DynamicEventTargetPropertyNames
						.includes($property)
					) {
						return $root[$property]
					}
					if(Object.getOwnPropertyNames($this[$property])) {
						return $this[$property]
					}
				},
				set($target, $property, $value) {
					if(
						$this.#DynamicEventTargetPropertyNames
						.includes($property)
					) {
						$root[$property] = $value
					}
					return true
				},
				deleteProperty($target, $property) {
					if(
						$this.#DynamicEventTargetPropertyNames
						.includes($property)
					) {
						delete $root[$property]
					}
					return true
				},
			}
		)
	}
	#validate
}