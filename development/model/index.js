import { Model }  from 'objecture'
import LocalStorage from './localStorage/index.js'
import Settings from './settings/index.js'
import Options from './options/index.js'
export default class extends Model {
  #schema
  #content
  #localStorage
  #changeEvents
  constructor($settings, $options) {
    super($settings.properties, $settings.schema, $options)
  }
  get localStorage() {
    if(this.#localStorage !== undefined) { return this.#localStorage }
    const { localStorage } = this.settings
    let path
    if(localStorage) {
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
  save() {
    if(this.localStorage) {
      this.localStorage.set(this.content.valueOf())
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