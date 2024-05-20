import {
  Model, View, Control
} from '/mvc-framework/index.js'
import modelParamaters from './model.js'
import viewParameters from './view.js'
import eventsMap from './events.js'
const settings = {
  models: {
    model: new Model(...modelParamaters),
  },
  views: {
    view: new View(...viewParameters),
  },
  events: eventsMap,
}
const options = {}
export default [settings, options]