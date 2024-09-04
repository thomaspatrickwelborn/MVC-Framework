import Templates from './templates.js'
export default class View extends EventTarget {
  #settings = {}
  #options = {}
  #parent = document.querySelector('app')
  constructor($settings, $options) {
    super()
    this.#settings = $settings
    this.#options = $options
  }
}