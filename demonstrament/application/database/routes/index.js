import { Router } from 'express'
import * as Controls from '../controls/index.js'

function Routes($settings = {}) {
  const routes = Router({ strict: true })
  const routePaths = $settings.database
  const databaseConnection = $settings.databaseConnection
  for(const [
    $routePath, $routeActions
  ] of Object.entries(routePaths)) {
    const routeControl = Controls.Control({
      databaseConnection,
      routePath: $routePath,
      routeActions: $routeActions,
    })
    for(const $routeAction of $routeActions) {
      const route = routes.route($routePath)
      if(Array.isArray(routeControl[$routeAction]) === true) {
        route[$routeAction](...routeControl[$routeAction])
      } else {
        route[$routeAction](routeControl[$routeAction])
      } 
    }
  }
  return routes
}

export default Routes