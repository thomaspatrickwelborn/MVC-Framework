import DynamicEventTarget from '../../../index.js'
import Trap from '../Trap/index.js'
// Object Traps Are Object Class Static Methods
export default class ObjectTrap extends Trap {
  constructor($aliases) {
    super($aliases)
    Object.freeze(this)
  }
  // Assign
  assign($target, $property, $receiver) {
    const $this = this
    const {
      $root, $rootAlias
    } = this.aliases
    return function assign() {
      iterateSources: 
      for(var $source of [...arguments]) {
        iterateSourceProperties: 
        for(var [
          $sourcePropertyKey, $sourcePropertyVal
        ] of Object.entries($source)) {
          if(typeof $sourcePropertyVal === 'object') {
            $sourcePropertyVal = new DynamicEventTarget(
              $sourcePropertyVal, {
                rootAlias: $rootAlias,
              }
            )
          }
          $root[$sourcePropertyKey] = $sourcePropertyVal
        }
      }
      return $root
    }
  }
  // Create
  create($target, $property, $receiver) {
    const $this = this
    const { $root } = this.aliases
    return function create($propertiesObject = {}) {
      return Object.create($root, $propertiesObject)
    }
  }
  // Define Properties
  defineProperties($target, $property, $receiver) {
    const $this = this
    const { $root, $rootAlias } = this.aliases
    return function defineProperties($props) {
      iterateProps:
      for(var [
        $propertyKey,
        $propertyDescriptor,
      ] of Object.entries($props)) {
        if(typeof $propertyDescriptor.value === 'object') {
          $propertyDescriptor.value = new DynamicEventTarget(
            $propertyDescriptor.value, {
              rootAlias: $rootAlias,
            }
          )
        }
      }
      return Object.defineProperties($root, $props)
    }
  }
  // Define Property
  defineProperty($target, $property, $receiver) {
    const $this = this
    const { $root, $rootAlias } = this.aliases
    return function defineProperty($property, $descriptor) {
      if(typeof $descriptor.value === 'object') {
        $descriptor.value = new DynamicEventTarget(
          $descriptor.value, {
            rootAlias: $rootAlias,
          }
        )
      }
      return Object.defineProperty($root, $property, $descriptor)
    }
  }
  // Entries
  entries($target, $property, $receiver) {
    const { $root } = this.aliases
    return function entries() {
      return Object.entries($root)
    }
  }
  // Freeze
  freeze($target, $property, $receiver) {
    const { $root } = this.aliases
    return function freeze() {
      return Object.freeze($root)
    }
  }
  // From Entries
  fromEntries($target, $property, $receiver) {
    const { $root } = this.aliases
    return function fromEntries() {
      return Object.fromEntries(
        Object.entries($root)
      )
    }
  }
  // Get Own Property Descriptor
  getOwnPropertyDescriptor($target, $property, $receiver) {
    const { $root } = this.aliases
    return function getOwnPropertyDescriptor($prop) {
      return Object.getOwnPropertyDescriptor($root, $prop)
    }
  }
  // Get Own Property Descriptors
  getOwnPropertyDescriptors($target, $property, $receiver) {
    const { $root } = this.aliases
    return function getOwnPropertyDescriptors() {
      return Object.getOwnPropertyDescriptors($root)
    }
  }
  // Get Own Property Names
  getOwnPropertyNames($target, $property, $receiver) {
    const { $root } = this.aliases
    return function getOwnPropertyNames() {
      return Object.getOwnPropertyNames($root)
    }
  }
  // Get Own Property Symbols
  getOwnPropertySymbols($target, $property, $receiver) {
    const { $root } = this.aliases
    return function getOwnPropertySymbols() {
      return Object.getOwnPropertySymbols($root)
    }
  }
  // Get Prototype Of
  getPrototypeOf($target, $property, $receiver) {
    const { $root } = this.aliases
    return function getPrototypeOf() {
      return Object.getPrototypeOf($root)
    }
  }
  // Group By
  groupBy($target, $property, $receiver) {
    const { $root } = this.aliases
    return function groupBy(callbackFn) {
      return Object.groupBy($root, callbackFn)
    }    
  }
  // Has Own
  hasOwn($target, $property, $receiver) {
    const { $root } = this.aliases
    return function hasOwn($prop) {
      return Object.hasOwn($root, $prop)
    }
  }
  // Is
  is($target, $property, $receiver) {
    const { $root } = this.aliases
    return function is($value) {
      return Object.is($root, $value)
    }
  }
  // Is Extensible
  isExtensible($target, $property, $receiver) {
    const { $root } = this.aliases
    return function isExtensible() {
      return Object.isExtensible($root)
    }
  }
  // Is Frozen
  isFrozen($target, $property, $receiver) {
    const { $root } = this.aliases
    return function isFrozen() {
      return Object.isFrozen($root)
    }
  }
  // Is Sealed
  isSealed($target, $property, $receiver) {
    const { $root } = this.aliases
    return function isSealed() {
      return Object.isSealed($root)
    }
  }
  // Keys
  keys($target, $property, $receiver) {
    const { $root } = this.aliases
    return function keys() { return Object.keys($root) }
  }
  // Prevent Extensions
  preventExtensions($target, $property, $receiver) {
    const { $root } = this.aliases
    return function preventExtensions() {
      return Object.preventExtensions($root)
    }
  }
  // Seal
  seal($target, $property, $receiver) {
    const { $root } = this.aliases
    return function seal() {
      return Object.seal($root)
    }
  }
  // Set Prototype Of
  setPrototypeOf($target, $property, $receiver) {
    const { $root } = this.aliases
    return function setPrototypeOf($prototype) {
      return Object.setPrototypeOf($root, $prototype)
    }
  }
  // Values
  values($target, $property, $receiver) {
    const { $root } = this.aliases
    return function values() {
      return Object.values($root)
    }
  }
}
