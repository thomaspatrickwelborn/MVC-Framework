import testA from './testA.js'
import testB from './testB.js'
import testC from './testC.js'
import testD from './testD.js'

function DOMContentLoaded($event) {
	testD()
	// testC()
	// testB()
	// testA()
}

document.addEventListener(
	'DOMContentLoaded', DOMContentLoaded
)
