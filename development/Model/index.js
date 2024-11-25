import { recursiveAssign } from '../Coutil/index.js'
import Content from './Content/index.js'
import Core from '../Core/index.js'
import Schema from './Schema/index.js'
import LocalStorage from './LocalStorage/index.js'
import Settings from './Settings/index.js'
import Options from './Options/index.js'
import ContentEvent from './Content/Events/Content/index.js'
const ChangeEvents = [
  // Accessor
  "getProperty", "setProperty", "deleteProperty", 
  // Array
  "concatValue", "copyWithinIndex", "fillIndex", "pushProp", 
  "spliceDelete", "spliceAdd", "unshiftProp", 
  // Object
  "assignSourceProperty", "defineProperty",
]
export default class Model extends Core {
  #_schema
  #_content
  #_localStorage
  #_change
  #_changeEvents
  #_boundPropertyChange
  constructor($settings = {}, $options = {}) {
    super(
      recursiveAssign({}, Settings, $settings), 
      recursiveAssign({}, Options, $options),
    )
    if(
      !this.settings.content ||
      typeof this.settings.content !== 'object'
    ) { return null }
    if(this.options.enableEvents === true) this.enableEvents()
    this.changeEvents = this.options.changeEvents
  }
  get schema() {
    if(this.#_schema !== undefined) return this.#_schema
    const { schema } = this.settings
    if(!schema) { this.#_schema = null }
    else if(schema instanceof Schema) { this.#_schema = schema }
    else {
      this.#_schema = new Schema(
        schema, this.options.schema
      )
    }
    return this.#_schema
  }
  get content() {
    if(this.#_content !== undefined) return this.#_content
    const { content } = this.settings
    const { localStorage, autoload, autosave } = this.options
    let properties
    if(localStorage && autoload) {
      const localStorageProperties = this.localStorage.get()
      if(localStorageProperties) {
        properties = localStorageProperties 
      }
    }
    else if(content?.classToString === Content.toString()) {
      properties = content.object
    }
    else {
      properties = content
    }
    if(properties !== undefined) {
      this.#_content = new Content(properties, this.schema, this.options.content)
    }
    return this.#_content
  }
  get localStorage() {
    if(this.#_localStorage !== undefined) { return this.#_localStorage }
    if(this.settings.localStorage !== undefined) {
      this.#_localStorage = new LocalStorage(this.settings.localStorage)
    }
    return this.#_localStorage
  }
  get changeEvents() { return this.#_changeEvents }
  set changeEvents($changeEvents) {
    if($changeEvents !== this.#_changeEvents) {
      this.#_changeEvents = $changeEvents
      switch(this.#_changeEvents) {
        case true:
          for(const $eventType of ChangeEvents) {
            this.content.addEventListener($eventType, this.#boundPropertyChange)
          }
        break
        case false:
          for(const $eventType of ChangeEvents) {
            this.content.removeEventListener($eventType, this.#boundPropertyChange)
          }
        break

      }
    }
  }
  get #boundPropertyChange() {
    if(this.#_boundPropertyChange !== undefined) return this.#_boundPropertyChange
    this.#_boundPropertyChange = this.#propertyChange.bind(this)
    return this.#_boundPropertyChange
  }
  #propertyChange($event) {
    let { type, path, key, value, detail } = $event
    detail = Object.assign({ type }, detail)
    this.save()
  }
  save() {
    if(this.localStorage) {
      this.localStorage.set(this.content.object)
      return this.localStorage.get()
    }
    return null
  }
  load() {
    if(this.localStorage) {
      this.content.set(this.localStorage.get())
      return this.localStorage.get()
    }
    return null
  }
  unload() {
    if(this.localStorage) {
      return this.localStorage.remove()
    }
    return null
  }
}