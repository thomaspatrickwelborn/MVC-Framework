import { typeOf, parseShortenedEvents } from '../Utils/index.js'

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
	addEvents($events = {}, $enable = false) {
		const _events = this.#_events
		for(var [
			$propPath, $propPathEvents
		] of Object.entries($events)) {
			$propPathEvents = parseShortenedEvents($propPathEvents)
			_events[$propPath] = _events[$propPath] || []
			_events[$propPath] = _events[$propPath].concat($propPathEvents)
		}
		if($enable === true) this.enableEvents($events)
		return this
	}
	removeEvents($events) {
		$events = $events || this.events
		const _events = this.#_events
		for(var [
			$propPath, $propPathEvents
		] of Object.entries($events)) {
			$propPathEvents = parseShortenedEvents($propPathEvents)
			for(const $propPathEvent of $propPathEvents) {
				const removeEventIndex = _events[$propPath]
				.findIndex(($event) => (
						$event.type === $propPathEvent.type &&
						$event.callback === $propPathEvent.callback
					))
				_events[$propPath].splice(removeEventIndex, 1)
			}
		}
		this.disableEvents($events)
		return this
	}
	enableEvents($events) {
		return this.toggleEvents('addEventListener', $events)
	}
	disableEvents($events) {
		return this.toggleEvents('removeEventListener', $events)
	}
	toggleEvents($eventListenerMethod, $events) {
		const enability = (
			$eventListenerMethod === 'addEventListener'
		) ? true
		  : (
	  	$eventListenerMethod === 'removeEventListener'
  	) ? false
		  : undefined
	  if(enability === undefined) return this
		$events = $events || this.events
		iteratePropPaths: for(var [
			$propPath, $propEvents
		] of Object.entries($events)) {
			$propEvents = parseShortenedEvents($propEvents)
			const prop = $propPath.split('.')
			.reduce(($prop, $propPathFrag) => $prop[$propPathFrag], this)
			iteratePropEvents: for(const $propEvent of $propEvents) {
				if($propEvent.enabled === enability) continue iteratePropEvents
				if(prop instanceof NodeList) {
					for(const $prop of prop) {
						$prop[$eventListenerMethod]($propEvent.type, $propEvent.callback)
					}
				} else if(prop instanceof EventTarget) {
					prop[$eventListenerMethod]($propEvent.type, $propEvent.callback)
				}
				$propEvent.enabled = enability
			}
		}
		return this
	}
}