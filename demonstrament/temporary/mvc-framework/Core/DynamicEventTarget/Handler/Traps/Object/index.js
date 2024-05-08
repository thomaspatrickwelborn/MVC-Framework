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
      $eventTarget, $root, $rootAlias, $recur
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
                $rootAlias, $recur,
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
    const { $eventTarget, $root } = this.aliases
    return function create($propertiesObject = {}) {
      return Object.create($root, $propertiesObject)
    }
  }
  // Define Properties
  defineProperties($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root } = this.aliases
    return function defineProperties($props) {
      return Object.defineProperties($root, $props)
    }
  }
  // Define Property
  defineProperty($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root } = this.aliases
    return function defineProperty($property, $descriptor) {
      return Object.defineProperty($root, $property, $descriptor)
    }
  }
  // Entries
  entries($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root } = this.aliases
    return function entries() {
      return Object.entries($root)
    }
  }
  // Freeze
  freeze($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function freeze() {
      return Object.freeze($root)
    }
  }
  // From Entries (Recurse)
  fromEntries($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function fromEntries() {
      return Object.fromEntries(Object.entries($root))
    }
  }
  // Get Own Property Descriptor (No Recurse)
  getOwnPropertyDescriptor($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function getOwnPropertyDescriptor($prop) {
      return Object.getOwnPropertyDescriptor($root, $prop)
    }
  }
  // Get Own Property Descriptors (No Recurse)
  getOwnPropertyDescriptors($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function getOwnPropertyDescriptors() {
      return Object.getOwnPropertyDescriptors($root)
    }
  }
  // Get Own Property Names (No Recurse)
  getOwnPropertyNames($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function getOwnPropertyNames() {
      return Object.getOwnPropertyNames($root)
    }
  }
  // Get Own Property Symbols (No Recurse)
  getOwnPropertySymbols($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function getOwnPropertySymbols() {
      return Object.getOwnPropertySymbols($root)
    }
  }
  // Get Prototype Of (No Recurse)
  getPrototypeOf($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function getPrototypeOf() {
      return Object.getPrototypeOf($root)
    }
  }
  // Group By (Unknown Recurse)
  groupBy($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function groupBy(callbackFn) {
      return Object.groupBy($root, callbackFn)
    }    
  }
  // Has Own (No Recurse)
  hasOwn($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function hasOwn($prop) {
      return Object.hasOwn($root, $prop)
    }
  }
  // Is (No Recurse)
  is($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function is($value) {
      return Object.is($root, $value)
    }
  }
  // Is Extensible (No Recurse)
  isExtensible($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function isExtensible() {
      return Object.isExtensible($root)
    }
  }
  // Is Frozen (No Recurse)
  isFrozen($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function isFrozen() {
      return Object.isFrozen($root)
    }
  }
  // Is Sealed (No Recurse)
  isSealed($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function isSealed() {
      return Object.isSealed($root)
    }
  }
  // Keys (Recurse)
  keys($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function keys() {
      return Object.keys($root)
    }
  }
  // Prevent Extensions (Unknown Recurse)
  preventExtensions($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function preventExtensions() {
      return Object.preventExtensions($root)
    }
  }
  // Seal (Recurse)
  seal($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function seal() {
      return Object.seal($root)
    }
  }
  // Set Prototype Of (No Recurse)
  setPrototypeOf($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function setPrototypeOf($prototype) {
      return Object.setPrototypeOf($root, $prototype)
    }
  }
  // Values (Recurse)
  values($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function values() {
      return Object.values($root)
    }
  }
}