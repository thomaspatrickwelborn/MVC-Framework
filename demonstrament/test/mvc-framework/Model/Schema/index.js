import { typeOf } from '../../Utils/index.js'

export default class Schema extends EventTarget {
	constructor($props = {}) {
		super()
		this.addProps($props)
	}
	addProps($addProps, $schema) {
		$addProps = $addProps || {}
		$schema = $schema || this
		iterateProps: for(const [
			$addPropKey, $addPropVal
		] of Object.entries($addProps)) {
			if(typeOf($addPropVal) === 'object') {
				if($schema[$addPropKey] instanceof Schema) {
					$schema[$addPropKey] = this.addProps(
						$addPropVal, $schema[$addPropKey]
					)
				} else {
					$schema[$addPropKey] = new Schema($addPropVal)
				}
			} else {
				if(
					$addPropVal === String ||
					$addPropVal === Number ||
					$addPropVal === Boolean
				) {
					$schema[$addPropKey] = $addPropVal
				}
			}
		}
		return $schema
	}
	removeProps($removeProps, $schema) {
		$removeProps = $removeProps || this
		$schema = $schema || this
		iterateProps: for(const [
			$removePropKey, $removePropVal
		] of Object.entries($removeProps)) {
			if(typeOf($removePropVal) === 'object') {
				if(
					$schema[$removePropKey] instanceof Schema
				) {
					$schema[$removePropKey] = this.removeProps(
						$removePropVal, $schema[$removePropKey]
					)
				}
			} else {
				delete $schema[$removePropKey]
			}
		}
		return $schema
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