import { typeOf, parseShortenedEvents } from '../Coutil/index.js'
import CoreEvent from './Event/index.js'
const Settings = {}
const Options = {
  validSettings: [],
}
export default class Core extends EventTarget {
  constructor($settings = {}, $options = {}) {
    super()
    this.options = Object.assign({}, Options, $options)
    this.settings = Object.assign({}, Settings, $settings)
    for(const $validSetting of this.options.validSettings) {
      Object.defineProperty(
        this, $validSetting, { value: this.settings[$validSetting] },
      )
    }
    this.addEvents(this.settings.events)
  }
  #_events = []
  get events() { return this.#_events }
  addEvents($events = {}, $enable = false) {
    const _events = this.events
    for(const $event of parseShortenedEvents($events)) {
      Object.assign($event, {
        context: this,
        enable: $event.enable || $enable,
      })
      _events.push(new CoreEvent($event))
    }
  }
  removeEvents($events = {}) {
    const _events = this.events
    $events = parseShortenedEvents($events) || _events
    let eventsIndex = _events.length - 1
    while(eventsIndex > -1) {
      const event = _events[eventsIndex]
      const removeEventIndex = $events.findIndex(
        ($event) => (
          $event.type === event.type &&
          $event.target === event.path &&
          $event.callback === event.callback
        )
      )
      if(removeEventIndex !== -1) _events.splice(eventsIndex, 1)
      eventsIndex--
    }
  }
  enableEvents($events) {
    $events = (typeof $events === 'object')
      ? parseShortenedEvents($events)
      : this.events
    return this.#toggleEventAbility('addEventListener', $events)
  }
  disableEvents($events) {
    $events = (typeof $events === 'object')
      ? parseShortenedEvents($events)
      : this.events
    return this.#toggleEventAbility('removeEventListener', $events)
  }
  #toggleEventAbility($eventListenerMethod, $events) {
    const enability = ($eventListenerMethod === 'addEventListener')
      ? true
      : ($eventListenerMethod === 'removeEventListener')
      ? false
      : undefined
    if(enability === undefined) return this
    $events = $events || this.events
    iterateEvents: for(const $event of $events) {
      $event.enable = enability
    }
    return this
  }
}