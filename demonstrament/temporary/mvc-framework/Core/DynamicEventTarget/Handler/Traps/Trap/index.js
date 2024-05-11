import Events from './Events/index.js'
import DynamicEventTarget from '../../../index.js'
export default class Trap {
  constructor($aliases) {
    this.aliases = $aliases
  }
  #_aliases
  get aliases() { return this.#_aliases }
  set aliases($aliases) { this.#_aliases = $aliases }
  createEvent($eventTarget, $eventType, $event, $target) {
    const trailingArguments = [...arguments].slice(3)
    const event = new CustomEvent(
      $eventType, Event[$eventType]($event, $target)
    )
    $eventTarget.dispatchEvent(event, trailingArguments)
    return event
  }
}