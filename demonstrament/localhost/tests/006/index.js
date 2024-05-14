import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'

function DOMContentLoaded($event) {
	subtestA()
}

function subtestA() {}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
