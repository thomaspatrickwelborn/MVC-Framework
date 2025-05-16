import { Core, Coutil } from 'core-plex'
const { typedObjectLiteral } = Coutil
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
      }},
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
          const {
            name,
            administer, deadminister,
            instate, deinstate,
            definitionValue,
          } = $addPropertyClass
          let propertyValue
          Object.defineProperties(this, {
            [name]: {
              configurable: true, enumerable: true, 
              value: typedObjectLiteral(definitionValue)
            }, 
            [administer]: {
              configurable: true, enumerable: false, writable: false, 
              value: function($properties) {
                iterateProperties: 
                for(const [$propertyKey, $propertyValue] of Object.entries($properties)) {
                  $this[name][$propertyKey] = instate(
                    $this[name], $propertyKey, $propertyValue, $addPropertyClass
                  )
                }
                return $this
              }
            },
            [deadminister]: {
              configurable: true, enumerable: false, writable: false, 
              value: function(...$arguments) {
                let properties
                if($arguments.length === 0) {
                  properties = Object.keys($this[name]).reverse()
                }
                else {
                  properties = [].concat(...$arguments).reverse()
                }
                for(const $propertyKey of properties) {
                  deinstate(
                    $this[name], $propertyKey, $addPropertyClass
                  )
                  delete $this[name][$propertyKey]
                }
                return $this
              }
            },
          })
          propertyClasses.push($addPropertyClass)
        }
        return this
      } },
      'removePropertyClasses': { value: function(...$arguments) {
        let $removePropertyClasses
        if($arguments.length === 0) {
          $removePropertyClasses = propertyClasses.reduce(($propertyClasses, propertyClass) => {
            $propertyClasses.push($propertyClass.name)
            return $propertyClasses
          }, [])
        }
        else {
          $removePropertyClasses = [].concat(...$arguments)
        }
        iterateRemovePropertyClasses: 
        for(const $removePropertyClass of $removePropertyClasses) {
          const propertyClassIndex = propertyClasses.findIndex(
            ($propertyClass) => $propertyClass.name === $removePropertyClass
          )
          const { name, deadminister } = propertyClasses.splice(propertyClassIndex, 1)[0]
          this[deadminister]()
          delete this[name]
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