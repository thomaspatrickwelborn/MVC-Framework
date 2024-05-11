import '#tensils/persist/index.js'
import Application from './application/index.js'

const application = Application({
	paths: {
		'tests': 'localhost/tests',
		'tests/005': 'localhost/tests/005',
		'tests/004': 'localhost/tests/004',
		'tests/003': 'localhost/tests/003',
		'tests/002': 'localhost/tests/002',
		'tests/001': 'localhost/tests/001',
		'tests/000': 'localhost/tests/000',
	}
})
