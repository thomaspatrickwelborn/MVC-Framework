import { typeOf } from '../Utils/index.js'
import parseShortenedPropEvents from './parseShortenedPropEvents.js'

export default class Core extends EventTarget {
	constructor($settings = {}) { super() }
	#_events = {}
	get events() { return this.#_events }
	set events($events) { this.addEvents($events) }
	addEvents($events = {}) {
		const _events = this.#_events
		iterateProps: for(var [
			$propName, $propEvents
		] of Object.entries($events)) {
			if(typeOf($propEvents) === 'object') {
				$propEvents = parseShortenedPropEvents($propEvents)
			}

			iteratePropEvents: for(
				const $propEvent of $propEvents
			) {
				$propEvent.enabled = false
				_events[$propName] = _events[$propName] || []
				_events[$propName].push($propEvent)
			}
		}
		return this
	}
	removeEvents($events = {}) {
		const _events = this.#_events
		for(var [
			$propName, $propEvents
		] of Object.entries($events)) {
			if(typeOf($propEvents) === 'object') {
				$propEvents = parseShortenedPropEvents($propEvents)
			}
			const propEventsLength = $propEvents.length
			var propEventsIndex = 0
			while(propEventsIndex < propEventsLength) {
				const propEvent = $propEvents[propEventsIndex]
				const eventsLength = _events[$propName].length
				var eventsIndex = eventsLength - 1
				while(eventsIndex > -1) {
					const _event = _events[$propName][eventsIndex]
					if(
						_event.name === propEvent.name &&
						_event.target === propEvent.target &&
						_event.callback === propEvent.callback
					) {
						_events[$propName].splice(eventsIndex, 1)
					}
					eventsIndex--
				}
				propEventsIndex++
			}
		}
		return this
	}
	enableEventListeners($events) {
		$events = $events || this.events
		iterateProps: for(const [
			$propName, $propEvents
		] of Object.entries($events)) {
			iteratePropEvents: for(const $propEvent of $propEvents) {
				let prop = this[$propName]
				const propEventTargetKeys = $propEvent.target.split('.')
				iteratePropEventTargetKeys: for(
					const $propEventTargetKey of propEventTargetKeys
				) {
					if($propEventTargetKey === ':scope') {
						continue iteratePropEventTargetKeys
					}
					prop = prop[$propEventTargetKey]
				}
				if($propEvent.enabled === true) {
					continue iteratePropEvents
				}
				if(prop instanceof NodeList) {
					for(const $prop of prop) {
						$prop.addEventListener(
							$propEvent.name, 
							$propEvent.callback,
						)
					}
				} else {
					prop.addEventListener(
						$propEvent.name, 
						$propEvent.callback,
					)
				}
				$propEvent.enabled = true
			}
		}
		return this
	}
	disableEventListeners($events) {
		$events = (
			$events === undefined
		) ? this.events
		  : $events
		iterateProps: for(const [
			$propName, $propEvents
		] of Object.entries(this.events)) {
			iteratePropEvents: for(const $propEvent of $propEvents) {
				let prop = this[$propName]
				const propEventTargetKeys = $propEvent.target.split('.')
				iteratePropEventTargetKeys: for(
					const $propEventTargetKey of propEventTargetKeys
				) {
					if($propEventTargetKey === ':scope') {
						continue iteratePropEventTargetKeys
					}
					prop = prop[$propEventTargetKey]
				}
				if($propEvent.enabled === false) {
					continue iteratePropEvents
				}
				if(prop instanceof NodeList) {
					for(const $prop of prop) {
						$prop.removeEventListener(
							$propEvent.name, 
							$propEvent.callback,
						)
					}
				} else {
					prop.removeEventListener(
						$propEvent.name, 
						$propEvent.callback,
					)
				}
				$propEvent.enabled = false
			}
		}
		return this
	}
}