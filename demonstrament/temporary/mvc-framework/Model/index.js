import { typeOf } from '../Utils/index.js'
import DynamicEventTarget from '../Core/DynamicEventTarget/index.js'
import Core from '../Core/index.js'
import Schema from './Schema/index.js'
import Validate from './Validate/index.js'
export default class Model extends Core {
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
		this.#proxy = $settings.content
		return this.#proxy
	}
	#_DETPropertyNames = [].concat(
		Object.getOwnPropertyNames(EventTarget.prototype),
	  Object.getOwnPropertyNames(Object.prototype),
	  Object.getOwnPropertyNames(Array.prototype),
	  Object.getOwnPropertyNames(Map.prototype),
		Object.getOwnPropertyNames(EventTarget),
		Object.getOwnPropertyNames(Object),
	  Object.getOwnPropertyNames(Array),
	  Object.getOwnPropertyNames(Map),
	)
	get #DETPropertyNames() { return this.#_DETPropertyNames }
	#schema
	#root
	#_content
	get #proxy() { return this.#_content }
	set #proxy($content) {
		const $this = this
		this.#root = new DynamicEventTarget($content)
		this.#_content = new Proxy(
			this.#root, {
				get($target, $property) {
					if(Object.getOwnPropertyNames($this[$property])) {
						return $this[$property]
					} else if($this.#DETPropertyNames.includes($property)) {
						return $this.#root[$property]
					}
				},
				set($target, $property, $value) {
					if($this.#DETPropertyNames.includes($property)) {
						$this.#_content[$property] = $value
					}
					return true
				},
				deleteProperty($target, $property) {
					if($this.#DETPropertyNames.includes($property)) {
						delete $this.#_content[$property]
					}
					return true
				},
			}
		)
	}
	#validate
}