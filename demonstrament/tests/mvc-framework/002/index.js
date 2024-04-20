import testA from './testA.js'
import testB from './testB.js'
import testC from './testC.js'

function DOMContentLoaded($event) {
	testC()
	// testB()
	// testA()
}

document.addEventListener(
	'DOMContentLoaded', DOMContentLoaded
)
