import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'

function DOMContentLoaded($event) {
	subtestA()
}

function subtestA() {
	const array = new DynamicEventTarget([])
	console.log(array.push(123,456,789))
	// console.log(array.fromEntries())
	
	console.log(array.with(2, 78910))
	array[2] = 78910
	console.log(array.assign({ 0: 123123 }))
	console.log(array)
	// const object = new DynamicEventTarget({})
	// object.assign({ a: 1, b: 2, c: 3 })
	// console.log(object.assign)
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
