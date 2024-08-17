import { typeOf } from '../../Coutil/index.js'
import View from '../Base/index.js'

const Settings = Object.freeze({
  parentElement: undefined,
  element: undefined, // document.createElement('template'),
  templates: { default: () => `` },
  selectors: {},
  events: {},
})
const Options = Object.freeze({})
const RenderSettings = Object.freeze({
  templateName: 'default', 
  content: {},
})
export default class DynamicView extends View {
  constructor($settings = {}, $options = {}) {
    super(
      Object.assign({}, Settings, $settings),
      Object.assign({}, Options, $options),
    )
    const { parentElement } = this.settings
    this.parentElement = parentElement
    this.element = document.createElement('template')
  }
  // Parent
  #_parentElement
  get parentElement() { return this.#_parentElement }
  set parentElement($parentElement) { this.#_parentElement = $parentElement }
  // Element
  #_element
  get element() { return this.#_element }
  set element($element) { this.#_element = $element }
  // Render Element
  renderElement($settings = {}) {
    $settings = Object.assign({}, RenderSettings, $settings)
    const element = this.element
    if(!element instanceof HTMLTemplateElement) return this
    const { templateName, content } = $settings
    const template = this.templates[templateName]
    if(
      template !== undefined &&
      typeOf(template) === 'function'
    ) {
      this.disable()
      const templateContent = template(content)
      element.innerHTML = templateContent
      this.enable()
      this.dispatchEvent(new CustomEvent('render', {
        detail: this
      }))
    }
    return this
  }
}