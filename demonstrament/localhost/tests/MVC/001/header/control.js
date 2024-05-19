import {
  Model, View, Control, StaticRouter
} from '/mvc-framework/index.js'
import modelParameters from './model.js'
import viewParameters from './view.js'
import eventsParameters from './events.js'
const settings = {
  // Models
  models: {
    model: new Model(...modelParameters)
  },
  // Views
  views: {
    view: new View(...viewParameters)
  },
  // Events
  events: eventsParameters,
}
const options = {}
export default [settings, options]