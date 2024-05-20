import * as Schemata from '../schemata/index.js'
const ControlMethods = {
  '/services/topics': {
    get: async function control($request, $response, $next) {
      $response.setTimeout(1000, () => {
        $response.sendStatus(408)
      })
      $response.send('Hello All Dogs')
    }
  }
}

function Control($options) {
  const { routePath, routeActions, databaseConnection } = $options
  const control = {}
  const TopicModel = databaseConnection.model('Topic', Schemata.Topic)
  for(const $routeAction of routeActions) {
    control[$routeAction] = ControlMethods[routePath][$routeAction]
  }
  return control
}

export { Control }