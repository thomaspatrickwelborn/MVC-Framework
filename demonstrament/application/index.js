import express from 'express'
import Routes from './routes/index.js'

function Application($settings = {}) {
	const { paths } = $settings
	const routes = Routes({ paths })
	const application = express()
	application.use(express.static('localhost'))
	application.use(express.static('temporary'))
	application.use(routes)
	application.listen(3000, () => {
		console.log('Listen To The Sound Of Silence')
	})
	return application
}

export default Application