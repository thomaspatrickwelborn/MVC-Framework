import { typeOf } from '../Coutil/index.js'
import DynamicEventTarget from '../Core/DynamicEventTarget/index.js'
import Core from '../Core/index.js'
import Schema from './Schema/index.js'
const Settings = {
  content: undefined,
  schema: undefined,
}
const Options = {
  content: undefined,
  schema: undefined,
}
export default class Model extends Core {
  #_schema
  #_content
	constructor($settings = {}, $options = {}) {
		super(
      Object.assign(Settings, $settings), 
      Object.assign(Options, $options),
    )
    this.content
    if(this.options.enableEvents === true) this.enableEvents()
	}
  get schema() {
    if(this.#_schema !== undefined) return this.#_schema
    this.#_schema = new Schema(
      this.settings.schema, this.options.schema
    )
    return this.#_schema
  }
  get content() {
    if(this.#_content !== undefined) return this.#_content
    this.#_content = new DynamicEventTarget(
      this.settings.content, this.options.content, this.schema
    )
    return this.#_content
  }
  parse() { return this.content.parse() }
}