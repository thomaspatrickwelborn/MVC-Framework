import { typeOf, parseShortenedEvents } from '../../Utils/index.js'
import Event from './Event/index.js'
export default class EventSystem extends EventTarget {
  constructor($events, $enable) {
    super()
    this.events = $events
  }
  #_events = []
  get events() { return this.#_events }
  set events($events) { this.addEvents($events) }
  #addExpandedEvents($events, $enable) {
  	const _events = this.events
  	for(const $event of $events) {
  		Object.assign($event, {
  			context: this,
  			enable: $event.enable || $enable,
  		})
  		_events.push(new Event($event))
  	}
  	return this
  }
  #addImpandedEvents($events, $enable) {
  	const _events = this.events
    for(const [
      $eventTargetSettings, $eventCallback
    ] of Object.entries($events)) {
      const eventTargetSettings = $eventTargetSettings.split(' ')
      var eventTargetPath, eventType
      if(eventTargetSettings.length === 1) {
        eventTargetPath = ':scope'
        eventType = eventTargetSettings[0]
      } else if(eventTargetSettings.length === 2) {
        eventTargetPath = eventTargetSettings[0]
        eventType = eventTargetSettings[1]
      }
      const typeOfEventCallback = typeOf($eventCallback)
      if(typeOfEventCallback === 'function') {
      	let event = new Event({
      		context: this,
          type: eventType,
          target: eventTargetPath,
          callback: $eventCallback,
          enable: $enable,
        })
        _events.push(event)
      } else if(typeOfEventCallback === 'array') {
        for(const $eventCallbackFunction of $eventCallback) {
        	let event = new Event({
        		context: this,
            type: eventType,
            target: eventTargetPath,
            callback: $eventCallbackFunction,
            enable: $enable,
          })
          _events.push(event)
        }
      }
    }
    return this
  }
  addEvents($events = {}, $enable = false) {
    const _events = this.events
    const typeOfEvents = typeOf($events)
    // Type Of Events Is Array
    if(typeOfEvents === 'array') {
    	return this.#addExpandedEvents($events, $enable)
    } else
    // Type Of Events Is Object
    if(typeOfEvents === 'object') {
    	return this.#addImpandedEvents($events, $enable)
    }
  }
  #removeExpandedEvents($events) {
  	const _events = this.events
    $events = $events || _events
  	let eventsIndex = _events.length - 1
  	while(eventsIndex > -1) {
  		const event = _events[eventsIndex]
  		const removeEventIndex = $events.findIndex(
  			($event) => (
  				$event.type === event.settings.type &&
  				$event.target === event.settings.target &&
  				$event.callback === event.settings.callback
				)
			)
			if(removeEventIndex !== -1) _events.splice(eventsIndex, 1)
			eventsIndex--
  	}
  	return this
  }
  #removeImpandedEvents($events) {
  	const _events = this.events
    $events = $events || _events
    iterateEvents: for(const [
    	$eventTargetSettings, $eventCallback
  	] of Object.entries($events)) {
    	const eventTargetSettings = $eventTargetSettings.split(' ')
	    var eventTargetPath, eventType
	    if(eventTargetSettings.length === 1) {
        eventTargetPath = ':scope'
        eventType = eventTargetSettings[0]
      } else if(eventTargetSettings.length === 2) {
        eventTargetPath = eventTargetSettings[0]
        eventType = eventTargetSettings[1]
      }
      const typeOfEventCallback = typeOf($eventCallback)
    	let eventsIndex = _events.length - 1
    	while(eventsIndex > -1) {
    		const event = _events[eventsIndex]
    		if(typeOfEventCallback === 'function') {
	    		if(
	      		event.settings.type === eventType &&
	      		event.settings.target === eventTargetPath &&
	      		event.settings.callback === $eventCallback
	      	) {
			  		_events[eventsIndex].enable = false
	    			_events.splice(eventsIndex, 1)
	      	}
    		} else if(typeOfEventCallback === 'array') {
    			for(const $eventCallbackFunction of $eventCallback) {
	        	if(
		      		event.settings.type === eventType &&
		      		event.settings.target === eventTargetPath &&
		      		event.settings.callback === $eventCallbackFunction
		      	) {
				  		_events[eventsIndex].enable = false
		    			_events.splice(eventsIndex, 1)
		      	}
	        }
    		}
    		eventsIndex--
    	}
  	}
  	return this
  }
  removeEvents($events = {}) {
    const typeOfEvents = typeOf($events)
    // Type Of Events Is Array
    if(typeOfEvents === 'array') {
    	return this.#removeExpandedEvents($events)
    } else
    // Type Of Events Is Object
    if(typeOfEvents === 'object') {
    	return this.#removeImpandedEvents($events)
    }
  }
  enableEvents($events) {
    return this.#toggleEventAbility('addEventListener', $events)
  }
  disableEvents($events) {
    return this.#toggleEventAbility('removeEventListener', $events)
  }
  #toggleEventAbility($eventListenerMethod, $events) {
    const enability = (
      $eventListenerMethod === 'addEventListener'
    ) ? true
      : (
      $eventListenerMethod === 'removeEventListener'
    ) ? false
      : undefined
    if(enability === undefined) return this
    $events = $events || this.events
    iterateEvents: for(const $event of $events) {
      $event.enable = enability
    }
    return this
  }
}