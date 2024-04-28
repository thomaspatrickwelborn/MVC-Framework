import { typeOf, parsePropFrag, propFromPropPath } from '../../Utils/index.js'
import arrayIncludesObject from './arrayIncludesObject.js'
import SchemaArray from './SchemaArray/index.js'

export default class Schema extends EventTarget {
	constructor($props = {}) {
		super()
		this.addProps($props)
	}
	#validProps = [
		String, Number, Boolean, Array, Object, 
		Schema, SchemaArray,
	]
	addProps() {
		const props = arguments[0] || {}
		iterateProps: for(var [
			$propKey, $propVal
		] of Object.entries(props)) {
			var { propKey, context } = propFromPropPath(this, $propKey)
			// Valid Props Includes Prop Val
			for(const $validProp of this.#validProps) {
				if(
					$propVal === $validProp ||
					$propVal instanceof $validProp
				) {
					context[propKey] = $propVal
				}
			}
		}
		return this
	}
	removeProps() {
		const props = arguments[0] || Object.keys(this.toObject())
		// Switch Type Of Props 
		switch(typeOf(props)) {
		case 'string':
			var propPath = props
			var { propKey, context } = propFromPropPath(this, propPath)
			const typeOfPropKey = typeOf(propKey)
			if(typeOfPropKey === 'string') {
				delete context[propKey]
			}
			break
		case 'array':
			for(const $propPath of props) {
				this.removeProps($propPath)
			}
			break
		case 'object':
			for(const $propPath of Object.keys(props)) {
				this.removeProps($propPath)
			}
			break
		}
		return this
	}
	toObject($object) {
		$object = $object || this
		const object = {}
		const propertyKeys = Object.getOwnPropertyNames($object)
		for(const $propertyKey of propertyKeys) {
			const typeOfPropertyVal = typeOf($object[$propertyKey])
			if(typeOfPropertyVal instanceof Schema) {
				object[$propertyKey] = this.toObject($object[$propertyKey])
			} else {
				object[$propertyKey] = $object[$propertyKey]
			}
		}
		return object
	}
}