import { typeOf } from '../../Utils/index.js'
import Schema from '../Schema/index.js'
import Validate from '../Validate/index.js'

export default class Content extends EventTarget {
	constructor($content = {}, $schema = {}) {
		super()
		this.#schema = $schema
		this.addProps($content, $schema)
	}
	// Schema
	#_schema
	get #schema() { return this.#_schema }
	set #schema($schema) { this.#_schema = $schema }
	// Get
	get() {
		const context = this
		const schema = this.#schema
		const args = [...arguments]
		switch(args.length) {
		case 0:
			return this.toObject()
			break
		case 1:
			const propPath = args[0].split('.')
			const propKey = propPath.pop()
			var propVal = context
			for(const $propPathFrag of propPath) {
				propVal = propVal[$propPathFrag]
			}
			propVal = propKey[propKey]
			if(propVal instanceof Content) {
				return propVal.toObject()
			} else {
				return propVal
			}
			break
		}
	}
	// Set
	set() {
		var validate
		var context = this
		var schema = this.#schema
		const args = [...arguments]
		switch(args.length) {
		case 0:
			return this
		case 1:
			if(typeOf(args[0]) === 'object') {
				iteratePropKeys: for(var [
					$propKey, $propVal
				] of Object.entries(
					args[0]
				)) {
					this.set($propKey, $propVal)
				}
			}
			break
		case 2:
			var propKey = args[0]
			var propVal = args[1]
			const propKeyFrags = propKey.split('.')
			propKey = propKeyFrags.pop()
			for(const $propKeyFrag of propKeyFrags) {
				context = context[$propKeyFrag]
				schema = schema[$propKeyFrag]
			}
			validate = Validate({
				schemaKey: propKey,
				schemaVal: schema[propKey],
				contentKey: propKey,
				contentVal: propVal,
			})
			if(validate.type.valid === false) break
			context[propKey] = propVal
			break
		}
		return this
	}
	// Delete
	delete() {
		const args = [...arguments]
		var context = this
		switch(typeOf(args[0])) {
		case 'string':
			const propKeyFrags = args[0].split('.')
			const propKey = propKeyFrags.pop()
			for(const $propKeyFrag of propKeyFrags) {
				context = context[$propKeyFrag]
			}
			if(context === undefined) break
			context[propKey] = undefined
			const deleteEvent = new CustomEvent('delete', {
				detail: {
					key: propKey,
					path: propKey,
				}
			})
			const deletePropEvent = new CustomEvent(`delete:${propKey}`, {
				detail: {
					key: propKey,
					path: propKey,
				}
			})
			context.dispatchEvent(deleteEvent, context)
			context.dispatchEvent(deletePropEvent, context)
			break
		case 'array':
			const propKeys = args[0]
			for(const $propKey of propKeys) {
				this.delete($propKey)
			}
			break
		case 'undefined':
			this.delete(Object.keys(this.toObject()))
			break
		}
	}
	// Add Props
	addProps($addProps, $schemaProps) {
		$schemaProps = $schemaProps || this.#schema
		let context = this
		// Iterate Content Props
		iterateAddProps: for(const [
			$contentKey, $contentVal
		] of Object.entries($addProps)) {
			const schemaKey = $contentKey
			const contentKey = $contentKey
			let schemaVal = $schemaProps[schemaKey]
			let contentVal = $contentVal
			const validate = Validate({
				schemaKey, schemaVal, contentKey, contentVal,
			}, { Schema, Content })
			if(validate.type.valid === false) {
				continue iterateAddProps
			}
			const typeOfContentVal = validate.type.contentVal
			let typeOfSchemaVal = validate.type.schemaVal
			if(typeOfContentVal === 'object') {
				contentVal = new Content($contentVal, schemaVal)
				contentVal = this.#enableSetContentValEventListener({
					context, contentKey, contentVal,
				})
			} else {
				contentVal = $contentVal
			}
			context = this.#defineProps({
				context, 
				schemaKey, 
				schemaVal, 
				contentKey, 
				contentVal,
			})
		}
		return this
	}
	// Remove Props
	removeProps() {
		const args = [...arguments]
		var context = this
		var schema = this.#_schema
		switch(typeOf(args[0])) {
		case 'string':
			const propKeyFrags = args[0].split('.')
			const propKey = propKeyFrags.pop()
			for(const $propKeyFrag of propKeyFrags) {
				context = context[$propKeyFrag]
				schema = context[$propKeyFrag]
			}
			if(context !== undefined) delete context[propKey]
			if(schema !== undefined) delete schema[propKey]
			break
		case 'array':
			const propKeys = args[0]
			for(const $propKey of propKeys) {
				this.delete($propKey)
			}
			break
		case 'undefined':
			this.delete(Object.keys(this.toObject()))
			break
		}
	}
	// Define Props
	#defineProps($settings) {
		let {
			context,
			contentKey,
			contentVal,
			schemaKey,
			schemaVal
		} = $settings
		Object.defineProperties(context, {
			[contentKey]: {
				configurable: true,
				get() { return contentVal },
				set($val) {
					if(typeOf($val) === 'undefined') {
						contentVal = undefined
						return
					}
					const validate = Validate({
						contentKey, 
						contentVal: $val,
						schemaKey: contentKey,
						schemaVal
					}, { Schema, Content })
					if(validate.type.valid === false) return
					const typeOfContentVal = validate.type.contentVal
					let typeOfSchemaVal = validate.type.schemaVal
					if(typeOfContentVal === 'object') {
						if(contentVal instanceof Content) {
							for(const [
								$anterKey, $anterVal
							] of Object.entries($val)) {
								contentVal[$anterKey] = $anterVal
							}
						} else {
							contentVal = new Content($val, schemaVal)
							contentVal = this.#enableSetContentValEventListener({
								context, contentKey, contentVal,
							})
						}
					} else {
						contentVal = $val
					}
					const setEvent = new CustomEvent('set', {
						detail: {
							key: contentKey,
							val: contentVal,
							path: contentKey,
						}
					})
					const setPropEvent = new CustomEvent(`set:${contentKey}`, {
						detail: {
							key: contentKey,
							val: contentVal,
							path: contentKey,
						}
					})
					context.dispatchEvent(setEvent, context)
					context.dispatchEvent(setPropEvent, context)
				}
			}
		})
		return context
	}
	// Enable SetContentValEventListener
	#enableSetContentValEventListener($settings) {
		const {
			context, contentKey, contentVal,
		} = $settings
		contentVal.addEventListener('delete', function($event) {
			const path = [$event.detail.path]
			path.unshift(contentKey)
			const deleteEvent = new CustomEvent('delete', {
				detail: {
					key: $event.detail.key,
					path: path.join('.'),
				},
			})
			const deletePropEvent = new CustomEvent(`delete:${path.join('.')}`, {
				detail: {
					key: $event.detail.key,
					path: path.join('.'),
				},
			})
			context.dispatchEvent(deleteEvent, context)
			context.dispatchEvent(deletePropEvent, context)
		})
		contentVal.addEventListener('set', function($event) {
			const path = [$event.detail.path]
			path.unshift(contentKey)
			const setEvent = new CustomEvent('set', {
				detail: {
					key: $event.detail.key,
					val: $event.detail.val,
					path: path.join('.'),
				}
			})
			const setPropEvent = new CustomEvent(`set:${path.join('.')}`, {
				detail: {
					key: $event.detail.key,
					val: $event.detail.val,
					path: path.join('.'),
				}
			})
			context.dispatchEvent(setEvent, context)
			context.dispatchEvent(setPropEvent, context)
		})
		return contentVal
	}
	// To Object
	toObject($object) {
		$object = $object || this
		const object = {}
		const propertyKeys = Object.getOwnPropertyNames($object)
		for(const $propertyKey of propertyKeys) {
			if($object[$propertyKey] instanceof Content) {
				object[$propertyKey] = this.toObject($object[$propertyKey])
			} else {
				object[$propertyKey] = $object[$propertyKey]
			}
		}
		return object
	}
}