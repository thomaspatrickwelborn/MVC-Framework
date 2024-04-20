import { Model } from '/mvc-framework/index.js'

export default function testB() {
	const model = new Model()
	model.set('a', 1)
	// console.log(model.get('a'))
	model.addProps({
		a: 1
	}, {
		a: Number
	})
	// console.log(model.get('a'))
	model.addProps({
		b: "BBB"
	}, {
		b: String
	})
	// console.log(model.get('b'))
	model.set('c', true)
	// console.log(model.get('c'))
	model.addProps({
		c: true
	})
	// console.log(model.get('c'))
	model.addProps({
		d: {}
	}, {})
	// console.log(model.get('d'))
	model.addProps({
		d: {
			e: "EEE",
			f: 555,
			g: false,
		}
	})
	// console.log(model.get('d.e'))
	// console.log(model.get('d.f'))
	// console.log(model.get('d.g'))
	model.set({
		d: {
			e: 555,
			f: "EEE",
			g: 0
		}
	})
	console.log(model.get('d.e'))
	console.log(model.get('d.f'))
	console.log(model.get('d.g'))
	console.log(model.schema)
	console.log(model.content)
	model.removeProps({
		d: null
	})
	try{
		console.log(model.get('d.e'))
		console.log(model.get('d.f'))
		console.log(model.get('d.g'))
	} catch($err) {
		console.log($err)
	}
	console.log(model.schema)
	console.log(model.content)
	
}