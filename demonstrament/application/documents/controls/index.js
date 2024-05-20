import * as Models from '../models/index.js'
import * as Views from '../views/index.js'

function Control($options = {}) {
	const { routePath, viewPath } = $options
	return function control($request, $response, $next) {
		$response.setTimeout(1000, () => {
			$response.sendStatus(408)
		})
		const viewModel = Models.Model({ viewPath })
		.then(($viewModel) => {
			const view = Views.View({
				viewPath, 
				viewModel: $viewModel
			}).then(($view) => {
				$response.send($view)
			})
		})
	}
}

export { Control }