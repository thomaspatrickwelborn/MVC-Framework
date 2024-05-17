import { typeOf } from '../Utils/index.js'
import DynamicEventTarget from '../Core/DynamicEventTarget/index.js'
import Schema from './Schema/index.js'
import Validate from './Validate/index.js'
import Core from '../Core/index.js'
import Handler from './Handler/index.js'
export default class Model extends Core {
	constructor($settings = {
		content: {},
		schema: {},
		validate: {},
		events: {},
	}, $options = {
		enable: true,
		freeze: false,
	}) {
		super(...arguments)
		this.type = $settings.type
		this.events = $settings.events
		this.#rootAlias = $settings.rootAlias
		this.#schema = $settings.schema
		this.#validate = $settings.validate
		this.#root = new DynamicEventTarget($settings.content)
		this.#proxy = this.#root
		return this.#proxy
	}
  // Root Alias
  #_rootAlias
  get #rootAlias() { return this.#_rootAlias }
  set #rootAlias($rootAlias) {
    if(this.#_rootAlias !== undefined) return
    this.#_rootAlias = ( 
      typeof $rootAlias === 'string' &&
      $rootAlias.length > 0
    ) ? $rootAlias
      : 'content'
  }
	#_schema
	get #schema() { return this.#_schema }
	set #schema($schema) {
		if(this.#_schema !== undefined) return
		this.#_schema = new Schema($schema)
	}
	#_validate
	get #validate() { return this.#_validate }
	set #validate($validate) {
		if(this.#_validate !== undefined) return
		this.#_validate = new Validate($validate)
	}
  // Root
  #_root
  get #root() { return this.#_root }
  set #root($root) {
    if(this.#_root !== undefined) return
    this.#_root = $root
  }
	#_proxy
	get #proxy() { return this.#_proxy }
	set #proxy($content) {
		const $this = this
		const $root = this.#root
		this.#_proxy = new Proxy(
			$root, this.#handler
		)
	}
  // Handler
  #_handler
  get #handler() {
    if(this.#_handler !== undefined) return this.#_handler
    this.#_handler = new Handler(this.#aliases)
    return this.#_handler
  }
  // Aliases
  #_aliases
  get #aliases() {
    if(this.#_aliases !== undefined) return this.#_aliases
    this.#_aliases = {
      $core: this,
      $rootAlias: this.#_rootAlias,
      $root: this.#_root,
      $schema: this.#_schema,
      $validate: this.#_validate,
    }
    return this.#_aliases
  }
}