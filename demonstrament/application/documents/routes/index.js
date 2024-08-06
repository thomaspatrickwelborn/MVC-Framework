import express from 'express'
import { Router } from 'express'
import * as Controls from '../controls/index.js'

async function Routes($settings = {}) {
  const routes = Router({ strict: true })
  const routePaths = $settings.documents
  for(const [
    $routePath, $documentPath
  ] of Object.entries(routePaths)) {
    const routeControl = Controls.Control({
      routePath: $routePath, 
      viewPath: $documentPath,
    })
    routes.get(`/${$routePath}/`, routeControl)
  }
  return routes
}

export default Routes