import { recursiveAssign } from '../Coutil/index.js'
import Content from './Content/index.js'
import Core from '../Core/index.js'
import Schema from './Schema/index.js'
import LocalStorage from './LocalStorage/index.js'
import Settings from './Settings/index.js'
import Options from './Options/index.js'
import ChangeEvent from './ChangeEvent/index.js'
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
  #schema
  #content
  #localStorage
  #changeEvents
  constructor($settings = {}, $options = {}) {
    super(
      recursiveAssign({}, Settings, $settings), 
      recursiveAssign({}, Options, $options),
    )
    if(
      !this.settings.content ||
      typeof this.settings.content !== 'object'
    ) { return null }
    this.changeEvents = this.options.changeEvents
    if(this.options.enableEvents === true) this.enableEvents()
  }
  get schema() {
    if(this.#schema !== undefined) return this.#schema
    const { schema } = this.settings
    if(!schema) { this.#schema = null }
    else if(schema instanceof Schema) { this.#schema = schema }
    else {
      this.#schema = new Schema(
        schema, this.options.schema
      )
    }
    return this.#schema
  }
  get content() {
    if(this.#content !== undefined) return this.#content
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
      this.#content = new Content(properties, this.schema, this.options.content)
    }
    return this.#content
  }
  get localStorage() {
    if(this.#localStorage !== undefined) { return this.#localStorage }
    const { localStorage } = this.settings
    let path
    if(localStorage !== undefined) {
      if(typeof localStorage === 'string') {
        if(path[0] !== "/") { path = "/".concat(path) }
        else { path = localStorage }
      }
      else if(localStorage === true) {
        path = [window.location.pathname]
        if(this.path) { path.push(path) }
        path = path.join('')
      }
      if(path !== undefined) { this.#localStorage = new LocalStorage(path) }
    }
    return this.#localStorage
  }
  get changeEvents() { return this.#changeEvents }
  set changeEvents($changeEvents) {
    if($changeEvents !== this.#changeEvents) {
      const boundPropertyChange = this.#propertyChange.bind(this)
      this.#changeEvents = $changeEvents
      switch(this.#changeEvents) {
        case true:
          for(const $eventType of ChangeEvents) {
            this.content.addEventListener($eventType, boundPropertyChange)
          }
        break
        case false:
          for(const $eventType of ChangeEvents) {
            this.content.removeEventListener($eventType, boundPropertyChange)
          }
        break

      }
    }
  }
  #propertyChange($event) {
    this.save()
    const { type, path, value, change } = $event
    const detail = Object.assign({ type }, $event.detail)
    const originalEvent = $event
    this.dispatchEvent(
      new ChangeEvent("change", { path, value, detail, change, originalEvent })
    )
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