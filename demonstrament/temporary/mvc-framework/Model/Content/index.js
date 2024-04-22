import { typeOf } from '../../Utils/index.js'
import Schema from '../Schema/index.js'
import Validate from '../Validate/index.js'

export default class Content extends EventTarget {
	constructor($content = {}, $schema = {}) {
		super()
		this.#schema = $schema
		this.addProps($content, $schema)
	}
	#_schema
	get #schema() { return this.#_schema }
	set #schema($schema) { this.#_schema = $schema }
	get() {
		const context = this
		const schema = this.#schema
		const args = [...arguments]
		switch(args.length) {
		case 0:
			return this.toObject()
			break
		case 1:
			const propKey = args[0]
			var propVal = context
			const propKeyData = propKey.split('.')
			for(const $propKey of propKeyData) {
				propVal = propVal[$propKey]
			}
			if(propVal instanceof Content) {
				return propVal.toObject()
			} else {
				return propVal
			}
			break
		}
	}
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
					const propKeyData = $propKey.split('.')
					for(const $propKey of propKeyData) {
						if(
							context[$propKey] instanceof Content &&
							typeOf($propVal) === 'object'
						) {
							context[$propKey].set($propVal)
						} else {
							validate = Validate({
								schemaKey: $propKey,
								schemaVal: schema[$propKey],
								contentKey: $propKey,
								contentVal: $propVal,
							})
							if(validate.type.valid === false) break
							context[$propKey] = $propVal
						}
					}
				}
			}
			break
		case 2:
			var propKey = args[0]
			var propVal = args[1]
			const propKeyData = propKey.split('.')
			for(const $propKey of propKeyData) {
				if(
					context[$propKey] instanceof Content &&
					typeOf(propVal) === 'object'
				) {
					context[$propKey].set(propVal)
				} else {

					validate = Validate({
						schemaKey: $propKey,
						schemaVal: schema[$propKey],
						contentKey: $propKey,
						contentVal: propVal,
					})
					if(validate.type.valid === false) break
					context[$propKey] = propVal
				}
			}	
			break
		}
		return this
	}
	delete() {}
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
				contentVal = this.enableSetContentValEventListener({
					context, contentKey, contentVal,
				})
			} else {
				contentVal = $contentVal
			}
			context = this.defineProps({
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
	removeProps($removeProps, $content) {
		$removeProps = $removeProps || this
		$content = $content || this
		iterateRemoveProps: for(const [
			$removePropKey, $removePropVal
		] of Object.entries($removeProps)) {
			if(typeOf($removePropVal) === 'object') {
				if(
					$content[$removePropKey] instanceof Schema
				) {
					$content[$removePropKey].removeProps(
						$removePropVal, $content[$removePropKey]
					)
				}
			} else {
				delete $content[$removePropKey]
			}
		}
		return this
	}
	// Define Props
	defineProps($settings) {
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
							contentVal = this.enableSetContentValEventListener({
								context, contentKey, contentVal,
							})
						}
					} else {
						contentVal = $val
					}
					const setEvent = new CustomEvent('set', {
						bubbles: true,
						detail: {
							key: contentKey,
							val: contentVal,
							path: contentKey,
						}
					})
					const setPropEvent = new CustomEvent(`set:${contentKey}`, {
						bubbles: true,
						detail: {
							key: contentKey,
							val: contentVal,
							path: contentKey,
						}
					})
					context.dispatchEvent(setEvent)
					context.dispatchEvent(setPropEvent)
				}
			}
		})
		return context
	}
	// Enable SetContentValEventListener
	enableSetContentValEventListener($settings) {
		const {
			context, contentKey, contentVal,
		} = $settings
		contentVal.addEventListener('set', function($event) {
			const path = [$event.detail.path]
			path.unshift(contentKey)
			const setEvent = new CustomEvent('set', {
				detail: {
					key: contentKey,
					val: contentVal,
					path: path.join('.')
				}
			})
			const setPropEvent = new CustomEvent(`set:${path.join('.')}`, {
				detail: {
					key: contentKey,
					val: contentVal,
					path: path.join('.'),
				}
			})
			context.dispatchEvent(setEvent)
			context.dispatchEvent(setPropEvent)
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