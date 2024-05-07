import DynamicEventTarget from '/mvc-framework/Core/DynamicEventTarget/index.js'

function DOMContentLoaded($event) {
	subtestH()
	// subtestG()
	// subtestF()
	// subtestE()
	// subtestD()
	// subtestC()
	// subtestB()
	// subtestA()
}
function subtestH() {
	const object = new DynamicEventTarget({})
	object.addEventListener(
		'set', ($event) => console.log($event.detail)
	)
	object.addEventListener(
		'deleteProperty', ($event) => console.log($event.detail)
	)
	console.log(object.content)
	console.log(object.assign({
		a: 1, b: 2, c: 3, d: {
			e: 5, f: 6, g: 7
		}, h: {
			i: 9, j: 10, k: 11,
		}
	}))
	console.log(object.content)
	console.log(object.assign({ a: { b: 3, c: 4 } }))
	console.log(object)
}
function subtestG() {
	const object = new DynamicEventTarget({})
	object.addEventListener(
		'set', ($event) => console.log($event.detail)
	)
	object.addEventListener(
		'deleteProperty', ($event) => console.log($event.detail)
	)
	object.assign({
		a: 1,
		b: 2,
		c: 3,
		d: {
			e: 5,
			f: 6,
			g: 7,
		},
	})
	console.log(object.entries())
}

function subtestF() {
	const object = new DynamicEventTarget({})
	object.addEventListener(
		'set', ($event) => console.log($event.detail)
	)
	object.addEventListener(
		'deleteProperty', ($event) => console.log($event.detail)
	)
	object.assign({
		a: "1",
		b: "2",
		c: "3",
		d: {
			e: 5,
			f: 6,
			g: 7,
			h: [8, 9, 10, 11, 12],
		},
	})
	object.defineProperty('i', {
		get() { return 'i' },
		set($i) {}
	})
	console.log(object.content)
	const newObject = object.create(object)
	console.log(newObject)
}

function subtestE() {
	const object = new DynamicEventTarget({})
	object.addEventListener(
		'set', ($event) => console.log($event.detail)
	)
	object.addEventListener(
		'deleteProperty', ($event) => console.log($event.detail)
	)
	object.assign({
		false: false,
		true: true,
		c: "C",
		zero: 0
	})
	object.assign({
		zero: {
			aaa: 111,
			bbb: 222,
			ccc: 333,
		}
	})
	object.defineProperty('aaa', {
		value: 3521356
	})
	object.defineProperties({
		bbb: { value: 5245266, writable: true },
		ccc: {
			get() { return this.bbb },
		}
	})
	object.assign({
		bbb: 22222222,
	})
	const newObject = object.create(object)
	console.log(newObject.false)
	console.log(newObject.true)
	console.log(newObject.c)
	console.log(newObject.zero)
	console.log(newObject.aaa)
	console.log(newObject.bbb)
	console.log(newObject.ccc)

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
