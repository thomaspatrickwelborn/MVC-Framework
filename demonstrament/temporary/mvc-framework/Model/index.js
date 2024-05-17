import { typeOf } from '../Utils/index.js'
import DynamicEventTarget from '../Core/DynamicEventTarget/index.js'
import Core from '../Core/index.js'
import Handler from './Handler/index.js'
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
	#schema
	#validate
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
    }
    return this.#_aliases
  }
}