import '#tensils/persist/index.js'
import Application from './application/index.js'

const application = await Application({
	'documents': {
		'tests/MVC/007': 'localhost/tests/MVC/007',
		'tests/MVC/006': 'localhost/tests/MVC/006',
		'tests/MVC/005': 'localhost/tests/MVC/005',
		'tests/MVC/004': 'localhost/tests/MVC/004',
		'tests/MVC/003': 'localhost/tests/MVC/003',
		'tests/MVC/002': 'localhost/tests/MVC/002',
		'tests/MVC/001': 'localhost/tests/MVC/001',
		'tests/MVC/000': 'localhost/tests/MVC/000',
		'tests/MVC': 'localhost/tests/MVC',
		'tests': 'localhost/tests',
		'tests/MVC': 'localhost/tests/MVC',
	}
})
