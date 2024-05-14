
import DynamicEventTarget from '../../../index.js'
import Trap from '../Trap/index.js'
export default class MapTrap extends Trap {
  constructor($aliases) {
    super($aliases)
    Object.freeze(this)
  }
  get($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $rootAlias, $proxy } = this.aliases
    return function get() {
      const $arguments = [...arguments]
      // Get Object
      if($arguments.length === 0) {
        return $root
      } else
      // Get Property
      if($arguments.length === 1) {
        const property = $arguments[0]
        return $root[property]
      }
    }
  }
  set($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    return function set($property, $value) {
      if(typeof $value === 'object') {
        // Value Is Dynamic Event Target
        $value = new DynamicEventTarget($value, $rootAlias)
        // Dynamic Event Target Delete Event
        $value.addEventListener('delete', function eventBubbleDelete($event) {
          const deleteEvent = $eventTarget.createBubbleEvent(
            $event, 'delete', $property
          )
          $eventTarget.dispatchEvent(deleteEvent.event, $eventTarget)
          $eventTarget.dispatchEvent(deleteEvent.propEvent, $eventTarget)
        })
        // Dynamic Event Target Set Event
        $value.addEventListener('set', function eventBubbleSet($event) {
          const setEvent = $eventTarget.createBubbleEvent(
            $event, 'set', $property
          )
          $eventTarget.dispatchEvent(setEvent.event, $eventTarget)
          $eventTarget.dispatchEvent(setEvent.propEvent, $eventTarget)
        })
      }
      $root[$property] = $value
      // Dynamic Event Target Set Event
      const setEvent = $this.createEvent('set', $property, $value)
      $eventTarget.dispatchEvent(setEvent.event, $eventTarget)
      $eventTarget.dispatchEvent(setEvent.propEvent, $eventTarget)
      $root[$property] = $value
      return $root
    }
  }
  delete($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    return function () { // Function name "delete" generates Syntax Error 
      const $arguments = [...arguments]
      if($arguments.length === 0) {
        for(const [
          $deletePropKey, $deletePropVal
        ] of Object.entries($root)) {
          // 
          delete $root[$deletePropKey]
        }
      } else
      if($arguments.length === 1) {
        // 
        delete $root[$property]
      }
      const deleteEvent = $this.createEvent('delete', $property, $value)
      $eventTarget.dispatchEvent(deleteEvent.event, $eventTarget)
      $eventTarget.dispatchEvent(deleteEvent.propEvent, $eventTarget)
      delete this[$rootAlias][$property]
      return true
    }
  }
}