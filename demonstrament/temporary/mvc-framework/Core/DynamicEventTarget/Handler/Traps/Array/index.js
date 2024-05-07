import DynamicEventTarget from '../../../index.js'
import Trap from '../Trap/index.js'
// Array Traps Are Array Class Instance Methods
export default class ArrayTrap extends Trap {
  constructor($aliases) {
    super($aliases)
    Object.freeze(this)
  }
  /*

  // Length
  get length() {
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    return function length($target, $property, $value, $receiver) {
      const preterLength = $root[$property]
      const anterLength = $value
      const crement = (
        preterLength < anterLength
      ) ? 1
        : (
        preterLength > anterLength
      ) ? -1
        : 0
      const stopIndex = (
        anterLength === 0
      ) ? 0
        : anterLength - 1
      var elementIndex = (
        preterLength === 0
      ) ? 0
        : preterLength - 1
      // Decrement
      while(elementIndex !== stopIndex) {
        const eventType = (
          crement === -1
        ) ? 'deleteProperty'
          : 'set'
        const { event, propEvent } = $this.createEvent(
          eventType, elementIndex, $value
        )
        $eventTarget.dispatchEvent(event)
        $eventTarget.dispatchEvent(propEvent)
        elementIndex += crement
      }
      return $value
    }
  }
  */
  // Splice
  splice($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    return function splice($startIndex, $deleteCount) {
      var deleteIndex = $startIndex
      const deleteStopIndex = $startIndex + ($deleteCount - 1)
      while(deleteIndex <= deleteStopIndex) {
        const deleteEvent = $this.createEvent(
          'deleteProperty', deleteIndex, $root[deleteIndex]
        )
        $eventTarget.dispatchEvent(deleteEvent.event)
        $eventTarget.dispatchEvent(deleteEvent.propEvent)
        deleteIndex++
      }
      return $root[$property](...arguments)
    }
  }
  // Shift
  shift($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    return function shift() {
      const deleteIndex = 0
      const deleteEvent = $this.createEvent(
        'deleteProperty', deleteIndex, $root[deleteIndex]
      )
      $eventTarget.dispatchEvent(deleteEvent.event)
      $eventTarget.dispatchEvent(deleteEvent.propEvent)
      return $root[$property](...arguments)
    }
  }
  // Unshift
  unshift($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    return function unshift() {
      const $arguments = [...arguments]
      var addIndex = 0
      const addStopIndex = (
        $arguments.length === 0
      ) ? 0
        : $arguments.length - 1
      while(addIndex <= addStopIndex) {
        const addValue = $arguments[addIndex]
        const setEvent = $this.createEvent(
          'set', addIndex, addValue
        )
        $eventTarget.dispatchEvent(setEvent.event)
        $eventTarget.dispatchEvent(setEvent.propEvent)
        addIndex++
      }
      return $root[$property](...arguments)
    }
  }
  // Push
  push($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    return function push() {
      const $arguments = [...arguments]
      var addIndex = (
        $root.length === 0
      ) ? 0 
        : $root.length - 1
      const addStopIndex = addIndex + $arguments.length
      while(addIndex < addStopIndex) {
        const addValue = $arguments[addIndex]
        const setEvent = $this.createEvent(
          'set', addIndex, addValue
        )
        $eventTarget.dispatchEvent(setEvent.event)
        $eventTarget.dispatchEvent(setEvent.propEvent)
        addIndex++
      }
      return $root[$property](...arguments)
    }
  }
  // Pop
  pop($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    return function pop() {
      const deleteIndex = $root.length - 1
      const deleteEvent = $this.createEvent(
        'deleteProperty', deleteIndex, $root[deleteIndex]
      )
      $eventTarget.dispatchEvent(deleteEvent.event)
      $eventTarget.dispatchEvent(deleteEvent.propEvent)
      return $root[$property](...arguments)
    }
  }
  // Fill
  fill($target, $property, $receiver) {
    const $this = this
    const { $eventTarget, $root, $rootAlias } = this.aliases
    return function fill($value, $start, $end) {
      $start = $start || 0
      $end = $end || $start + ($root.length - 1)
      var addIndex = $start
      while(addIndex <= $end) {
        const setEvent = $this.createEvent(
          'set', addIndex, $value
        )
        $eventTarget.dispatchEvent(setEvent.event)
        $eventTarget.dispatchEvent(setEvent.propEvent)
        addIndex++
      }
      return $root[$property](...arguments)
    }
  }
}