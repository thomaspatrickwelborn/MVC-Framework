import { typeOf } from '../Coutil/index.js'
import DynamicEventTarget from '../Core/DynamicEventTarget/index.js'
import Core from '../Core/index.js'
export default class Model extends Core {
  #_content
	constructor($settings = {}, $options = {}) {
		super($settings, $options)
    if(this.options.enableEvents === true) this.enableEvents()
	}
  get content() {
    if(this.#_content !== undefined) return this.#_content
    this.#_content = new DynamicEventTarget(this.settings.content, this.options.content)
    return this.#_content
  }
  parse() { return this.content.parse() }
}