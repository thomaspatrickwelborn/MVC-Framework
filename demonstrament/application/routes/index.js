import { Router } from 'express'
import * as Controls from '../controls/index.js'

function Routes($settings = {}) {
	const { paths } = $settings
	// Routes
	const routes = Router({ strict: true })
	// Test Paths
	const testRoutePaths = paths
	for(const [
		$testRoutePath, $testViewPath
	] of Object.entries(testRoutePaths)) {
		const testRouteControl = Controls.Control({
			routePath: $testRoutePath, 
			viewPath: $testViewPath
		})
		routes.get(`/${$testRoutePath}/`, testRouteControl)
	}
	return routes
}

export default Routes