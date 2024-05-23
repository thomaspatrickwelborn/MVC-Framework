import '#tensils/persist/index.js'
import Application from './application/index.js'

const application = await Application({
	'database': {
		'/services/topics': ['get'],
		'/services/photos': ['get'],
	},
	'documents': {
		'tests/MVC/004': 'localhost/tests/MVC/004',
		'tests/MVC/003': 'localhost/tests/MVC/003',
		'tests/MVC/002': 'localhost/tests/MVC/002',
		'tests/MVC/001': 'localhost/tests/MVC/001',
		'tests/MVC/000': 'localhost/tests/MVC/000',
		'tests/MVC': 'localhost/tests/MVC',
		'tests/Model': 'localhost/tests/Model',
		'tests/Core': 'localhost/tests/Core',
		'tests/EventSystem': 'localhost/tests/EventSystem',
		'tests/DynamicEventTarget': 'localhost/tests/DynamicEventTarget',
		'tests/DynamicEventTarget/Array': 'localhost/tests/DynamicEventTarget/Array',
		'tests/DynamicEventTarget/EventTarget': 'localhost/tests/DynamicEventTarget/EventTarget',
		'tests/DynamicEventTarget/Object': 'localhost/tests/DynamicEventTarget/Object',
		'tests/DynamicEventTarget/Map': 'localhost/tests/DynamicEventTarget/Map',
		'tests': 'localhost/tests',
	}
})
