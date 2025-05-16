import { Core, Coutil } from 'core-plex'
import Settings from './settings/index.js'
import Options from './options/index.js'
import PropertyClass from './property-class/index.js'
export default class MVCFrameworkCore extends Core {
  static propertyClasses = []
  constructor($settings = {}, $options = {}) {
    super({
      events: $options.events || {},
      enableEvents: $options.enableEvents || false, 
      propertyDefinitions: $options.propertyDefinitions || {},
      accessors: [($target, $property) => {
        if($property === undefined) { return $target }
        else { return $target[$property] }
      }, ($target, $property) => {
        if($property === undefined) { return $target.target }
        else { return $target.get($property) }
      }]
    })
    const getPropertyClasses = () => {
      let $getPropertyClasses
      if(arguments.length === 0) $getPropertyClasses = propertyClasses
      else { $getPropertyClasses = [].concat(...arguments) }
      const getPropertyClasses = []
      let propertyClassIndex = 0
      iteratePropertyClasses: 
      for(const $propertyClass of propertyClasses) {
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
    const addProperties = ($properties) => {
      iteratePropertyClasses: 
      for(const $propertyClass of propertyClasses) {
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
    const propertyClasses = []
    Object.defineProperties(this, {
      'parent': { configurable: true, get() {
        const options = this.options
        const parent = (options.parent) ? options.parent : null
        Object.defineProperty(this, 'parent', { value: parent })
        return parent
      } },
      'path': { configurable: true, get() {
        const options = this.options
        let path = (options.path) ? String(options.path) : null
        Object.defineProperty(this, 'path', { value: path })
        return path
      } },
      'settings': { value: Settings($settings) },
      'options': { value: Options($options) },
      'root': { get() {
        let root = this
        iterateParents: 
        while(root) {
          if([undefined, null].includes(root.parent)) { break iterateParents }
          root = root.parent
        }
        return root
      } },
      'retroReenableEvents': { value: function() {
        let core = this
        while(core) {
          core.reenableEvents({ enable: true })
          core = core.parent
        }
        return this
      } },
      'addPropertyClasses': { value: function() {
        const $this = this
        let $addPropertyClasses = (arguments.length === 0)
          ? this.options.propertyClasses
          : [].concat(...arguments)
        iteratePropertyClasses: 
        for(const $addPropertyClass of $addPropertyClasses) {
          if(!$addPropertyClass.definitionValue) {
            propertyClasses.push($addPropertyClass)
            continue iteratePropertyClasses
          }
          $addPropertyClass.definitionValue = $addPropertyClass.definitionValue || {}
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
          propertyClasses.push($addPropertyClass)
        }
        return this
      } },
      'removePropertyClasses': { value: function() {
        const removePropertyClasses = getPropertyClasses(...arguments)
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
          propertyClasses.splice(propertyClassIndex, 1)
          removePropertyClassIndex--
        }
        return this
      } },
    })
    if(this.options.propertyClasses) {
      this.addPropertyClasses(this.options.propertyClasses)
      addProperties(this.settings)
    }
  }
}