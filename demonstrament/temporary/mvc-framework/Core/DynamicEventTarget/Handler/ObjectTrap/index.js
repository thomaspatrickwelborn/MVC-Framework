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
      const $sources = [...arguments]
      for(const $source of $sources) {
        for(var [
          $sourceKey, $sourceVal
        ] of Object.entries($source)) {
          if(typeof $sourceVal === 'object') {
            $sourceVal = new DynamicEventTarget($sourceVal)
          }
          const setEvent = $this.createEvent(
            'set', $sourceKey, $sourceVal
          )
          $eventTarget.dispatchEvent(setEvent.event)
          $eventTarget.dispatchEvent(setEvent.propEvent)
          $root[$sourceKey] = $sourceVal
        }
      }
      return $root
    }
  }
  defineProperties($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root } = this.aliases
    return function defineProperties($props) {
      for(var [
        $property, $descriptor
      ] of Object.entries($props)) {
        const propertyDescriptor = {}
        for(const [
          $descriptorProperty, $descriptorValue
        ] of Object.entries($descriptor)) {
          propertyDescriptor[$descriptorProperty] = $descriptorValue
        }
        if(typeof propertyDescriptor.value === 'object') {
          propertyDescriptor.value = new DynamicEventTarget(propertyDescriptor.value)
        }
        const setEvent = $this.createEvent(
          'set', $property, propertyDescriptor.value
        )
        $eventTarget.dispatchEvent(setEvent.event)
        $eventTarget.dispatchEvent(setEvent.propEvent)
        Object.defineProperty($root, $property, propertyDescriptor)
      }
      return $root
    }
  }
  defineProperty($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $proxy } = this.aliases
    return function defineProperty($property, $descriptor) {
      const propertyDescriptor = {}
      for(const [
        $descriptorProperty, $descriptorValue
      ] of Object.entries($descriptor)) {
        propertyDescriptor[$descriptorProperty] = $descriptorValue
      }
      if(typeof propertyDescriptor.value === 'object') {
        propertyDescriptor.value = new DynamicEventTarget(propertyDescriptor.value)
      }
      const setEvent = $this.createEvent(
        'set', $property, propertyDescriptor.value
      )
      $eventTarget.dispatchEvent(setEvent.event)
      $eventTarget.dispatchEvent(setEvent.propEvent)
      Object.defineProperty($root, $property, propertyDescriptor)
      return $root
    }
  }
  create($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    return function create($propertiesObject = {}) {
      return Object.create($root, $propertiesObject)
    }
  }
}