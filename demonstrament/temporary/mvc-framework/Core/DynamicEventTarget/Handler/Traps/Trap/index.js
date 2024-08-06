import Events from '../Events/index.js'
export default class Trap {
  constructor($methods, $aliases, $options = {}) {
    for(let [
      $methodName, $definePropertyMethod
    ] of Object.entries($methods)) {
      const methodOptions = $options[$methodName]
      $definePropertyMethod(
        this, $methodName, $aliases, methodOptions
      )
    }
  }
  createEvent($eventTarget, $eventType, $event, $target) {
    const event = Events[$eventType]($event, $target)
    $eventTarget.dispatchEvent(event)
    return event
  }
}