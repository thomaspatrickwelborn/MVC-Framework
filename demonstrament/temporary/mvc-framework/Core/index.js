import {
	typeOf, parseShortenedPropEvents
} from '../Utils/index.js'

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
	#_events = []
	get events() { return this.#_events }
	set events($events) { this.addEvents($events) }
	addEvents($events = {}, $enable = false) {
	const _events = this.#_events
	const events = []
	var $propEvents = $events
		if(typeOf($propEvents) === 'object') {
			$propEvents = parseShortenedPropEvents($propEvents)
		}
		iteratePropEvents: for(
			const $propEvent of $propEvents
		) {
			$propEvent.enabled = false
			_events.push($propEvent)
			events.push($propEvent)
		}
		if($enable === true) this.enableEvents($events)
		return this
	}
	removeEvents($events = {}) {
		const _events = this.#_events
		const events = []
		var $propEvents = $events
		if(typeOf($propEvents) === 'object') {
			$propEvents = parseShortenedPropEvents($propEvents)
		}
		const propEventsLength = $propEvents.length
		var propEventsIndex = 0
		while(propEventsIndex < propEventsLength) {
			const propEvent = $propEvents[propEventsIndex]
			const eventsLength = _events.length
			var eventsIndex = eventsLength - 1
			while(eventsIndex > -1) {
				const _event = _events[eventsIndex]
				if(
					_event.name === propEvent.name &&
					_event.target === propEvent.target &&
					_event.callback === propEvent.callback
				) {
					events.push(
						..._events.splice(eventsIndex, 1)
					)
				}
				eventsIndex--
			}
			propEventsIndex++
		}
		this.disableEvents($events)
		return this
	}
}