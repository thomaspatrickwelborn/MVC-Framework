import {
  Model, View, Control
} from '/mvc-framework/index.js'
import modelParameters from './model.js'
import viewParameters from './view.js'
import eventsMap from './events.js'
const settings = {
  models: {
    model: new Model(...modelParameters)
  },
  views: {
    view: new View(...viewParameters)
  },
  events: eventsMap,
}
const options = {}
export default [settings, options]