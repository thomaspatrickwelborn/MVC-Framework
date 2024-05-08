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
    const { $eventTarget, $root, $recur, $rootAlias } = this.aliases
    return function assign($prop) {
      // Default Assign
      if($recur === false) return Object.assign($root, ...arguments)
      // Recurse Assign
      const $sources = [...arguments]
      iterateSources: for(var $source of $sources) {
        iterateSourceProps: for(var [
          $sourceKey, $sourceVal
        ] of Object.entries($source)) {
          if(typeof $sourceVal === 'object') {
            if($root[$sourceKey] === undefined) {
              $root[$sourceKey] = new DynamicEventTarget($sourceVal, {
                rootAlias: $rootAlias,
                recur: $recur,
              })
            } else {
              $root[$sourceKey].assign($sourceVal)
            }
            continue iterateSourceProps
          }
          $root[$sourceKey] = $sourceVal
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
    const { $eventTarget, $root, $recur } = this.aliases
    return function entries() {
      if($recur === false) return Object.entries($root)
      const entries = []
      iterateEntries: for(var [
        $entryKey, $entryVal
      ] of Object.entries($root)) {
        if(typeof $entryVal === 'object') {
          $entryVal = $entryVal.entries()
        }
        entries.push([$entryKey, $entryVal])
      }
      return entries
    }
  }
  // Freeze
  freeze($target, $property, $receiver) {
    const { $eventTarget, $root, $recur } = this.aliases
    return function freeze() {
      if($recur === false) return Object.freeze($root)
      iterateEntries: for(var [
        $entryKey, $entryVal
      ] of Object.entries($root)) {
        if(typeof $entryVal === 'object') {
          $root[$entryKey].freeze()
        }
      }
      return Object.freeze($root)
    }
  }
  // From Entries
  fromEntries($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function fromEntries() {
      return Object.fromEntries(Object.entries($root))
    }
  }
  // Get Own Property Descriptor
  getOwnPropertyDescriptor($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function getOwnPropertyDescriptor($prop) {
      return Object.getOwnPropertyDescriptor($root, $prop)
    }
  }
  // Get Own Property Descriptors
  getOwnPropertyDescriptors($target, $property, $receiver) {
    const { $eventTarget, $root, $recur } = this.aliases
    return function getOwnPropertyDescriptors() {
      if($recur === false) return Object.getOwnPropertyDescriptors($root)
      const propertyDescriptors = {}
      iteratePropertyDescriptors: for(var [
        $propertyDescriptorKey, $propertyDescriptor
      ] of Object.entries(Object.getOwnPropertyDescriptors($root))) {
        if(typeof $propertyDescriptor.value === 'object') {
          $propertyDescriptor.value = $propertyDescriptor.value
          .getOwnPropertyDescriptors()
        }
        propertyDescriptors[$propertyDescriptorKey] = $propertyDescriptor
      }
      return propertyDescriptors
    }
  }
  // Get Own Property Names
  getOwnPropertyNames($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function getOwnPropertyNames() {
      return Object.getOwnPropertyNames($root)
    }
  }
  // Get Own Property Symbols
  getOwnPropertySymbols($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function getOwnPropertySymbols() {
      return Object.getOwnPropertySymbols($root)
    }
  }
  // Get Prototype Of
  getPrototypeOf($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function getPrototypeOf() {
      return Object.getPrototypeOf($root)
    }
  }
  // Group By
  groupBy($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function groupBy(callbackFn) {
      return Object.groupBy($root, callbackFn)
    }    
  }
  // Has Own
  hasOwn($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function hasOwn($prop) {
      return Object.hasOwn($root, $prop)
    }
  }
  // Is
  is($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function is($value) {
      return Object.is($root, $value)
    }
  }
  // Is Extensible
  isExtensible($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function isExtensible() {
      return Object.isExtensible($root)
    }
  }
  // Is Frozen
  isFrozen($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function isFrozen() {
      return Object.isFrozen($root)
    }
  }
  // Is Sealed
  isSealed($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function isSealed() {
      return Object.isSealed($root)
    }
  }
  // Keys
  keys($target, $property, $receiver) {
    const { $eventTarget, $root, $recur } = this.aliases
    return function keys() {
      if($recur === false) return Object.keys($root)
      const keys = []
      for(const $rootVal of Object.keys($root)) {
        if(typeof $rootVal === 'object') {
          keys.push($rootVal.keys())
        } else {
          keys.push($rootVal)
        }
      }
      return keys
    }
  }
  // Prevent Extensions
  preventExtensions($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function preventExtensions() {
      return Object.preventExtensions($root)
    }
  }
  // Seal
  seal($target, $property, $receiver) {
    const { $eventTarget, $root, $recur } = this.aliases
    return function seal() {
      if($recur === false) return Object.seal($root)
      iterateEntries: for(var [
        $entryKey, $entryVal
      ] of Object.entries($root)) {
        if(typeof $entryVal === 'object') {
          $root[$entryKey].seal()
        }
      }
      return Object.seal($root)
    }
  }
  // Set Prototype Of
  setPrototypeOf($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function setPrototypeOf($prototype) {
      return Object.setPrototypeOf($root, $prototype)
    }
  }
  // Values
  values($target, $property, $receiver) {
    const { $eventTarget, $root, $recur } = this.aliases
    return function values() {
      if($recur === false) return Object.values($root)
      const values = []
      for(const $rootVal of Object.values($root)) {
        if(typeof $rootVal === 'object') {
          values.push($rootVal.values())
        } else {
          values.push($rootVal)
        }
      }
      return values
    }
  }
}