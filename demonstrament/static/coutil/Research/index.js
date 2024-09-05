import Model from './Model/index.js'
import View from './View/index.js'
export default class Research extends EventTarget {
  #_model
  #_view
  constructor($model, $view) {
    super()
    this.#model = $model
    this.#view = $view
  }
  get #model() { return this.#_model }
  set #model($model) { this.#_model = new Model($model) }
  get #view() { return this.#_view }
  set #view($view) { this.#_view = new View($view) }
}