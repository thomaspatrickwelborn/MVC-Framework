import { Coutil } from 'core-plex'
const { typedObjectLiteral } = Coutil
export default class PropertyClass {
  constructor($settings, $core) {
    for(const [$propertyKey, $propertyValue] of Object.entries($settings)) {
      Object.defineProperty(this, $propertyKey, { value: $propertyValue })
    }
    const $this = this
    return new Proxy(typedObjectLiteral(this), {
      get($target, $property) {
        return $target[$property]
      },
      set($target, $property, $value) {
        $target[$property] = $this.instate($this, $property, $value)
        return true
      },
      deleteProperty($target, $property) {
        $this.deinstate($this, $property)
        delete $target[$property]
        return true
      },
    })
  }
}