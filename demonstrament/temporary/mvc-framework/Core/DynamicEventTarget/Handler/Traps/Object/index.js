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
  // Define Properties - Recur
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
  // Define Property - Recur
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
    const { $eventTarget, $root, $recur, $rootAlias } = this.aliases
    return function freeze() {
      if($recur === false) return Object.freeze($root)
      iterateRootProps:
      for(var $rootPropVal of Object.values($root)) {
        if(typeof $rootPropVal === 'object') {
          $rootPropVal.freeze()
        }
      }
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
  // Get Own Property Descriptor - Recur
  getOwnPropertyDescriptor($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function getOwnPropertyDescriptor($prop) {
      return Object.getOwnPropertyDescriptor($root, $prop)
    }
  }
  // Get Own Property Descriptors - Recur
  getOwnPropertyDescriptors($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function getOwnPropertyDescriptors() {
      return Object.getOwnPropertyDescriptors($root)
    }
  }
  // Get Own Property Names - Recur
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
  // Get Prototype Of - Recur
  getPrototypeOf($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function getPrototypeOf() {
      return Object.getPrototypeOf($root)
    }
  }
  // Group By - Unknown Recur
  groupBy($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function groupBy(callbackFn) {
      return Object.groupBy($root, callbackFn)
    }    
  }
  // Has Own - Unknown Recur
  hasOwn($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function hasOwn($prop) {
      return Object.hasOwn($root, $prop)
    }
  }
  // Is - Unknown Recur
  is($target, $property, $receiver) {
    const { $eventTarget, $root } = this.aliases
    return function is($value) {
      return Object.is($root, $value)
    }
  }
  // Is Extensible - Recur
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
    const { $eventTarget, $root, $recur, $rootAlias } = this.aliases
    return function keys() {
      if($recur === false) return Object.keys($root)
      const keys = []
      iterateRootEntries:
      for(var [
        $rootPropKey, $rootPropVal
      ] of Object.entries($root)) {
        if(typeof $rootPropVal === 'object') {
          $rootPropVal = $rootPropVal.keys()
          keys.push([$rootPropKey, $rootPropVal])
          continue iterateRootEntries
        }
        keys.push($rootPropKey)
      }
      return keys
    }
  }
  // Prevent Extensions - Recur
  preventExtensions($target, $property, $receiver) {
    const { $eventTarget, $root, $recur, $rootAlias } = this.aliases
    return function preventExtensions() {
      if($recur === false) return Object.preventExtensions($root)
      iterateRootProps:
      for(var $rootPropVal of Object.values($root)) {
        if(typeof $rootPropVal === 'object') {
          $rootPropVal.preventExtensions()
        }
      }
      return Object.preventExtensions($root)
    }
  }
  // Seal - Recur
  seal($target, $property, $receiver) {
    const { $eventTarget, $root, $recur, $rootAlias } = this.aliases
    return function seal() {
      if($recur === false) return Object.seal($root)
      iterateRootProps:
      for(var $rootPropVal of Object.values($root)) {
        if(typeof $rootPropVal === 'object') {
          $rootPropVal.seal()
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
  // Values - Recur
  values($target, $property, $receiver) {
    const { $eventTarget, $root, $recur, $rootAlias } = this.aliases
    return function values() {
      if($recur === false) return Object.values($root)
      const values = []
      iterateRootEntries:
      for(var $rootPropVal of Object.values($root)) {
        if(typeof $rootPropVal === 'object') {
          $rootPropVal = $rootPropVal.values()
        }
        values.push($rootPropVal)
      }
      return values
    }
  }
}