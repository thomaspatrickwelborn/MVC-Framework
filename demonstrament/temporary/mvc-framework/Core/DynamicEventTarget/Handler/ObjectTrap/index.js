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
        console.log()
      }
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