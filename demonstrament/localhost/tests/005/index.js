import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'

function DOMContentLoaded($event) {
	subtestB()
	// subtestA()
}

function subtestB() {
	const object = new DynamicEventTarget({})
	object['a'] = 0
	console.log(object.a)
	object.content.a = 0
	console.log(object.content.a)
	object.defineProperty('b', { value: 5, enumerable: true })
	console.log(object.content.b)
	object.assign({ c: 777 })
	console.log(object.content.c)
	console.log(object.content)
	console.log(object.fromEntries())
	// console.log(object.defineProperties({
	// 	a: { value: 3 }
	// }))
	// console.log(object.content.a)
	// object.assign({ a: 0 })
	// console.log(object.content.a)
}

function subtestA() {
	const array = new DynamicEventTarget([])
	console.log(array.push(123,456,789))
	// console.log(array.fromEntries())
	
	console.log(array.with(2, 78910))
	array[2] = 78910
	console.log(array.assign({ 0: 123123 }))
	console.log(array.getOwnPropertyDescriptors())
	array.length = 10
	array.fill(988877321345, 5, 10)
	console.log(array)
	array[4] = 33
	console.log(array[4])
	array.addEventListener = 33
	console.log(array.addEventListener)
	console.log(array.content.addEventListener)

	// const object = new DynamicEventTarget({})
	// object.assign({ a: 1, b: 2, c: 3 })
	// console.log(object.assign)
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
