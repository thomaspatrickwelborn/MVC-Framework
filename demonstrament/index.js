import '#tensils/persist/index.js'
import Application from './application/index.js'

const application = await Application({
	'documents': {
		'research/MVC': 'localhost/research/MVC',
	}
})
