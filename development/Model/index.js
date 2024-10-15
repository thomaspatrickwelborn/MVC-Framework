import { typeOf } from '../Coutil/index.js'
import Content from './Content/index.js'
import Core from '../Core/index.js'
import Schema from './Schema/index.js'
const Settings = {
  content: {},
  // schema: {},
}
const Options = {
  content: {},
  // schema: {},
}
export default class Model extends Core {
  #_schema
  #_content
	constructor($settings = {}, $options = {}) {
		super(
      Object.assign({}, Settings, $settings), 
      Object.assign({}, Options, $options),
    )
    this.schema
    this.content
    if(this.options.enableEvents === true) this.enableEvents()
	}
  get schema() {
    if(this.#_schema !== undefined) return this.#_schema
    const { schema, content } = this.settings
    // No Schema
    if(!schema) { this.#_schema = null }
    // Existing Schema
    else if(schema instanceof Schema) { this.#_schema = schema }
    // New Schema
    else {
      this.#_schema = new Schema(
        schema, this.options.schema
      )
    }
    return this.#_schema
  }
  get content() {
    if(this.#_content !== undefined) return this.#_content
    let { content } = this.settings
    this.#_content = new Content(content, this.schema, this.options.content)
    return this.#_content
  }
  parse() { return this.content.parse() }
}