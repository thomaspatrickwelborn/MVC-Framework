import DynamicEventTarget from '../../../index.js'
import Trap from '../Trap/index.js'
// Array Traps Are Array Class Instance Methods
export default class ArrayTrap extends Trap {
  constructor($aliases) {
    super($aliases)
    Object.freeze(this)
  }
  // Splice
  splice($target, $property, $receiver) {
    const $this = this
    const { $root } = this.aliases
    return function splice() {
      return $root.splice(...arguments)
    }
  }
  // Shift
  shift($target, $property, $receiver) {
    const $this = this
    const { $root } = this.aliases
    return function shift() {
      return $root.shift(...arguments)
    }
  }
  // Unshift
  unshift($target, $property, $receiver) {
    const $this = this
    const { $root } = this.aliases
    return function unshift() {
      return $root.unshift(...arguments)
    }
  }
  // Push
  push($target, $property, $receiver) {
    const $this = this
    const { $root } = this.aliases
    return function push() {
      return $root.push(...arguments)
    }
  }
  // Pop
  pop($target, $property, $receiver) {
    const $this = this
    const { $root } = this.aliases
    return function pop() {
      return $root.pop(...arguments)
    }
  }
  // Fill
  fill($target, $property, $receiver) {
    const $this = this
    const { $root } = this.aliases
    return function fill($value, $start, $end) {
      return $root.fill(...arguments)
    }
  }
}