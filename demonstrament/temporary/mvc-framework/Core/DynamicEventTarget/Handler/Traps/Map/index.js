
import DynamicEventTarget from '../../../index.js'
import Trap from '../Trap/index.js'
export default class MapTrap extends Trap {
  constructor($aliases) {
    super($aliases)
    const $this = this
    const { $root, $rootAlias } = this.aliases
    for(let $mapPrototypePropertyName of Object.getOwnPropertyNames(
      Map.prototype
    )) { switch($mapPrototypePropertyName) {
      case 'clear':
      case 'delete':
      case 'entries':
      case 'forEach':
      case 'get':
      case 'has':
      case 'keys':
      case 'set':
      case 'values':
      default: Object.defineProperty(
        this, $mapPrototypePropertyName, {
        get() {
          if(typeof $root[$mapPrototypePropertyName] === 'function') {
            return function () {
              return $root[$mapPrototypePropertyName](...arguments)
            }
          }
          return $root[$mapPrototypePropertyName]
        },
      })
      break
    }}
  }
}