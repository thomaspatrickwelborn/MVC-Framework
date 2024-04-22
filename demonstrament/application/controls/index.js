import * as Models from '../models/index.js'
import * as Views from '../views/index.js'

function Control($options = {}) {
	const { routePath, viewPath } = $options
	return async function control($req, $res, $next)  {
		$res.setTimeout(1000, () => {
			$res.sendStatus(408)
		})
		const viewModel = await Models.Model({ viewPath })
		const view = await Views.View({
			viewPath, viewModel: viewModel
		})
		$res.send(view)
	}
}

export { Control }