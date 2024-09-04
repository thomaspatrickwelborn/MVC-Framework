import Model from './model.js'
import View from './view.js'
export default class DETTestAnalysis extends EventTarget {
  #settings
  #options
  #parent = document.querySelector('app')
  constructor($settings, $options) {
    this.#settings = $settings
    this.#options = $options
  }
}