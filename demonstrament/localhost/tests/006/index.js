import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'

function DOMContentLoaded($event) {
	subtestG()
	// subtestF()
	// subtestE()
	// subtestD()
	// subtestC()
	// subtestB()
	// subtestA()
}

function subtestG() {
	console.log('-----', '\n', 'subtestE', '\n', '-----')
	const array = new DynamicEventTarget([])
	array.addEventListener(
		'copyWithin', ($event) => console.log($event.type, $event.detail)
	)
	array.addEventListener(
		'copyWithinIndex', ($event) => console.log($event.type, $event.detail)
	)
	array.push(1,2,3,4,5,6,7,8,9)
	console.log(array.copyWithin(0, 3))
}

// Array Fill
function subtestF() {
	console.log('-----', '\n', 'subtestE', '\n', '-----')
	const array = new DynamicEventTarget([])
	array.addEventListener(
		'fill', ($event) => console.log($event.type, $event.detail)
	)
	array.addEventListener(
		'fillIndex', ($event) => console.log($event.type, $event.detail)
	)
	array.length = 3
	console.log(array.fill(123456789, 0, 3))
}

// Array Splice
function subtestE() {
	console.log('-----', '\n', 'subtestE', '\n', '-----')
	const array = new DynamicEventTarget([])
	array.addEventListener(
		'splice', ($event) => console.log($event.type, $event.detail)
	)
	array.addEventListener(
		'spliceAdd', ($event) => console.log($event.type, $event.detail)
	)
	array.addEventListener(
		'spliceDelete', ($event) => console.log($event.type, $event.detail)
	)
	array.push(1,2,3,4,5,6,7,8,9)
	array.splice(5,3,1,-1,-3,-5)
}

// Array Pop
// Array Shift
function subtestD() {
	console.log('-----', '\n', 'subtestD', '\n', '-----')
	const array = new DynamicEventTarget([])
	array.addEventListener(
		'shift', ($event) => console.log($event.type, $event.detail)
	)
	array.addEventListener(
		'pop', ($event) => console.log($event.type, $event.detail)
	)
	console.log(array.push(1,2,3,4,5,6,7,8,9))
	console.log(array.shift())
	console.log(array.pop())
}

// Array Push
function subtestC() {
	console.log('-----', '\n', 'subtestC', '\n', '-----')
	const array = new DynamicEventTarget([])
	array.addEventListener(
		'push', ($event) => console.log($event.type, $event.detail)
	)
	array.addEventListener(
		'pushProp', ($event) => console.log($event.type, $event.detail)
	)
	console.log(array.push(1,2,3,4,5,6,7,8,9))
}

// Array Unshift
function subtestB() {
	console.log('-----', '\n', 'subtestB', '\n', '-----')
	const array = new DynamicEventTarget([])
	array.addEventListener(
		'unshift', ($event) => console.log($event.type, $event.detail)
	)
	array.addEventListener(
		'unshiftProp', ($event) => console.log($event.type, $event.detail)
	)
	console.log(array.unshift(1,2,3,4,5,6,7,8,9))
}

// Map Get, Set, Delete
function subtestA() {
	console.log('-----', '\n', 'subtestA', '\n', '-----')
	const map = new DynamicEventTarget(new Map())
	console.log(map)
	map.addEventListener(
		'set', ($event) => console.log($event.type, $event.detail)
	)
	map.addEventListener(
		'set:a', ($event) => console.log($event.type, $event.detail)
	)
	map.addEventListener(
		'get', ($event) => console.log($event.type, $event.detail)
	)
	map.addEventListener(
		'get:a', ($event) => console.log($event.type, $event.detail)
	)
	map.addEventListener(
		'delete', ($event) => console.log($event.type, $event.detail)
	)
	map.addEventListener(
		'delete:a', ($event) => console.log($event.type, $event.detail)
	)
	console.log(map.set('a', 1))
	console.log(map.get('a'))
	console.log(map.delete('a'))
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
