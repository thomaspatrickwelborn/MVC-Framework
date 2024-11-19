import { recursiveAssign } from '../Coutil/index.js'
import Content from './Content/index.js'
import Core from '../Core/index.js'
import Schema from './Schema/index.js'
import LocalStorage from './LocalStorage/index.js'
import Settings from './Settings/index.js'
import Options from './Options/index.js'
export default class Model extends Core {
  #_schema
  #_content
  #_localStorage
  constructor($settings = {}, $options = {}) {
    super(
      recursiveAssign({}, Settings, $settings), 
      recursiveAssign({}, Options, $options),
    )
    if(this.options.enableEvents === true) this.enableEvents()
  }
  get schema() {
    if(this.#_schema !== undefined) return this.#_schema
    const { schema } = this.settings
    // No Schema
    if(!schema) { this.#_schema = null }
    // Existing Schema
    else if(schema instanceof Schema) { this.#_schema = schema }
    // New Schema
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
    // Existing Content
    if(content instanceof Content) { this.#_content = content }
    // New Content
    else {
      const { localStorage, autoLoad } = this.options
      // Local Storage, Auto Load
      if(localStorage && autoLoad) {
        const localStorageContent = this.localStorage.get()
        this.#_content = new Content(
          recursiveAssign({}, content, localStorageContent),
          this.schema,
          this.options.content
        )
      }
      // No Local Storage, No Auto Load
      else {
        this.#_content = new Content(content, this.schema, this.options.content)
      }
    }
    return this.#_content
  }
  get localStorage() {
    if(this.#_localStorage !== undefined) { return this.#_localStorage }
    this.#_localStorage = new LocalStorage(this.settings.localStorage)
    return this.#_localStorage
  }
  save() {
    if(this.localStorage) { this.localStorage.set(this.content.string) }
    return this
  }
  load() {
    if(this.localStorage) { this.content.set(JSON.parse(this.localStorage.get())) }
    return this
  }
  parse() { return this.content.parse(...arguments) }
}