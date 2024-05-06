import DynamicEventTarget from '/mvc-framework/Core/DynamicEventTarget/index.js'

function DOMContentLoaded($event) {
	subtestD()
	// subtestC()
	// subtestB()
	// subtestA()
}

function subtestD() {
	const array = new DynamicEventTarget([])
	array.push(0)
	console.log(array.content)
	// const object = new DynamicEventTarget({})
	// object.set('a', 1)
	// console.log(object.get())
	// console.log(object.get)
	// console.log(object.set)
	// console.log(object.delete)
	// object.addEventListener(
	// 	'set', ($event) => console.log($event.detail)
	// )
	// object.addEventListener(
	// 	'deleteProperty', ($event) => console.log($event.detail)
	// )
	// object.set('a', 111)
	// object.set('b', { c: 333 })
	// object.get('b').set('c', 333)
	// object.get('b').set('d', {
	// 	e: 444
	// })
	// object.aaa = "meh"
	// object.content.aaa = "meh"
	// console.log(object.get('b'))
	// object.deleteProperty()
	// object.get('b').get('d').set('f', 666)
	// object.get('b').set('d', {
	// 	e: 444444,
	// 	f: 666666,
	// })
	// object.set('b', {
	// 	c: 3,
	// 	d: 4,
	// 	e: [5, {
	// 		f: 6
	// 	}]
	// })
	// object.a = 111
}

function subtestC() {
	const array = new DynamicEventTarget([])
	array.addEventListener(
		'set', ($event) => console.log($event.detail)
	)
	array.addEventListener(
		'deleteProperty', ($event) => console.log($event.detail)
	)
	// array.push(0)
	// console.log(array.content)
	// array.push(1,2,3)
	// console.log(array.content)
	// array.unshift(3,2,1)
	// console.log(array.content)
	// array.shift()
	// console.log(array.content)
}

function subtestB() {
	const object = new DynamicEventTarget()
	// console.log(object.addEventListener.constructor.prototype)
	object.content.addEventListener = "addEventListener"
	object.meh = "MEH"
	object.content.meh = "MEH"
	console.log(object.meh)
	console.log(object.content.meh)
	console.log(object.content)
	console.log(object.addEventListener)
	object.addEventListener = 'removeEventListener'
	console.log(object.addEventListener)
	console.log(object.content.addEventListener)
	object.content.addEventListener = 'removeEventListener'
	// SET

	// GET
}

function subtestA() {
	const object = new DynamicEventTarget(/*{
		aaa: 'AAA',
		bbb: 'BBB',
		ccc: 'CCC',
		ddd: {
			eee: 'EEE',
			fff: 'FFF',
			ggg: 'GGG',
		},
	}*/)
	// object.addEventListener(
	// 	'set', ($event) => console.log($event.type, $event.detail)
	// )
	// object.addEventListener(
	// 	'set:aaa', ($event) => console.log($event.type, $event.detail)
	// )
	// object.addEventListener(
	// 	'set:ddd.eee', ($event) => console.log($event.type, $event.detail)
	// )
	// object.content.aaa = 'AAAAAA'
	object.aaa = 'aaaaaa'
	console.log(object.aaa)
	// object.ddd = {}
	// console.log(object.ddd)
	// console.log(object.content.aaa)
	// console.log(object.content.ddd)
	// object.content.ddd.eee = 'EEEEEE'
}

document.addEventListener(
	'DOMContentLoaded', 
	DOMContentLoaded
)
