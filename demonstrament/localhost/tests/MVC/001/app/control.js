import {
  Model, View, Control, StaticRouter
} from '/mvc-framework/index.js'
import modelParameters from './model.js'
import viewParameters from './view.js'
import routerParameters from './router.js'
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
}
const options = {}
export default [settings, options]