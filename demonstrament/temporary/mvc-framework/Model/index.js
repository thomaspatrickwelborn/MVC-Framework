import { typeOf } from '../Utils/index.js'
import DynamicEventTarget from '../Core/DynamicEventTarget/index.js'
import Schema from './Schema/index.js'
import Validate from './Validate/index.js'
import Core from '../Core/index.js'
export default class Model extends Core {
	constructor($settings = {
    rootAlias: 'content',
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
		this.#rootAlias = $settings.rootAlias
    Object.defineProperty(this, this.#rootAlias, {
      get() { return this.#root }
    })
		this.#schema = $settings.schema
		this.#validate = $settings.validate
		this.#root = new DynamicEventTarget($settings.content)
    if($options.enable === true) this.enableEvents()
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
  // Aliases
  #_aliases
  get #aliases() {
    if(this.#_aliases !== undefined) return this.#_aliases
    this.#_aliases = {
      $core: this,
      $root: this.#_root,
      $schema: this.#_schema,
      $validate: this.#_validate,
    }
    return this.#_aliases
  }
}