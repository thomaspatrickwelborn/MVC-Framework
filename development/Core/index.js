import { expandEvents, recursiveAssign } from '../Coutil/index.js'
import CoreEvent from './Event/index.js'
import PropertyClass from './PropertyClass/index.js'
import Settings from './Settings/index.js' 
import Options from './Options/index.js' 
import {
  CoreClassInstantiator, CoreClassDeinstantiator
} from './Instantiators/index.js'

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
    this.#propertyClasses
    this.addEvents()
    this.#assign()
    this.#defineProperties()
  }
  get #propertyClasses() {
    if(this.#_propertyClasses !== undefined) return this.#_propertyClasses
    this.#_propertyClasses = this.settings.propertyClasses
    const $this = this
    for(const [
      $propertyClassName, $propertyClassInstantiatorSettings
    ] of Object.entries(this.#_propertyClasses)) {
      const { Names } = $propertyClassInstantiatorSettings
      const propertyClassStoreName = `_${$propertyClassName}`
      Object.defineProperties(this, {
        [propertyClassStoreName]: {
          configurable: false, enumerable: false, writable: true,
          value: undefined,
        },
        [$propertyClassName]: {
          get() {
            if($this[propertyClassStoreName] !== undefined) {
              return $this[propertyClassStoreName]
            }
            $this[propertyClassStoreName] = new PropertyClass(
              $propertyClassInstantiatorSettings, $this
            )
            return $this[propertyClassStoreName]
          },
          set($propertyClassInstances) {
            const propertyClassInstances = $this[$propertyClassName]
            const propertyClassInstancesEntries = (
              Array.isArray($propertyClassInstances)
            ) ? $propertyClassInstances
              : Object.entries($propertyClassInstances)
            for(const [
              $propertyClassInstanceName, $propertyClassInstance
            ] of propertyClassInstancesEntries) {
              propertyClassInstances[$propertyClassInstanceName] = $propertyClassInstance
            }
          }
        },
        [`add${Names.Multiple.Formal}`]: {
          configurable: false, enumerable: true, writable: false, 
          value: function() {
            const $arguments = [...arguments]
            if($arguments.length === 1) {
              const [$values] = $arguments
              if(Array.isArray($values)) {
                $this[$propertyClassName] = Object.fromEntries($value)
              }
              else {
                $this[$propertyClassName] = $value
              }
            }
            else if($arguments.length === 2) {
              const [$key, $value] = $arguments
              $this[$propertyClassName] = { [$key]: $value }
            }
          }
        },
        [`remove${Names.Multiple.Formal}`]: {
          configurable: false, enumerable: true, writable: false, 
          value: function() {
            const [$removeKeys] = [...arguments]
            const removeKeys = []
            const typeofRemoveKeys = typeof $arguments[0]
            if(typeofRemoveKeys === 'string') { removeKeys.push($arguments[0]) }
            else if(typeofRemoveKeys === 'object') {
              if(Array.isArray($removeKeys)) { removeKeys.push(...$removeKeys) }
              else { removeKeys.push(...Object.keys($removeKeys)) }
            }
            for(const $removeKey of $removeKeys) {
              delete $this[$propertyClassName][$removeKey]
            }
          }
        },
      })
      this[$propertyClassName] = this.settings[$propertyClassName]
    }
    return this.#_propertyClasses
  }
  get settings() { return this.#_settings }
  set settings($settings) {
    if(this.#_settings !== undefined) return
    this.#_settings = Object.assign({}, Settings, $settings)
    for(const [
      $propertyClassName, $propertyClassInstantiatorSettings
    ] of Object.entries(this.#_settings.propertyClasses)) {
      if($propertyClassInstantiatorSettings.ClassInstantiator === undefined) {
        $propertyClassInstantiatorSettings.ClassInstantiator = CoreClassInstantiator 
      }
      if($propertyClassInstantiatorSettings.ClassDeinstantiator === undefined) {
        $propertyClassInstantiatorSettings.ClassDeinstantiator = CoreClassDeinstantiator 
      }
    }
    // Expanded Events
    $settings.events = expandEvents($settings.events)
  }
  get options() { return this.#_options }
  set options($options) {
    if(this.#_options !== undefined) return
    this.#_options = recursiveAssign(structuredClone(Options), $options)
  }
  get key() {
    if(this.#_key !== undefined) return this.#_key
    this.#_key = this.path?.split('.').pop() || null
    return this.#_key
  }
  get path() {
    if(this.#_path !== undefined) return this.#_path
    this.#_path = (this.settings.path !== undefined)
      ? this.settings.path
      : undefined
    return this.#_path
  }
  set path($path) {
    if(this.#_path !== undefined) return
    this.#_path = $path
  }
  get parent() {
    if(this.#_parent !== undefined) return this.#_parent
    this.#_parent = (
      this.settings.parent !== undefined
    ) ? this.settings.parent
      : undefined
    return this.#_parent
  }
  set parent($parent) {
    if(this.#_parent !== undefined) return
    this.#_parent = $parent
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
    const $events = expandEvents(arguments[0] || this.settings.events)
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