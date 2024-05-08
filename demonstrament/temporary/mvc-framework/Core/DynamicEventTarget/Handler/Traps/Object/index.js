import DynamicEventTarget from '../../../index.js'
import Trap from '../Trap/index.js'
// Object Traps Are Object Class Static Methods

export default class ObjectTrap extends Trap {
  constructor($aliases) {
    super($aliases)
    Object.freeze(this)
  }
  // Assign - Recur
  // Assign Type Of Object Property Values As Dynamic Event Target Instances
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
                rootAlias: $rootAlias,
                recur: $recur,
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
  // Assign Type Of Object Property Values As Dynamic Event Target Instances
  defineProperties($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $rootAlias, $recur } = this.aliases
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
              recur: $recur,
            }
          )
        }
      }
      return Object.defineProperties($root, $props)
    }
  }
  // Define Property
  // Assign Type Of Object Property Values As Dynamic Event Target Instances
  defineProperty($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $rootAlias, $recur } = this.aliases
    return function defineProperty($property, $descriptor) {
      if(typeof $descriptor.value === 'object') {
        $descriptor.value = new DynamicEventTarget(
          $descriptor.value, {
            rootAlias: $rootAlias,
            recur: $recur,
          }
        )
      }
      return Object.defineProperty($root, $property, $descriptor)
    }
  }
  // Entries - Recur
  entries($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $recur, $rootAlias } = this.aliases
    return function entries() {
      if($recur === false) return Object.entries($root)
      const entries = []
      iterateRootEntries: 
      for(var [
        $rootEntryKey, $rootEntryVal
      ] of Object.entries($root)) {
        if(typeof $rootEntryVal === 'object') {
          $rootEntryVal = $rootEntryVal.entries()
        }
        entries.push([$rootEntryKey, $rootEntryVal])
      }
      return entries
    }
  }
  // Freeze - Recur
  freeze($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function freeze() {
      return Object.freeze($root)
    }
  }
  // From Entries - Recur
  fromEntries($target, $property, $receiver) {
    const { $eventTarget, $root, $recur } = this.aliases
    return function fromEntries() {
      if($recur === false) return Object.fromEntries(
        Object.entries($root)
      )
      const entries = []
      iterateRootProps:
      for(var [
        $rootPropKey, $rootPropVal
      ] of Object.entries($root)) {
        if(typeof $rootPropVal === 'object') {
          $rootPropVal = $rootPropVal.fromEntries()
        }
        entries.push([$rootPropKey, $rootPropVal])
      }
      return Object.fromEntries(entries)
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
    const { $eventTarget, $root } = this.aliases
    return function getOwnPropertyDescriptors() {
      return Object.getOwnPropertyDescriptors($root)
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
  // Group By (Unknown Recurse)
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
  // Is Frozen - Recur
  isFrozen($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function isFrozen() {
      return Object.isFrozen($root)
    }
  }
  // Is Sealed - Recur
  isSealed($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function isSealed() {
      return Object.isSealed($root)
    }
  }
  // Keys - Recur
  keys($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function keys() {
      return Object.keys($root)
    }
  }
  // Prevent Extensions
  preventExtensions($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function preventExtensions() {
      return Object.preventExtensions($root)
    }
  }
  // Seal - Recur
  seal($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function seal() {
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
  // Values - Recur
  values($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function values() {
      return Object.values($root)
    }
  }
}