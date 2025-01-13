import { impandEvents, expandEvents, recursiveAssign } from '../Coutil/index.js'
import CoreEvent from './Event/index.js'
import Settings from './Settings/index.js' 
import Options from './Options/index.js' 
const PropertyClassInstanceEventListenerAssignments = {
  "add": "addEventListener",
  "remove": "removeEventListener",
}
function PropertyClassInstantiator() {}
export default class Core extends EventTarget {
  #_settings
  #_options
  #_propertyClasses
  #_events
  #_key
  #_path
  #_parent
  constructor($settings, $options) {
    super()
    this.settings = $settings
    this.options = $options
    this.#propertyClasses = $settings.propertyClasses
    this.addEvents()
    this.#assign()
    this.#defineProperties()
  }
  set #propertyClasses($propertyClasses) {
    console.log("$propertyClasses", $propertyClasses)
    if(this.#_propertyClasses === undefined)
    for(const [
      $propertyClassName, $propertyClassInstantiatorSettings
    ] of $propertyClasses) {
      const { Class, Names, Events } = $propertyClassInstantiatorSettings
      if(ClassInstantiator === undefined) ClassInstantiator = PropertyClassInstantiator
      Object.defineProperties(this, {
        [Names.Multiple.Nonformal]: {
          configurable: false, enumerable: false, value: {}, writable: false,
        },
        // Add Property
        [`add${Names.Multiple.Formal}`]: {
          value: function($propertyClassDefinitions) {
            const classInstances = this[`_${$propertyClassName}`]
            iterateClassInstances: 
            for(const [
              $propertyClassInstanceName, $propertyClassInstanceParameters
            ] of Object.entries($propertyClassDefinitions)) {
              const path = (this.path)
                ? [this.path, $propertyClassInstanceName].join('.')
                : $propertyClassInstanceName
              const parent = this
              let propertyClassInstanceSettings, propertyClassInstanceOptions
              if($propertyClassInstanceParameters instanceof Class) {
                classInstances[$propertyClassInstanceName] = $propertyClassInstanceParameters
              }
              else if(typeOf($propertyClassInstanceParameters) === 'object') {
                propertyClassInstanceSettings = Object.assign(
                  { path, parent }, $propertyClassInstanceParameters
                )
                classInstances[$propertyClassInstanceName] = new Class(propertyClassInstanceSettings)
              }
              else if(typeOf($propertyClassInstanceParameters) === 'array') {
                propertyClassInstanceSettings = Object.assign(
                  { path, parent }, $propertyClassInstanceParameters[0]
                )
                propertyClassInstanceOptions = $propertyClassInstanceParameters[1]
                classInstances[$propertyClassInstanceName] = new Class(
                  propertyClassInstanceSettings, propertyClassInstanceOptions
                )
              }
            }
          }
        },
        // Remove Property
        [`remove${Names.Multiple.Formal}`]: {
          value: function() {
            // 
          }
        },
      })
    }
  }
  get settings() { return this.#_settings }
  set settings($settings) {
    if(this.#_settings !== undefined) return
    $settings.events = expandEvents($settings.events)
    this.#_settings = recursiveAssign(structuredClone(Settings), $settings)
  }
  get options() { return this.#_options }
  set options($options) {
    if(this.#_options !== undefined) return
    this.#_options = recursiveAssign(structuredClone(Options), $options)
  }
  get key() {
    if(this.#_key !== undefined) return this.#_key
    this.#_key = (this.settings.key !== undefined)
      ? this.path.split('.').pop()
      : null
    return this.#_key
  }
  get path() {
    if(this.#_path !== undefined) return this.#_path
    this.#_path = (this.settings.path !== undefined)
      ? this.settings.path
      : null
    return this.#_path
  }
  get parent() {
    if(this.#_parent !== undefined) return this.#_parent
    this.#_parent = (
      this.settings.parent !== undefined
    ) ? this.settings.parent
      : null
    return this.#_parent
  }
  get root() {
    let root = this
    while(root !== null) { root = root.parent }
    return root
  }
  get events() {
    if(this.#_events !== undefined) return this.#_events
    this.#_events = []
    return this.#_events
  }
  
  // removeClassInstances() {
    
  // }
  getEvents() {
    const getEvents = []
    const { events } = this
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
    if(Object.keys(this.options.assign).length === 0) return this
    for(const [
        $propertyName, $propertyValue
      ] of Object.entries(this.options.assign)) {
      Object.assign(this, { [$propertyName]: $propertyValue })
    }
    return this
  }
  #defineProperties() {
    if(Object.keys(this.options.defineProperties).length === 0) return this
    for(const [
      $propertyName, $propertyDescriptor
    ] of Object.entries(this.options.defineProperties)) {
      Object.defineProperty(this, $propertyName, $propertyDescriptor)
    }
    return this
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