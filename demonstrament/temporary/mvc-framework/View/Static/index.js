import { typeOf } from '../../Utils/index.js'
import View from '../Base/index.js'

const Settings = Object.freeze({
  element: undefined,
})
const Options = Object.freeze({
  enableSelectors: true,
  enableEvents: true,
})
export default class StaticView extends View {
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign({}, Settings, $settings),
      Object.assign({}, Options, $options),
    )
    const {
      enableSelectors, enableEvents
    } = this.options
    this.element = this.settings.element
    if(enableSelectors === true) this.enableSelectors()
    if(enableEvents === true) this.enableEvents()
  }
  get parentElement() { return this.element.parentElement }
  // Element
  #_element
  get element() { return this.#_element }
  set element($element) { this.#_element = $element }
}