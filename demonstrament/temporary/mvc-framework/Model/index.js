import {
	typeOf, parseShortenedPropEvents
} from '../Utils/index.js'
import Core from '../Core/index.js'
import Schema from './Schema/index.js'
import Content from './Content/index.js'

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
		this.#_content = new Content(content, this.#_schema)
		this.events = $settings.events
		if($options.enable === true) this.enableEvents(this.events)
		if($options.freeze === true) Object.freeze(this)
	}
	// Get
	get() { return this.#_content.get(...arguments) }
	// Set
	set() { return this.#_content.set(...arguments) }
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
	get content() { return this.#_content.toObject() }
	// Model Schema/Content Add Props
	addProps($content, $schema) {
		if($schema !== undefined) {
			this.#_schema.addProps($schema)
		} else if(
			$schema === undefined &&
			$content !== undefined
		) {
			this.#_schema.addProps(
				this.#inferSchemaFromContent($content)
			)
		}
		if($content !== undefined) {
			this.#_content.addProps($content, this.#_schema)
		}
		return this
	}
	// Model Schema/Content Remove Props
	removeProps($content, $schema) {
		if($schema !== undefined) {
			this.#_schema.removeProps($schema)
		} else if(
			$schema === undefined &&
			$content !== undefined
		) {
			this.#_schema.removeProps($content)
		}
		if($content !== undefined) {
			this.#_content.removeProps($content)
		}
		return this
	}
	enableEvents($events) {
		$events = $events || this.events
		iterateProps: for(var [
			$propName, $propEvents
		] of Object.entries($events)) {
			if(typeOf($propEvents) === 'object') {
				$propEvents = parseShortenedPropEvents($propEvents)
			}
			iteratePropEvents: for(
				const $propEvent of $propEvents
			) {
				let prop
				if($propName === 'content') prop = this.#_content
				if(prop === undefined) break iteratePropEvents
				const propEventTargetKeys = $propEvent.target.split('.')
				iteratePropEventTargetKeys: for(
					const $propEventTargetKey of propEventTargetKeys
				) {
					if($propEventTargetKey === ':scope') {
						continue iteratePropEventTargetKeys
					}
					prop = prop[$propEventTargetKey]
				}
				if(
					prop instanceof EventTarget ||
					prop instanceof NodeList
				) {
					if(prop instanceof NodeList) {
						for(const $prop of prop) {
							$prop.addEventListener(
								$propEvent.name, 
								$propEvent.callback,
							)
						}
					} else {
						prop.addEventListener(
							$propEvent.name, 
							$propEvent.callback,
						)
					}
				}
				$propEvent.enabled = true
			}
		}
		return this
	}
	disableEvents($events) {
		$events = $events || this.events
		iterateProps: for(var [
			$propName, $propEvents
		] of Object.entries($events)) {
			if(typeOf($propEvents) === 'object') {
				$propEvents = parseShortenedPropEvents($propEvents)
			}
			iteratePropEvents: for(const $propEvent of $propEvents) {
				// let prop = this[$propName]
				let prop
				if($propName === 'content') prop = this.#_content
				if(prop === undefined) break iteratePropEvents
				const propEventTargetKeys = $propEvent.target.split('.')
				iteratePropEventTargetKeys: for(
					const $propEventTargetKey of propEventTargetKeys
				) {
					if($propEventTargetKey === ':scope') {
						continue iteratePropEventTargetKeys
					}
					prop = prop[$propEventTargetKey]
				}
				if(
					prop instanceof EventTarget ||
					prop instanceof NodeList
				) {
					if(prop instanceof NodeList) {
						for(const $prop of prop) {
							$prop.removeEventListener(
								$propEvent.name, 
								$propEvent.callback,
							)
						}
					} else if(prop instanceof EventTarget) {
						prop.removeEventListener(
							$propEvent.name, 
							$propEvent.callback,
						)
					}
				}
				$propEvent.enabled = false
			}
		}
		return this
	}
	toObject() { return this.#_content.toObject() }
}