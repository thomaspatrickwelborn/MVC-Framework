import Events from '../Events/index.js'
export default class Trap {
  constructor($methods, $aliases) {
    for(let [
      $methodName, $definePropertyMethod
    ] of Object.entries($methods)) {
      $definePropertyMethod(
        this, $methodName, $aliases
      )
    }
  }
  createEvent($eventTarget, $eventType, $event, $target) {
    const event = Events[$eventType]($event, $target)
    $eventTarget.dispatchEvent(event)
    return event
  }
}