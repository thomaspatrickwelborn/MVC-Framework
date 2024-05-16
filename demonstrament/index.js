import '#tensils/persist/index.js'
import Application from './application/index.js'

const application = Application({
	paths: {
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
