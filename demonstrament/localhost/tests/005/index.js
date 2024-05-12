import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'

function DOMContentLoaded($event) {
	subtestF()
	// subtestE()
	// subtestD()
	// subtestC()
	// subtestB()
	// subtestA()
}

function subtestF() {
	const array = new DynamicEventTarget([])
	array.addEventListener('fillIndex', ($event) => console.log($event.type, $event.detail))
	array.addEventListener('fill', ($event) => console.log($event.type, $event.detail))
	array.length = 10
	array.fill(123, 8, 12)
	console.log(array.content)
}

function subtestE() {
	const testArraySet = [0,1,2,3,4,5,6,7,8,9]
	const array = new DynamicEventTarget([])
	const array2 = []
	// array.addEventListener('push', ($event) => console.log($event.type, $event.detail))
	// array.addEventListener('pushProp', ($event) => console.log($event.type, $event.detail))
	array.addEventListener('spliceAdd', ($event) => console.log($event.type, $event.detail))
	array.addEventListener('spliceDelete', ($event) => console.log($event.type, $event.detail))
	array.addEventListener('splice', ($event) => console.log($event.type, $event.detail))
	array.splice(0, 0, 123, 456, 789)
	array2.splice(0, 0, 123, 456, 789)
	array.splice(0, 1, 112233)
	array2.splice(0, 1, 112233)
	array.splice(1, 1, 445566)
	array2.splice(1, 1, 445566)
	array.splice(2, 1, 778899)
	array2.splice(2, 1, 778899)
	array.splice(3, 0, 101112)
	array2.splice(3, 0, 101112)
	array.splice(4, 0, 131415)
	array2.splice(4, 0, 131415)
	array.splice(3)
	array2.splice(3)
	console.log(array.content)
	console.log(array2)
}

function subtestD() {
	const object = new DynamicEventTarget({})
	object.addEventListener('defineProperties', ($event) => console.log($event.type, $event.detail))
	object.addEventListener('defineProperty', ($event) => console.log($event.type, $event.detail))
	object.addEventListener('defineProperty:aaa', ($event) => console.log($event.type, $event.detail))
	object.addEventListener('defineProperty:bbb', ($event) => console.log($event.type, $event.detail))
	object.addEventListener('defineProperty:ccc', ($event) => console.log($event.type, $event.detail))
	object.addEventListener('assign', ($event) => console.log($event.type, $event.detail))
	object.addEventListener('assignSource', ($event) => console.log($event.type, $event.detail))
	object.addEventListener('assignSourceProperty', ($event) => console.log($event.type, $event.detail))
	object.addEventListener('assignSourceProperty:aaa', ($event) => console.log($event.type, $event.detail))
	object.addEventListener('assignSourceProperty:bbb', ($event) => console.log($event.type, $event.detail))
	object.addEventListener('assignSourceProperty:ccc', ($event) => console.log($event.type, $event.detail))

	object.defineProperties({
		aaa: { writable: true, value: 111 },
		bbb: { writable: true, value: 222 },
		ccc: { writable: true, value: 333 },
	})
	object.assign({
		aaa: 111111,
		bbb: 222222,
		ccc: 333333,
	})
}

function subtestC() {
	const map = new DynamicEventTarget(new Map())
	map.set('a', 1)
	map.set('b', 2)
	console.log(map.content)
	map.clear()
	console.log(map.content)
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
