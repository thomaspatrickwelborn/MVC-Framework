import { impandEvents, expandEvents, recursiveAssign } from '../Coutil/index.js'
import CoreEvent from './Event/index.js'
import Settings from './Settings/index.js' 
import Options from './Options/index.js' 
export default class Core extends EventTarget {
  #_settings
  #_options
  #_events
  constructor($settings, $options) {
    super()
    this.settings = $settings
    this.options = $options
    this.addEvents()
    this.#assign()
    this.#defineProperties()
  }
  get settings() { return this.#_settings }
  set settings($settings) {
    if(this.#_settings !== undefined) return
    $settings.events = expandEvents($settings.events)
    this.#_settings = recursiveAssign({}, Settings, $settings)
  }
  get options() { return this.#_options }
  set options($options) {
    if(this.#_options !== undefined) return
    this.#_options = recursiveAssign({}, Options, $options)
  }
  get events() {
    if(this.#_events !== undefined) return this.#_events
    this.#_events = []
    return this.#_events
  }
  getEvents() {
    const getEvents = []
    const { events } = this0
    const $events = expandEvents(arguments[0])
    iterateEvents: 
    for(const $event of $events) {
      const { type, path, listener, enable } = $event
      const eventFilterProperties = []
      if(type !== undefined) { eventFilterProperties.push(['type', type]) }
      if(path !== undefined) { eventFilterProperties.push(['path', path]) }
      if(listener !== undefined) { eventFilterProperties.push(['listener', listener]) }
      if(enable !== undefined) { eventFilterProperties.push(['enable', enable]) }
      getEvents.push(
        ...events.filter(($existingEvent) => {
          return eventFilterProperties.reduce(($match, [
            $eventFilterPropertyKey, $eventFilterPropertyValue
          ]) => {
            const match = (
              $existingEvent[$eventFilterPropertyKey] === $eventFilterPropertyValue
            ) ? true : false
            if($match !== false) { $match = match }
            return $match
          }, undefined)
        })
      )
    }
    return getEvents
  }
  addEvents() {
    const { events } = this
    let $events
    if(arguments.length === 0) { $events = this.settings.events }
    else if(arguments.length === 1) { $events = expandEvents(arguments[0]) }
    for(let $event of $events) {
      $event = Object.assign({}, $event, { context: this })
      events.push(new CoreEvent($event))
    }
    return this
  }
  removeEvents() {
    const { events } = this
    let $events
    if(arguments.length === 0) { $events = events }
    else if(arguments.length === 1) {
      $events = this.getEvents(expandEvents(arguments[0]))
    }
    let eventsIndex = events.length - 1
    iterateEvents: 
    while(eventsIndex > -1) {
      const event = events[eventsIndex]
      const removeEventIndex = $events.findIndex(
        ($event) => $event === event
      )
      event.enable = false
      if(removeEventIndex !== -1) events.splice(eventsIndex, 1)
      eventsIndex--
    }
    return this
  }
  enableEvents() {
    let $events
    if(arguments.length === 0) { $events = this.events }
    else { $events = this.getEvents(arguments[0]) }
    return this.#toggleEventAbility('addEventListener', $events)
  }
  disableEvents() {
    let $events
    if(arguments.length === 0) { $events = this.events }
    else { $events = this.getEvents(arguments[0]) }
    return this.#toggleEventAbility('removeEventListener', $events)
  }
  #assign() {
    for(const $propertyName of this.options.assign) {
      const propertyValue = this.settings[$propertyName]
      Object.assign(this, { [$propertyName]: propertyValue })
    }
  }
  #defineProperties() {
    for(const [
      $propertyName, $propertyDescriptor
    ] of Object.entries(this.options.defineProperties)) {
      $propertyDescriptor.value = this.settings[$propertyName]
      Object.defineProperty(this, $propertyName, $propertyDescriptor)
    }
  }
  #toggleEventAbility($eventListenerMethod, $events) {
    let enability
    if($eventListenerMethod === 'addEventListener') { enability = true }
    else if($eventListenerMethod === 'removeEventListener') { enability = false }
    else { return this }
    iterateEvents:
    for(const $event of $events) {
      $event.enable = enability
    }
    return this
  }
}