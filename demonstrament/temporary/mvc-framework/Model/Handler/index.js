export default class Handler {
  #DynamicEventTargetPropertyNames = [].concat(
    Object.getOwnPropertyNames(Object.prototype),
    Object.getOwnPropertyNames(Array.prototype),
    Object.getOwnPropertyNames(Map.prototype),
    Object.getOwnPropertyNames(Object),
    Object.getOwnPropertyNames(Array),
    Object.getOwnPropertyNames(Map),
  )

  constructor($aliases, $options) {
    this.#aliases = $aliases
    return this
  }
  #aliases
  // Get
  get get() {
    const $this = this
    const {
      $core, $rootAlias, $root, $schema, $validate
    } = this.#aliases
    return function get($target, $property) {
      if($property === $rootAlias) return $root
      if(
        $this.#DynamicEventTargetPropertyNames
        .includes($property)
      ) {
        return $root[$property]
      }
      return $core[$property]
    }
  }
  get set() {
    const $this = this
    const {
      $core, $rootAlias, $root, $schema, $validate
    } = this.#aliases
    return function set($target, $property, $value) {
      if(
        $this.#DynamicEventTargetPropertyNames
        .includes($property)
      ) {
        $root[$property] = $value
      }
      return true
    }
  }
  get deleteProperty() {
    const $this = this
    const {
      $core, $rootAlias, $root, $schema, $validate
    } = this.#aliases
    return function deleteProperty($target, $property) {
      if(
        $this.#DynamicEventTargetPropertyNames
        .includes($property)
      ) {
        delete $root[$property]
      }
      return true
    }
  }
}