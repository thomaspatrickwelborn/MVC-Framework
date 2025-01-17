import { expandEvents, recursiveAssign } from '../Coutil/index.js'
import CoreClassEvents from './PropertyEvents/index.js'
import { CoreClassInstantiator, CoreClassDeinstantiator } from './PropertyInstantiators/index.js'
import { CoreClassValidator } from './PropertyValidators/index.js'
import CoreEvent from './Event/index.js'
import PropertyClass from './PropertyClass/index.js'
import Settings from './Settings/index.js' 
import Options from './Options/index.js' 
export default class Core extends EventTarget {
  #settings
  #options
  #events
  #key
  #path
  #parent
  #_propertyClassEvents
  #_propertyClasses
  constructor($settings, $options) {
    super()
    this.settings = $settings
    this.options = $options
    this.#propertyClasses
    this.#assign()
    this.#defineProperties()
    this.addEvents()
    if(this.options.enableEvents === true) { this.enableEvents() }
  }
  get #propertyClassEvents() {
    if(this.#_propertyClassEvents !== undefined) return this.#_propertyClassEvents
    this.#_propertyClassEvents = {}
    for(const [$propertyClassName, $propertyClass] of Object.entries(this.#propertyClasses)) {
      this.#_propertyClassEvents[$propertyClassName] = $propertyClass.Events
    }
    return this.#_propertyClassEvents
  }
  get #propertyClasses() {
    if(this.#_propertyClasses !== undefined) return this.#_propertyClasses
    this.#_propertyClasses = this.settings.propertyClasses
    const $this = this
    for(const [
      $propertyClassName, $propertyClassInstantiatorSettings
    ] of Object.entries(this.#_propertyClasses)) {
      const { Events, Names } = $propertyClassInstantiatorSettings
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
            let propertyClassInstancesEntries
            if($propertyClassInstances) {
              if(Array.isArray($propertyClassInstances)) {
                propertyClassInstancesEntries = $propertyClassInstances
              }
              else {
                propertyClassInstancesEntries = Object.entries($propertyClassInstances)
              }
            } else { propertyClassInstancesEntries = [] }
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
                $this[$propertyClassName] = Object.fromEntries($values)
              }
              else {
                $this[$propertyClassName] = $values
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
  get settings() { return this.#settings }
  set settings($settings) {
    if(this.#settings !== undefined) return
    this.#settings = Object.assign({}, Settings, $settings)
    for(const [
      $propertyClassName, $propertyClassInstantiatorSettings
    ] of Object.entries(this.#settings.propertyClasses)) {
      // Events
      if($propertyClassInstantiatorSettings.Events === undefined) {
        $propertyClassInstantiatorSettings.Events = CoreClassEvents
      }
      // Class Validator
      if($propertyClassInstantiatorSettings.ClassValidator === undefined) {
        $propertyClassInstantiatorSettings.ClassValidator = CoreClassValidator 
      }
      // Class Instantiator
      if($propertyClassInstantiatorSettings.ClassInstantiator === undefined) {
        $propertyClassInstantiatorSettings.ClassInstantiator = CoreClassInstantiator 
      }
      // Class Deinstantiator
      if($propertyClassInstantiatorSettings.ClassDeinstantiator === undefined) {
        $propertyClassInstantiatorSettings.ClassDeinstantiator = CoreClassDeinstantiator 
      }
    }
    // Expanded Events
    $settings.events = expandEvents($settings.events)
  }
  get options() { return this.#options }
  set options($options) {
    if(this.#options !== undefined) return
    this.#options = recursiveAssign(structuredClone(Options), $options)
  }
  get key() {
    if(this.#key !== undefined) return this.#key
    this.#key = this.path?.split('.').pop() || null
    return this.#key
  }
  get path() {
    if(this.#path !== undefined) return this.#path
    this.#path = (this.settings.path !== undefined)
      ? this.settings.path
      : undefined
    return this.#path
  }
  set path($path) {
    if(this.#path !== undefined) return
    this.#path = $path
  }
  get parent() {
    if(this.#parent !== undefined) return this.#parent
    this.#parent = (
      this.settings.parent !== undefined
    ) ? this.settings.parent
      : undefined
    return this.#parent
  }
  set parent($parent) {
    if(this.#parent !== undefined) return
    this.#parent = $parent
  }
  get root() {
    let root = this
    while(root !== null) { root = root.parent }
    return root
  }
  get events() {
    if(this.#events !== undefined) return this.#events
    this.#events = []
    return this.#events
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
      const propertyClassName = $event.path.split('.').shift()
      const propertyClassEvents = (this.#propertyClassEvents[propertyClassName])
        ? this.#propertyClassEvents[propertyClassName] 
        : CoreClassEvents
      $event = Object.assign({}, $event, {
        context: this,
        propertyClassEvents,
      })
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