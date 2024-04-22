import { subtestA, subtestB } from './subtests/index.js'

function DOMContentLoaded($event) {
	subtestB()
	// subtestA()
}

document.addEventListener(
	'DOMContentLoaded', DOMContentLoaded
)
