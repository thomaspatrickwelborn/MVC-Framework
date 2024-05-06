import DynamicEventTarget from '../../index.js'
import Trap from '../Trap/index.js'
export default class ObjectTrap extends Trap {
  constructor($aliases) {
    super($aliases)
    Object.freeze(this)
  }
  assign($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root } = this.aliases
    return function assign() {
      return Object.assign($root, ...arguments)
    }
  }
  create($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    return function create($propertiesObject = {}) {
      return Object.create($root, $propertiesObject)
    }
  }
  defineProperties($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root } = this.aliases
    return function defineProperties($props) {
      return Object.defineProperty($root, $props)
    }
  }
  defineProperty($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $proxy } = this.aliases
    return function defineProperty($property, $descriptor) {
      return Object.defineProperty($root, $property, propertyDescriptor)
    }
  }
  entries($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    return function entries() {
      return Object.entries($root)
    }
  }
  freeze($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function freeze() {
      return Object.freeze($root)
    }
  }
  fromEntries($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function fromEntries() {
      return Object.fromEntries($root)
    }
  }
  getOwnPropertyDescriptor($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function getOwnPropertyDescriptor($prop) {
      return Object.getOwnPropertyDescriptor($root, $prop)
    }
  }
  getOwnPropertyDescriptors($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function getOwnPropertyDescriptors() {
      return Object.getOwnPropertyDescriptors($root)
    }
  }
  getOwnPropertyNames($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function getOwnPropertyNames() {
      return Object.getOwnPropertyNames($root)
    }
  }
  getOwnPropertySymbols($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function getOwnPropertySymbols() {
      return Object.getOwnPropertySymbols($root)
    }
  }
  getPrototypeOf($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function getPrototypeOf() {
      return Object.getPrototypeOf($root)
    }
  }
  hasOwn($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function hasOwn($prop) {
      return Object.hasOwn($root, $prop)
    }
  }
  is($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function is($value2) {
      return Object.is($root, $value2)
    }
  }
  isExtensible($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function isExtensible() {
      return Object.isExtensible($root)
    }
  }
  isFrozen($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function isFrozen() {
      return Object.isFrozen($root)
    }
  }
  isSealed($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function isSealed() {
      return Object.isSealed($root)
    }
  }
  keys($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function keys() {
      return Object.keys($root)
    }
  }
  preventExtensions($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function preventExtensions() {
      return Object.preventExtensions($root)
    }
  }
  seal($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function seal() {
      return Object.seal($root)
    }
  }
  setPrototypeOf($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function setPrototypeOf() {
      return Object.setPrototypeOf($root)
    }
  }
  values($target, $property, $receiver) {
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function values() {
      return Object.values($root)
    }
  }
}