import { Model, View, Control } from '/mvc-framework/index.js'
import modelParameters from './model.js'
import viewParameters from './view.js'
import eventsMap from './events.js'
export default class HeaderControl extends Control {
  constructor() {
    super(...arguments)
    this.addClassInstances({
      models: {
        model: new Model(...modelParameters)
      },
      views: {
        view: new View(...viewParameters)
      },
    })
    this.addEvents(eventsMap)
  }
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