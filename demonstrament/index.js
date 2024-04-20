import { readFile } from 'node:fs/promises'
import '#utils/persist/index.js'
import express, { Router } from 'express'
import beautify from 'js-beautify'
import ejs from 'ejs'
// App Router Definitions
const router = Router({ strict: true })
// Test Routes
const testRoutePath = [
	// 'mvc-framework/___'
	'mvc-framework/001',
	'mvc-framework/002',
]
// Route Definitions
for(const $testRoutePath of testRoutePath) {
	// Route Definition
	router.get(`/${$testRoutePath}/`, async ($req, $res, $next) => {
		// Page Data
		const pageDataPath = `./tests/${$testRoutePath}/index.json`
		const pageData = await readFile(pageDataPath).then(
			($data) => JSON.parse($data.toString())
		)
		// Page View
		const pageView = await ejs.renderFile(
			'./templates/html5/index.ejs', 
			pageData, {
				localsName: '$data',
				async: true,
			}
		)
		// Page View Beautify
		const pageViewBeautify = beautify.html(pageView, {
			indent_size: 2,
			indent_char: " ",
			max_preserve_newlines: 0,
			brace_style: 'collapse',
		})
		// Response Send
		$res.send(pageViewBeautify)
	})
}
// App Definition
const application = express()
// Static Tests Filesystem
application.use(express.static('tests'))
// Static Temporary Filesystem
application.use(express.static('temporary'))
// Route Application
application.use(router)
// Poll Application
application.listen(3000, () => {
	console.log('Listen To The Sound Of Silence')
})
