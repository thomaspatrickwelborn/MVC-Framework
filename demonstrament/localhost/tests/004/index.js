import DynamicEventTarget from '/mvc-framework/Core/DynamicEventTarget/index.js'

function DOMContentLoaded($event) {
	subtestN()
	// subtestM()
	// subtestL()
	// subtestK()
	// subtestJ()
	// subtestI()
	// subtestH()
	// subtestG()
	// subtestF()
	// subtestE()
	// subtestD()
	// subtestC()
	// subtestB()
	// subtestA()
}

function subtestN() {
	// const object = new DynamicEventTarget({})
	const array = new DynamicEventTarget([1,2,3])
	console.log(array.length)
	
}

function subtestM() {
	const object = new DynamicEventTarget({
		aaa: {
			bbb: true,
			ccc: false,
		},
		ddd: {
			eee: {
				fff: false,
				ggg: true
			},
			hhh: {
				iii: false,
				jjj: true,
			},
		},
		kkk: [{
			lll: false,
			mmm: true,
			nnn: false
		}, true, false]
	})
	console.log(object.keys())
	console.log(object.aaa.keys())
	console.log(object.kkk.keys())
	console.log(object.values())
	console.log(object.aaa.values())
	console.log(object.kkk.values())
	// object.freeze()
	// const objectIsFrozen = object.isFrozen()
	// console.log(objectIsFrozen)
	// const object = new DynamicEventTarget({
	// 	aaa: {
	// 		bbb: 222,
	// 		ccc: 333,
	// 		ddd: 444,
	// 		eee: {
	// 			fff: 666,
	// 			ggg: 777,
	// 			hhh: 888,
	// 		},
	// 	},
	// 	iii: 999,
	// 	jjj: 101010,
	// 	kkk: 111111,
	// }, { recur: true })
	// const objectKeys = object.keys()
	// console.log(objectKeys)
	// object.keys().forEach(($key) => {
	// 	console.log($key.valueOf())
	// })
	// console.log(object.keys())
	// console.log([0].valueOf())
	// console.log(object.entries())
	// console.log(object.keys())
	// object.seal()
	// const objectIsSealed = object.isSealed()
	// console.log(objectIsSealed)
	// console.log(objectIsSealed.aaa)
	// console.log(objectIsSealed.valueOf())
	// console.log(objectIsSealed.aaa.valueOf())
}

function subtestL() {
	const object = new DynamicEventTarget({
		aaa: {
			bbb: 222,
			ccc: 333,
			ddd: 444,
		},
	}, { recur: true })
	// console.log(object.entries())
	// console.log(object.keys())
	object.seal()
	console.log(object.isSealed())
	// delete object.addEventListener
	// console.log(object.content.aaa)
	// console.log(object.keys())
	// object.assign({
	// 	a: {
	// 		b: { c: 'd', e: 'f', g: 'h' }
	// 	},
	// 	i: false,
	// 	j: true,
	// 	k: {
	// 		l: 'm', n: 'o', p: 'p'
	// 	}
	// })
	// console.log(object.fromEntries())
	// console.log(object.content.a.b.fromEntries())
	// console.log(object.content.a.b.getOwnPropertyDescriptor('c'))
	// console.log(object.getOwnPropertyDescriptors())
	// console.log(object.getOwnPropertyNames())
	// console.log(object.getOwnPropertyDescriptor('a'))
}

function subtestK() {
	const object = new DynamicEventTarget({}, { recur: true })
	object.assign({
		a: {
			b: 2,
			c: 3,
			d: 4,
		}
	})
	object.assign({
		a: {
			e: 5
		}
	})
	console.log(object.content.a)
	console.log(object.entries())
	// console.log(object.freeze())
	console.log(object.seal())
	object.assign({
		a: {
			b: 222
		}
	})
	console.log(object.content.a.b)
}

function subtestJ() {
	const object = new DynamicEventTarget({}, { recur: true })
	object.assign({
		a: 1,
		b: 2,
		c: 3,
	})
	object.defineProperties({
		_d: {
			enumerable: false,
			writable: true,
			value: 4,
		},
		d: {
			enumerable: true,
			get() { return this._d },
			set($d) { this._d = $d }
		}
	})
	console.log(object.d)
	object.assign({ d: 5 })
	console.log(object.d)
	object.d = 6
	console.log(object.content.d)
	object.content.d = 7
	console.log(object.content.d)
	object.assign({
		d: 8
	})	
	console.log(object.content.d)
	object.defineProperty('_e', {
		enumerable: false,
		writable: true,
		value: 5,
	})
	object.defineProperty('e', {
		enumerable: true,
		get() { return this._e },
		set($e) { this._e = $e }
	})
	console.log(object.content.e)
}

function subtestI() {
	const array = new DynamicEventTarget([], {
		recur: true
	})
	array.addEventListener(
		'set', ($event) => console.log($event.detail)
	)
	array.addEventListener(
		'deleteProperty', ($event) => console.log($event.detail)
	)
	// array.assign([1,2,3,45])
	// console.log(array.content)
	// array.assign([undefined, undefined, undefined, 4455])
	array.length = 5
	array.assign({ 3: 5 })
	array.assign({5: [1,23,4,5]})
	console.log(array.length)
	array.forEach((
		$arrayItem, $arrayItemIndex
	) => console.log($arrayItemIndex, $arrayItem))
	array.defineProperties({
		'0': {
			get() { return 'meh' },
			set($0) {
				console.log('heh')
			},
		}
	})
	// array[3] = 5
	// Object.assign(array.content, { 3: 5 })
	array.assign({
		'0': 555
	})
	console.log(array[0])
	console.log(array.content)
	console.log(array.entries())
	console.log(array.fromEntries())
	console.log(array.values())
	console.log(array.keys())
	array.seal()
	array.push(0)
}

function subtestH() {
	const object = new DynamicEventTarget({}, {
		recur: true
	})
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
