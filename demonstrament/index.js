import '#utils/persist/index.js'
import express, { Router } from 'express'
import ejs from 'ejs'
const router = Router({ strict: true })
const viewNames = [
	'a', 'b', 'c', 'd', 'e',
	'f', 'g', 'h', 'i',
]
for(const $viewName of viewNames) {
	router.get(`/${$viewName}/`, async ($req, $res, $next) => {
		const pageData = await import('./views/a/index.json', {
			assert: { type: 'json' }
		}).then(($module) => $module.default)
		const pageView = await ejs.renderFile('./templates/html5/index.ejs', pageData, {
			localsName: '$data',
			async: true,
		})
		$res.send(pageView)
	})
}
const app = express()
app.use(express.static('views'))
app.use(express.static('test'))
app.use(router)
app.listen(3000, () => {
	console.log('Listen To The Sound Of Silence')
})
