import { typeOf } from '../Coutil/index.js'
import DynamicEventTarget from '../Core/DynamicEventTarget/index.js'
import Core from '../Core/index.js'
import Schema from './Schema/index.js'
const Settings = {
  content: {},
  schema: {},
}
const Options = {
  content: {},
  schema: {},
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
    let { schema, content } = this.settings
    // Existing Schema
    if(schema instanceof Schema) {
      this.#_schema = schema
    }
    // New Schema
    else if(
      (Array.isArray(schema) && Array.isArray(content)) ||
      (typeOf(schema) === 'object' && typeOf(content) === 'object')
    ) {
      this.#_schema = new Schema(
        schema, this.options.schema
      )
    }
    return this.#_schema
  }
  get content() {
    if(this.#_content !== undefined) return this.#_content
    let { schema, content } = this.settings
    if(((
      schema instanceof Schema || Array.isArray(schema)
    ) && Array.isArray(content)) ||
    ((
      schema instanceof Schema || typeOf(schema) === 'object'
    ) && typeOf(content) === 'object')) {
      this.#_content = new DynamicEventTarget(
        content, this.options.content, this.schema
      ) 
    }
    return this.#_content
  }
  parse() { return this.content.parse() }
}