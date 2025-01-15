import Core from '../../index.js'
import { CoreClassInstantiator } from '../../PropertyInstantiators/index.js'
export default class Handler {
  #propertyClass
  constructor($propertyClass) {
    this.#propertyClass = $propertyClass
  }
  get get() {
    return function($target, $property) {
      return $target[$property]
    }
  }
  get set() {
    const { ClassInstantiator } = this.#propertyClass
    return function($target, $property, $value) {
      ClassInstantiator(this.#propertyClass, $property, $value)
      return $target[$property]
    }
  }
  get deleteProperty() {
    const { ClassDeinstantiator } = this.#propertyClass
    return function($target, $property) {
      ClassDeinstantiator(this.#propertyClass, $property)
      return true
    }
  }
}