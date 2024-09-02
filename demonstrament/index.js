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
		'tests/MVC/DET/Object/assign': 'localhost/tests/MVC/DET/Object/assign',
		'tests/MVC/DET/Object/defineProperties': 'localhost/tests/MVC/DET/Object/defineProperties',
		'tests/MVC/DET/Object/defineProperty': 'localhost/tests/MVC/DET/Object/defineProperty',
		'tests/MVC/DET/Object/freeze': 'localhost/tests/MVC/DET/Object/freeze',
		'tests/MVC/DET/Object/seal': 'localhost/tests/MVC/DET/Object/seal',
		'tests/MVC/DET/Object/setPrototypeOf': 'localhost/tests/MVC/DET/Object/setPrototypeOf',
	}
})
