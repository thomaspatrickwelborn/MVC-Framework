import { typeOf } from '../../Utils/index.js'
import Schema from '../Schema/index.js'
import Validate from '../Validate/index.js'

export default class Content extends EventTarget {
	constructor($content = {}, $schema = {}) {
		super()
		this.#schema = $schema
		this.addProps($content, $schema)
	}
	#schema
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
		$removeProps = $removeProps || this.toObject()
		$content = $content || this.toObject()
		iterateRemoveProps: for(const [
			$removePropKey, $removePropVal
		] of Object.entries($removeProps)) {
			if(typeOf($removePropVal) === 'object') {
				if($content[$removePropKey] instanceof Content) {
					$content[$removePropKey] = this.removeProps(
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
					context.dispatchEvent(new CustomEvent('set', {
						detail: {
							key: contentKey,
							val: contentVal,
							path: contentKey,
						}
					}))
					context.dispatchEvent(new CustomEvent(`set:${contentKey}`, {
						detail: {
							key: contentKey,
							val: contentVal,
							path: contentKey,
						}
					}))
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
			context.dispatchEvent(new CustomEvent('set', {
				detail: {
					key: contentKey,
					val: contentVal,
					path: path.join('.')
				}
			}))
			context.dispatchEvent(new CustomEvent(`set:${path.join('.')}`, {
				detail: {
					key: contentKey,
					val: contentVal,
					path: path.join('.'),
				}
			}))
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