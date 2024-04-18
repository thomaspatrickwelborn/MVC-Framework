import { typeOf } from '../Utils/index.js'
import parseShortenedPropEvents from './parseShortenedPropEvents.js'

export default class Core extends EventTarget {
	constructor($settings = {}, $options = {}) {
		super()
		this.options = $options
		this.settings = $settings
		this.events = $settings.events
	}
	#_settings = {}
	get settings() { return this.#_settings }
	set settings($settings) {
		const _settings = this.#_settings
		for(const [
			$settingKey, $settingVal
		] of Object.entries($settings)) {
			_settings[$settingKey] = $settingVal
		}
	}
	#_options = {}
	get options() { return this.#_options }
	set options($options) {
		const _options = this.#_options
		for(const [
			$optionKey, $optionVal
		] of Object.entries($options)) {
			_options[$optionKey] = $optionVal
		}
	}
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
	enableEvents($events) {
		$events = $events || this.events
		iterateProps: for(var [
			$propName, $propEvents
		] of Object.entries($events)) {
			if(typeOf($propEvents) === 'object') {
				$propEvents = parseShortenedPropEvents($propEvents)
			}
			iteratePropEvents: for(
				const $propEvent of $propEvents
			) {
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
				if(
					prop instanceof EventTarget ||
					prop instanceof NodeList
				) {
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
				}
				$propEvent.enabled = true
			}
		}
		return this
	}
	disableEvents($events) {
		$events = $events || this.events
		iterateProps: for(var [
			$propName, $propEvents
		] of Object.entries($events)) {
			if(typeOf($propEvents) === 'object') {
				$propEvents = parseShortenedPropEvents($propEvents)
			}
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
				if(
					prop instanceof EventTarget ||
					prop instanceof NodeList
				) {
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
				}
				$propEvent.enabled = false
			}
		}
		return this
	}
}