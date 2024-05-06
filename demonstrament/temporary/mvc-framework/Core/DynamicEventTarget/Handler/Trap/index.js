import DynamicEventTarget from '../index.js'
export default class Trap {
  constructor($aliases) {
    this.aliases = $aliases
  }
  #_aliases
  get aliases() { return this.#_aliases }
  set aliases($aliases) { this.#_aliases = $aliases }
  createBubbleEvent($event, $eventType, $property) {
    const path = [$event.detail.path]
    path.unshift($property)
    const eventDetailPath = path.join('.')
    const eventDetail = {
      key: $event.detail.key,
      val: $event.detail.val,
      path: eventDetailPath,
    }
    const event = new CustomEvent($eventType, {
      detail: eventDetail
    })
    const propEvent = new CustomEvent(`${$eventType}:${eventDetailPath}`, {
      detail: eventDetail
    })
    return {
      eventType: $eventType, 
      event, 
      propEvent, 
    }
  } 
  // Create Event
  createEvent($eventType, $property, $value) {
    const { $rootAlias } = this.aliases
    if(typeof $property === 'number') $property = String($property)
    if(typeof $value === 'object') $value = $value[$rootAlias]
    const eventDetail = {
      key: $property,
      val: $value,
      path: $property,
    }
    const event = new CustomEvent($eventType, {
      detail: eventDetail
    })
    const propEvent = new CustomEvent(`${$eventType}:${$property}`, {
      detail: eventDetail
    })
    return {
      eventType: $eventType, 
      event, 
      propEvent, 
      value: $value,
    }
  }
}