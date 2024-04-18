import { typeOf } from '../Utils/index.js'
import Core from '../Core/index.js'
import Schema from './Schema/index.js'
import Content from './Content/index.js'

export default class Model extends Core {
	constructor($settings = {}) {
		super(...arguments)
		this.settings = $settings
		this.schema = $settings.schema
		this.content = $settings.content
		this.enableEvents()
	}
	// Model Schema
	#_schema = new Schema()
	get schema() {
		return this.#_schema
	}
	set schema($schema) {
		this.#_schema = new Schema($schema)
	}
	// Model Content
	#_content = new Content()
	get content() {
		return this.#_content
	}
	set content($content) {
		const schema = this.#_schema
		this.#_content = new Content($content, schema)
	}
	// Model Schema/Content Add Props
	addProps($addProps) {
		var { schema, content } = $addProps
		if(schema !== undefined) {
			this.#_schema.addProps(schema)
		}
		if(content !== undefined) {
			this.#_content.addProps(content, this.#_schema)
		}
		return this
	}
	// Model Schema/Content Remove Props
	removeProps($removeProps) {
		const { schema, content } = $removeProps
		if(schema !== undefined) {
			this.#_schema.removeProps(schema)
		}
		if(content !== undefined) {
			this.#_content.removeProps(content)
		}
		return this
	}
}