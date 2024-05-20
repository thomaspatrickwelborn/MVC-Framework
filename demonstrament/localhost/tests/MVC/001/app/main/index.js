import { Control } from '/mvc-framework/index.js'
import controlParameters from './control.js'
export default class MainControl extends Control {
  constructor() { super(...controlParameters) }
  start() {
    const { model } = this.models
    const { view } = this.views
    view.renderElement({
      name: 'template',
      data: model.content,
    })
    this.enableEvents()
    return this
  }
}