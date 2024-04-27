import { typeOf, parsePropFrag } from '../../Utils/index.js'
import arrayIncludesObject from './arrayIncludesObject.js'

export default class Schema extends EventTarget {
	constructor($props = {}) {
		super()
		this.addProps($props)
	}
	addProps($addProps) {
		$addProps = $addProps || {}
		iterateProps: for(const [
			$addPropKey, $addPropVal
		] of Object.entries($addProps)) {
			const typeOfAddPropVal = typeOf($addPropVal)
			if(typeOfAddPropVal === 'object') {
				if(this[$addPropKey] instanceof Schema) {
					this[$addPropKey].addProps($addPropVal)
				} else {
					this[$addPropKey] = new Schema($addPropVal)
				}
			} else if(typeOfAddPropVal === 'array') {
				this[$addPropKey] = this[$addPropKey] || []
				for(const $addPropArrayItem of $addPropVal) {
					if($addPropArrayItem instanceof Schema) {
						if(arrayIncludesObject(
							this[$addPropKey], $addPropArrayItem
						) === false) this[$addPropKey]
						.push($addPropArrayItem)
					} else if(typeOf($addPropArrayItem) === 'object') {
						if(arrayIncludesObject(
							this[$addPropKey], $addPropArrayItem
						) === false) this[$addPropKey]
						.push(new Schema($addPropArrayItem))
					}
				}
			} else if(
				$addPropVal === String ||
				$addPropVal === Number ||
				$addPropVal === Boolean ||
				$addPropVal === Array
			) {
				this[$addPropKey] = $addPropVal
			}
		}
		return this
	}
	removeProps($removeProps) {
		const args = [...arguments]
		var context = this
		switch(typeOf(args[0])) {
		case 'string':
			const removePropPath = args[0].split('.')
			const removePropKey = parsePropFrag(removePropPath.pop())
			const typeOfRemovePropKey = typeOf(removePropKey)
			for(var $removePropPathFrag of removePropPath) {
				$removePropPathFrag = parsePropFrag($removePropPathFrag)
				context = context[$removePropPathFrag]
			}
			if(typeOfRemovePropKey === 'string') {
				delete context[removePropKey]
			} else if(typeOfRemovePropKey === 'number') {
				context.splice(removePropKey, 1)
			}
			break
		case 'array':
			for(const $removePropPathFrag of $removeProps) {
				this.removeProps($removePropPathFrag)
			}
			break
		case 'undefined':
			$removeProps = this.removeProps(
				Object.keys(this.toObject())
			)
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