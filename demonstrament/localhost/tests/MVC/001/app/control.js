import {
  Model, View, Control, StaticRouter
} from '/mvc-framework/index.js'
import modelParameters from './model.js'
import viewParameters from './view.js'
import routerParameters from './router.js'
import eventsMap from './events.js'
const settings = {
  models: {
    model: new Model(...modelParameters)
  },
  views: {
    view: new View(...viewParameters)
  },
  routers: {
    router: new StaticRouter(...routerParameters)
  },
  events: eventsMap,
}
const options = {}
export default [settings, options]