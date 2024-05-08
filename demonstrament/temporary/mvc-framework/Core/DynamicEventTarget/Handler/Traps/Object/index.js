import DynamicEventTarget from '../../../index.js'
import Trap from '../Trap/index.js'
// Object Traps Are Object Class Static Methods

export default class ObjectTrap extends Trap {
  constructor($aliases) {
    super($aliases)
    Object.freeze(this)
  }
  // Assign (Recurse)
  assign($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $recur, $rootAlias } = this.aliases
    return function assign($prop) {
      if($recur === false) return Object.assign($root, ...arguments)
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
  // Create (Unknown Recurse)
  create($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root } = this.aliases
    return function create($propertiesObject = {}) {
      return Object.create($root, $propertiesObject)
    }
  }
  // Define Properties (Unknown Recurse)
  defineProperties($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root } = this.aliases
    return function defineProperties($props) {
      return Object.defineProperties($root, $props)
    }
  }
  // Define Property (Unknown Recurse)
  defineProperty($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root } = this.aliases
    return function defineProperty($property, $descriptor) {
      return Object.defineProperty($root, $property, $descriptor)
    }
  }
  // Entries (Recurse)
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
  // Freeze (Recurse)
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
  // From Entries (Recurse)
  fromEntries($target, $property, $receiver) {
    const { $eventTarget, $root, $recurse } = this.aliases
    return function fromEntries() {
      if($recurse === false) return Object.fromEntries(Object.entries($root))
      const fromEntries = {}
      for(var [
        $rootKey, $rootVal
      ] of Object.entries($root)) {
        if(typeof $rootVal === 'object') {
          $rootVal = $rootVal.fromEntries()
        }
        fromEntries[$rootKey] = $rootVal
      }
      return fromEntries
    }
  }
  // Get Own Property Descriptor (No Recurse)
  getOwnPropertyDescriptor($target, $property, $receiver) {
    const { $eventTarget, $root, $recur } = this.aliases
    return function getOwnPropertyDescriptor($prop) {
      return Object.getOwnPropertyDescriptor($root, $prop)
    }
  }
  // Get Own Property Descriptors (No Recurse)
  getOwnPropertyDescriptors($target, $property, $receiver) {
    const { $eventTarget, $root, $recur } = this.aliases
    return function getOwnPropertyDescriptors() {
      return Object.getOwnPropertyDescriptors($root)
    }
  }
  // Get Own Property Names (No Recurse)
  getOwnPropertyNames($target, $property, $receiver) {
    const { $eventTarget, $root, $recurse } = this.aliases
    return function getOwnPropertyNames() {
      return Object.getOwnPropertyNames($root)
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
  // Prevent Extensions (Unknown Recurse)
  preventExtensions($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function preventExtensions() {
      return Object.preventExtensions($root)
    }
  }
  // Seal (Recurse)
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
  // Set Prototype Of (No Recurse)
  setPrototypeOf($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function setPrototypeOf($prototype) {
      return Object.setPrototypeOf($root, $prototype)
    }
  }
  // Values (Recurse)
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