import {
	typeOf, parseShortenedEvents
} from '../Utils/index.js'
import Core from '../Core/index.js'
import Schema from './Schema/index.js'
import Content from './Content/index.js'
import ArrayContent from './Content/ArrayContent.js'

export default class Model extends Core {
	constructor($settings = {
		schema: {},
		content: {},
	}, $options = {
		enable: true,
		freeze: false,
	}) {
		super(...arguments)
		var schema, content
		if(
			$settings.schema === undefined &&
			$settings.content !== undefined
		) {
			schema = this.#inferSchemaFromContent($settings.content)
		} else if(
			$settings.schema !== undefined
		) {
			schema = $settings.schema
		}
		content = $settings.content
		this.#_schema = new Schema(schema)
		this.#_content = new Content(content, this.#_schema, this)
		this.events = $settings.events
		if($options.enable === true) this.enableEvents(this.events)
		if($options.freeze === true) Object.freeze(this)
	}
	// Get
	get() { return this.#_content.get(...arguments) }
	// Set
	set() { this.#_content.set(...arguments) }
	// Unset
	delete() { this.#_content.delete(...arguments) }
	// Model Schema
	#_schema
	get schema() { return this.#_schema.toObject() }
	#inferSchemaFromContent($content) {
		var schema = {}
		for(const [
			$contentPropKey, $contentPropVal
		] of Object.entries($content)) {
			const typeOfContentPropVal = typeOf($contentPropVal)
			if(typeOfContentPropVal === 'object') {
				schema[$contentPropKey] = this.#inferSchemaFromContent(
					$contentPropVal
				)
			} else {
				if(typeOfContentPropVal === 'string') {
					schema[$contentPropKey] = String
				} else if(typeOfContentPropVal === 'number') {
					schema[$contentPropKey] = Number
				} else if(typeOfContentPropVal === 'boolean') {
					schema[$contentPropKey] = Boolean
				}
			}
		}
		return schema
	}
	// Model Content
	#_content
	get content() { return this.#_content }
	// Model Schema/Content Add Props
	addProps($content, $schema) {
		return this.#toggleProps('addProps', ...arguments)
	}
	// Model Schema/Content Remove Props
	removeProps($content, $schema) {
		return this.#toggleProps('removeProps', ...arguments)
	}
	// Model Schema/Content Toggle Props
	#toggleProps($toggleMethod, $content, $schema) {
		if($schema !== undefined) {
			switch($toggleMethod) {
				case 'addProps': 
					this.#_schema.addProps($schema)
					break
					case 'removeProps':
					this.#_schema.removeProps($schema)
					break
			}
		} else if(
			$schema === undefined &&
			$content !== undefined
		) {
			switch($toggleMethod) {
				case 'addProps': 
					this.#_schema.addProps(
						this.#inferSchemaFromContent($content)
					)
					break
				case 'removeProps':
					this.#_schema.removeProps($content)
					break
			}
		}
		if($content !== undefined) {
			switch($toggleMethod) {
				case 'addProps': 
					this.#_content.addProps($content, this.#_schema)
					break
				case 'removeProps':
					this.#_content.removeProps($content)
					break
			}
		}
		return this
	}
	// To Object
	toObject() { return this.#_content.toObject() }
}