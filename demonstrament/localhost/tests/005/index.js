import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'

function DOMContentLoaded($event) {
	subtestA()
}

function subtestA() {
	const object = new DynamicEventTarget({})
	object.assign({ a: 1, b: 2, c: 3 })
	console.log(object.content)
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
