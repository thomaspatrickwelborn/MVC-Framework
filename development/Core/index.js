import {
  impandEvents, expandEvents, recursiveAssign, recursiveAssignConcat
} from '../Coutil/index.js'
import CoreEvent from './Event/index.js'
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
  #parseAddPropertyClassInstanceMethodArguments() {
    const $arguments = [...arguments]
    if($arguments.length === 1) {
      const $propertyClassInstanceDefinitions = $arguments.shift()
      return { $propertyClassInstanceDefinitions }
    }
    else if($arguments.length >= 2) {
      const $propertyClassInstanceName = $arguments.shift()
      const $propertyClassDefinition = $arguments.shift()
      return { $propertyClassInstanceName, $propertyClassInstanceDefinition }
    }
  }
  get #propertyClasses() {
    if(this.#_propertyClasses !== undefined) return this.#_propertyClasses
    const typeOfPropertyClasses = Array.isArray(this.settings.propertyClasses)
    this.#_propertyClasses = this.settings.propertyClasses
    const $this = this
    for(const [
      $propertyClassName, $propertyClassInstantiatorSettings
    ] of Object.entries(this.#_propertyClasses)) {
      const { Class, ClassInstantiator, Names, Events } = $propertyClassInstantiatorSettings
      Object.defineProperties(this, {
        [Names.Multiple.Nonformal]: {
          configurable: false, enumerable: false, value: {}, writable: false,
        },
        // Add Property
        [`add${Names.Multiple.Formal}`]: {
          value: function() {
            const $arguments = this.#parseAddPropertyClassInstanceMethodArguments(...arguments)
            const {
              $propertyClassInstanceDefinitions, $propertyClassInstanceName, $propertyClassInstanceDefinition
            } = $arguments
            if(/*$arguments.*/$propertyClassInstanceDefinitions) {
              const classInstances = $this[Names.Multiple.Nonformal]
              iteratePropertyClassInstances: 
              for(const [
                $propertyClassInstanceName, $propertyClassInstanceParameters
              ] of Object.entries(/*$arguments.*/$propertyClassInstanceDefinitions)) {
                const path = ($this.path)
                  ? [$this.path, Names.Multiple.Nonformal, $propertyClassInstanceName].join('.')
                  : [Names.Multiple.Nonformal, $propertyClassInstanceName].join('.')
                const parent = $this
                const propertyClassInstanceParameters = [].concat($propertyClassInstanceParameters)
                if($propertyClassInstanceParameters instanceof Class) {
                  classInstances[Names.Monople.Nonformal] = $propertyClassInstanceParameters
                }
                else {
                  const [$settings, $options] = propertyClassInstanceParameters
                  classInstances[Names.Monople.Nonformal] = CoreClassInstantiator(
                    Class, recursiveAssign({ path, parent }, $settings), $options
                  )
                }
              }
            }
            else if(/*$arguments.*/$propertyClassInstanceName && /*$arguments.*/$propertyClassInstanceDefinition) {
              const path = ($this.path)
                ? [$this.path, Names.Multiple.Nonformal, $propertyClassInstanceName].join('.')
                : [Names.Multiple.Nonformal, $propertyClassInstanceName].join('.')
              const parent = $this
              const propertyClassInstanceParameters = [].concat($propertyClassInstanceParameters)
              if($propertyClassInstanceParameters instanceof Class) {
                classInstances[Names.Monople.Nonformal] = $propertyClassInstanceParameters
              }
              else {
                const [$settings, $options] = propertyClassInstanceParameters
                classInstances[Names.Monople.Nonformal] = CoreClassInstantiator(
                  Class, recursiveAssign({ path, parent }, $settings), $options
                )
              }
            }
          }
        },
        // Remove Property
        [`remove${Names.Multiple.Formal}`]: {
          value: function() {
            const $arguments = [...arguments]
            const removePropertyKeys = []
            // Remove All Properties
            if($arguments.length === 0) {
              removePropertyKeys.push(...this[Names.Multiple.Nonformal].keys())
            }
            // Remove Some Properties
            else if($arguments.length === 1) {
              // Remove One Property
              if(typeof $arguments[0] === 'string') {
                removePropertyKeys.push($arguments[0])
              }
              else if($arguments[0] && typeof $arguments[0] === 'object') {
                // Remove Array Of Properties
                if(
                  Array.isArray($arguments[0] &&
                  !$arguments[0].find(($key) => typeof $key !== 'string'))
                ) { removePropertyKeys.push(...$arguments[0]) }
                // Remove Array of Property Keys
                else { removePropertyKeys.push(...Object.keys($arguments[0])) }
              }
            }
            for(const $removePropertyKey of removePropertyKeys) {
              CoreClassDeinstantiator(this[Names.Multiple.Nonformal][$removePropertyKey])
              delete this[Names.Multiple.Nonformal][$removePropertyKey]
            }
          }
        },
      })
      this[`add${Names.Multiple.Formal}`](this.settings[Names.Multiple.Nonformal])
    }
    return this.#_propertyClasses
  }
  get settings() { return this.#_settings }
  set settings($settings) {
    if(this.#_settings !== undefined) return
    this.#_settings = recursiveAssignConcat(structuredClone(Settings), $settings)
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