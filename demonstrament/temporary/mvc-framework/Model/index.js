import { typeOf } from '../Utils/index.js'
import DynamicEventTarget from '../Core/DynamicEventTarget/index.js'
import Core from '../Core/index.js'
export default class Model extends Core {
	constructor($settings = {}, $options = {}) {
		super(
      Object.assign({
        rootAlias: 'content',
        content: {},
        events: {},
      }, $settings),
      Object.assign({
        enable: true,
        freeze: false,
        content: {},
      }, $options),
    )
		this.type = this.settings.type
		this.#rootAlias = this.settings.rootAlias
    Object.defineProperty(this, this.#rootAlias, {
      get() { return this.#root }
    })
		this.#root = new DynamicEventTarget(this.settings.content, this.options.content)
    if(this.options.enable === true) this.enableEvents()
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
    }
    return this.#_aliases
  }
}