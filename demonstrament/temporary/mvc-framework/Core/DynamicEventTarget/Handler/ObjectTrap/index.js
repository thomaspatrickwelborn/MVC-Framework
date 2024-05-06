import DynamicEventTarget from '../../index.js'
import Trap from '../Trap/index.js'
export default class ObjectTrap extends Trap {
  constructor($aliases) {
    super($aliases)
    Object.freeze(this)
  }
  assign($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
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
    const { $eventTarget, $root, $rootAlias } = this.aliases
    return function defineProperties() {

    }
  }
  defineProperty($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    return function defineProperty() {

    }
  }
}