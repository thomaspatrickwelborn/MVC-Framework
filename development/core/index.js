import Core from 'core-plex'
import { typedObjectLiteral } from 'recourse'
import Settings from './settings/index.js'
import Options from './options/index.js'
export default class MVCFrameworkCore extends Core {
  static propertyClasses = []
  constructor($settings = {}, $options = {}) {
    super(Object.assign({}, $options, {
      compandTree: {
        accessors: [function objectAccessor($target, $property) {
          if($property === undefined) { return $target }
          else { return $target[$property] }
        }, function mapAccessor($target, $property) {
          if($target instanceof Map === true) {
            if($property === undefined) { return Object.fromEntries($target) }
            else { return $target.get($property) }
          }
        }, function objectureAccessor($target, $property) {
          if($property === undefined) { return $target.target }
          else { return $target.target[$property] }
        }],
      },
    }))
    const propertyClasses = []
    const addProperties = ($properties) => {
      const propertyClassNames = propertyClasses.map(
        ($propertyClass) => $propertyClass.name
      )
      iteratePropertyClasses: 
      for(const $propertyClass of propertyClasses) {
        const { administer, name, targetType } = $propertyClass
        if(!targetType) { continue iteratePropertyClasses }
        if($properties[name] === undefined) { continue iteratePropertyClasses }
        if(targetType !== undefined) {
          this[administer](this.settings[name])
        }
        else if(this.settings[name] !== undefined) {
          this[name] = this.settings[name]
        }
      }
      return this
    }
    let parent = null
    let path = null
    try {
      Object.defineProperty(this, 'mount', { value: function($mount) {
        const mountParent = $mount.parent
        const mountPath = $mount.path
        const property = (mountPath) ? mountPath.split('.').pop() : mountPath
        if(parent) { parent.unmount(property) }
        parent = mountParent
        path = mountPath
      } })
    }
    catch($err) { console.error($err) }
    try {
      Object.defineProperty(this, 'unmount', { value: function($unmount) {
        const unmountPath = $unmount.path
        delete this[$property]
      } })
    }
    catch($err) { console.error($err) }
    Object.defineProperties(this, {
      'settings': { value: Settings($settings) },
      'options': { value: Options($options) },
      'definition': { get() { return definition } },
      'parent': { get() { return parent } },
      'path': { get() { return path } },
      'key': { get() { return (path) ? path.pop() : path } },
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
          if(!$addPropertyClass.targetType) {
            propertyClasses.push($addPropertyClass)
            continue iteratePropertyClasses
          }
          const {
            name,
            administer, deadminister,
            instate, deinstate,
            targetType, definition,
          } = $addPropertyClass
          let propertyValue
          Object.defineProperties(this, {
            [name]: {
              configurable: true, enumerable: true, writable: true,
              value: typedObjectLiteral(targetType)
            }, 
            [administer]: {
              configurable: true, enumerable: false, writable: false, 
              value: function($properties) {
                if(!$this[name]) { $this[name] = typedObjectLiteral(targetType) }
                iterateProperties: 
                for(const [$propertyKey, $propertyValue] of Object.entries($properties)) {
                  $this[name][$propertyKey] = instate(
                    $this, $propertyKey, $propertyValue, $addPropertyClass
                  )
                  $this.retroReenableEvents()
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
                    $this, $propertyKey, $addPropertyClass
                  )
                  delete $this[name][$propertyKey]
                  $this.retroReenableEvents()
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
    if(this.settings.defineProperties) {
      Object.defineProperties(this, this.settings.defineProperties)
    }
    if(this.settings.assign) {
      Object.assign(this, this.settings.assign)
    }
    if(this.options.propertyClasses) {
      this.addPropertyClasses(this.options.propertyClasses)
    }
    this.mount({
      parent: this.options.parent,
      path: this.options.path
    })
    addProperties(this.settings)
  }
}