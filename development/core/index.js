import { Core, Coutil } from 'core-plex'
import Settings from './settings/index.js'
import Options from './options/index.js'
import PropertyClass from './property-class/index.js'
import { instate, deinstate } from './property-class/states/index.js'
const getAccessor = ($target, $property) => $target?.get($property)
export default class MVCFrameworkCore extends Core {
  #_propertyClasses = []
  static propertyClasses = []
  #settings
  #options
  #parent
  constructor($settings = {}, $options = {}) {
    super({
      events: $settings.events || {},
      accessors: ($settings.accessors)
        ? [getAccessor].concat($settings.accessors)
        : [getAccessor],
      propertyDefinitions: $settings.propertyDefinitions || {},
    })
    this.#settings = Settings($settings)
    this.#options = Options($options)
    if(this.settings.propertyClasses) {
      this.addPropertyClasses(this.settings.propertyClasses)
      this.#addProperties(this.settings)
    }
  }
  get settings() { return this.#settings }
  get options() { return this.#options }
  get #propertyClasses() { return this.#_propertyClasses }
  get parent() {
    if(this.#parent !== undefined)  return this.#parent
    this.#parent = (this.settings.parent) ? this.settings.parent : null
    return this.#parent
  }
  get root() {
    let root = this
    iterateParents: 
    while(root) {
      if([undefined, null].includes(root.parent)) { break iterateParents }
      root = root.parent
    }
    return root
  }
  #getPropertyClasses() {
    let $getPropertyClasses
    if(arguments.length === 0) $getPropertyClasses = this.#propertyClasses
    else { $getPropertyClasses = [].concat(...arguments) }
    const getPropertyClasses = []
    let propertyClassIndex = 0
    iteratePropertyClasses: 
    for(const $propertyClass of this.#propertyClasses) {
      for(const $getPropertyClass of $getPropertyClasses) {
        if($propertyClass.name === $getPropertyClass.name) {
          getPropertyClasses.push({
            propertyClassIndex: propertyClassIndex,
            propertyClass: $propertyClass
          })
        }
      }
      propertyClassIndex++
    }
    return getPropertyClasses
  }
  #addProperties($properties) {
    iteratePropertyClasses: 
    for(const $propertyClass of this.#propertyClasses) {
      const { administer, name, definitionValue } = $propertyClass
      if(!definitionValue) { continue iteratePropertyClasses }
      if($properties[name] === undefined) { continue iteratePropertyClasses }
      if(definitionValue !== undefined) {
        this[administer](this.settings[name])
      }
      else if(this.settings[name] !== undefined) {
        this[name] = this.settings[name]
      }
    }
    return this
  }
  addPropertyClasses() {
    const $this = this
    let $addPropertyClasses = (arguments.length === 0)
      ? this.settings.propertyClasses
      : [].concat(...arguments)
    const propertyClasses = this.#propertyClasses
    iteratePropertyClasses: 
    for(const $addPropertyClass of $addPropertyClasses) {
      if(!$addPropertyClass.definitionValue) {
        propertyClasses.push($addPropertyClass)
        continue iteratePropertyClasses
      }
      $addPropertyClass.states = $addPropertyClass.states || {}
      $addPropertyClass.definitionValue = $addPropertyClass.definitionValue || {}
      if($addPropertyClass.instate === undefined) {
        $addPropertyClass.instate = instate 
      }
      if($addPropertyClass.deinstate === undefined) {
        $addPropertyClass.deinstate = deinstate 
      }
      const {
        name,
        administer, deadminister,
        instate, deinstate,
        definitionValue,
      } = $addPropertyClass
      let propertyValue
      if(
        definitionValue === 'Array' || 
        definitionValue === 'Object'
      ) {
        Object.defineProperties(this, {
          [name]: {
            configurable: true, enumerable: true,  
            get() {
              if(propertyValue !== undefined) { return propertyValue }
              propertyValue = new PropertyClass($addPropertyClass, $this)
              return propertyValue
            },
            set($propertyValue) {
              const propertyClassInstances = $this[name]
              let propertyClassInstancesEntries
              if($propertyValue) {
                if(Array.isArray($propertyValue)) {
                  propertyClassInstancesEntries = $propertyValue
                }
                else {
                  propertyClassInstancesEntries = Object.entries($propertyValue)
                }
              } else { propertyClassInstancesEntries = [] }
              iteratePropertyClassInstances: 
              for(const [
                $propertyClassInstanceName, $propertyClassInstance
              ] of propertyClassInstancesEntries) {
                propertyClassInstances[$propertyClassInstanceName] = $propertyClassInstance
              }
            }
          },
          [administer]: {
            configurable: true, enumerable: false, writable: false, 
            value: function() {
              const $arguments = [...arguments]
              if($arguments.length === 1) {
                const [$values] = $arguments
                if(definitionValue === 'Array') {
                  $this[name] = Object.entries($values)
                }
                else {
                  if(Array.isArray($values)) {
                    $this[name] = Object.fromEntries($values)
                  }
                  else {
                    $this[name] = $values
                  }
                }
              }
              else if($arguments.length === 2) {
                const [$key, $value] = $arguments
                $this[name] = { [$key]: $value }
              }
              return $this
            }
          },
          [deadminister]: {
            configurable: true, enumerable: false, writable: false, 
            value: function() {
              const [$removeKeys] = [...arguments]
              const removeKeys = []
              const typeofRemoveKeys = typeof $arguments[0]
              if(typeofRemoveKeys === 'string') { removeKeys.push($arguments[0]) }
              else if(typeofRemoveKeys === 'object') {
                if(Array.isArray($removeKeys)) { removeKeys.push(...$removeKeys) }
                else { removeKeys.push(...Object.keys($removeKeys)) }
              }
              else if(typeofRemoveKeys === 'undefined') {
                removeKeys.push(...Object.keys($this[name]))
              }
              for(const $removeKey of $removeKeys) {
                delete $this[name][$removeKey]
              }
              return $this
            }
          },
        })
      }
      else  {
        Object.defineProperties(this, {
          [name]: {
            get() {
              return propertyValue
            },
            set($propertyValue) {
              propertyValue = instate(Object.assign({
                core: this
              }, $addPropertyClass), name, $propertyValue)
              }
          },
        })
      }
      propertyClasses.push($addPropertyClass)
    }
    return this
  }
  removePropertyClasses() {
    const removePropertyClasses = this.#getPropertyClasses(...arguments)
    let removePropertyClassIndex = removePropertyClasses.length - 1
    iterateRemovePropertyClasses: 
    while(removePropertyClassIndex > -1) {
      const { propertyClassIndex, propertyClass } = removePropertyClasses[removePropertyClassIndex]
      const { definitionValue } = propertyClass
      const propertyClassInstances = this[name]
      if(definitionValue) {
        if(definitionValue === 'Array') {
          let propertyClassInstanceIndex = propertyClassInstances.length - 1
          iteratePropertyClassInstances: 
          while(propertyClassInstanceIndex > -1) {
            propertyClassInstances.splice(propertyClassInstanceIndex, 1)
            propertyClassInstanceIndex--
          }
        }
        else if(definitionValue === 'Object') {
          iteratePropertyClassInstances: 
          for(const [
            $propertyClassInstanceName, $propertyClassInstance
          ] of Object.entries(this[name])) {
            delete propertyClassInstances[$propertyClassInstanceName]
          }
        }
        delete this[`_${name}`]
        Object.defineProperty(this, name, {
          configurable: true, enumerable: false, writable: true, 
          value: undefined
        })
        delete this[name]
        delete this[administer]
        delete this[deadminister]
      }
      else {
        delete this[name]
        Object.defineProperty(this, name, {
          configurable: true, enumerable: false, writable: true, 
          value: undefined
        })
      }
      this.#propertyClasses.splice(propertyClassIndex, 1)
      removePropertyClassIndex--
    }
    return this
  }
}