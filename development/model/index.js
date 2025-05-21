import { Model as ObjectureModel } from 'objecture/distributement/objecture.sans.core-plex.js'
import LocalStorage from './localStorage/index.js'
import Options from './options/index.js'
export default class Model extends ObjectureModel {
  #localStorage
  constructor($properties, $schema, $options) {
    super(...arguments)
  }
  get localStorage() {
    if(this.#localStorage !== undefined) { return this.#localStorage }
    const { localStorage } = this.options
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