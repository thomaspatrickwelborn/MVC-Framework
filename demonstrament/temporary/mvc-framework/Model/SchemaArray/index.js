import {
	typeOf, propFromPropPath,
	eventCallbackNameFromEventCallback,
	eventListenerArgumentsValid,
} from '../../Utils/index.js'

export default class Array {
  constructor() {}
  #_events = {}
  get #events() { return this.#_events }
  addEventListener($eventName, $eventCallback) {
  	if(eventListenerArgumentsValid(
  		$eventName, $eventCallback
		)) return
		let eventCallbackName = eventCallbackNameFromEventCallback($eventCallback)
		const _events = this.#_events
		_events[$eventName] = (
			_events[$eventName] === undefined
		) ? {}
		  : _events[$eventName]
		_events[$eventName][eventCallbackName] = (
			_events[$eventName][eventCallbackName] === undefined
		) ? []
		  : _events[$eventName][eventCallbackName]
		_events[$eventName][eventCallbackName]
		.push($eventCallback)

    return
  }
  removeEventListener($eventName, $eventCallback) {
  	if(eventListenerArgumentsValid(
  		$eventName, $eventCallback
		)) return
		let eventCallbackName = eventCallbackNameFromEventCallback($eventCallback)
		const _events = this.#_events
		if(
			_events[$eventName] === undefined ||
			_events[$eventName][eventCallbackName] === undefined
		) return
		const eventCallbacks = _events[$eventName][eventCallbackName]
		if(eventCallbackName === 'anonymous') {
			eventCallbacks.length = 0
		}
		let eventCallbacksIndex = eventCallbacks.length - 1
		while(eventCallbacksIndex > -1) {
			const eventCallback = eventCallbacks[eventCallbacksIndex]
			if(eventCallback === $eventCallback) {
				eventCallbacks.splice(eventCallbacksIndex, 1)
			}
			eventCallbacksIndex--
		}
		if(eventCallbacks.length === 0) delete _events[$eventName][eventCallbackName]
		if(Object.keys(_events[$eventName]).length === 0) delete _events[$eventName]
    return
  }
  dispatchEvent($eventName) {
  	const $arguments = [...arguments]
  	const event = $arguments.pop()
  	if(
  		!event instanceof Event ||
  		this.#_events[event.type] === undefined
		) return
  	for(const $callbacks of Object.values(this.#_events[event.type])) {
  		for(const $callback of $callbacks) {
	  		$callback(event, ...$arguments)
  		}
  	}
  	return
  }
}
