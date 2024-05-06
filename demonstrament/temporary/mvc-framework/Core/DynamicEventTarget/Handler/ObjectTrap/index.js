import Trap from '../Trap/index.js'
export default class ObjectTrap extends Trap {
  constructor($aliases) {
    super($aliases)
    Object.freeze(this)
  }
  get($target, $property, $receiver) {
    const { $this, $root, $rootAlias, $proxy } = this.aliases
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
    const { $this, $root, $rootAlias } = this.aliases
    return function set($property, $value) {
      if(typeof $value === 'object') {
        // Value Is Dynamic Event Target
        $value = new DynamicEventTarget($value, $rootAlias)
        // Dynamic Event Target Delete Event
        $value.addEventListener('deleteProperty', function eventBubbleDelete($event) {
          const deleteEvent = $this.createBubbleEvent(
            $event, 'deleteProperty', $property
          )
          $this.dispatchEvent(deleteEvent.event, $this)
          $this.dispatchEvent(deleteEvent.propEvent, $this)
        })
        // Dynamic Event Target Set Event
        $value.addEventListener('set', function eventBubbleSet($event) {
          const setEvent = $this.createBubbleEvent(
            $event, 'set', $property
          )
          $this.dispatchEvent(setEvent.event, $this)
          $this.dispatchEvent(setEvent.propEvent, $this)
        })
      }
      $root[$property] = $value
      // Dynamic Event Target Set Event
      const setEvent = $this.createEvent('set', $property, $value)
      $this.dispatchEvent(setEvent.event, $this)
      $this.dispatchEvent(setEvent.propEvent, $this)
      $root[$property] = $value
      return $root
    }
  }
  deleteProperty($target, $property, $receiver) {
    const { $this, $root, $rootAlias } = this.aliases
    return function deleteProperty() {
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
      const deletePropertyEvent = $this.createEvent('delete', $property, $value)
      $this.dispatchEvent(deletePropertyEvent.event, $this)
      $this.dispatchEvent(deletePropertyEvent.propEvent, $this)
      delete this[$rootAlias][$property]
      return true
    }
  }
}