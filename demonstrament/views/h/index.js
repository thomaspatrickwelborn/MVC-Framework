import {
	Model, View, Control
} from '/mvc-framework/index.js'


function DOMContentLoaded($event) {
	// testA()
	// testB()
	// testC()
	// testD()
	testE()
}

document.addEventListener(
	'DOMContentLoaded', DOMContentLoaded
)

function testE() {
	const model = new Model()
	model.addProps({
		schema: {
			a: String
		}
	})
	model.addProps({
		content: {
			a: "1",
		}
	})
	// console.log(model.schema)
	model.content.a = "3"
	console.log(model.content)

}

function testD() {
	function setA($event) {
		console.log($event)
	}
	function setDE($event) {
		console.log($event)
	}
	const model = new Model({
		schema: {
			a: Number,
			b: Boolean,
			c: String,
			d: {
				e: Number,
				f: Boolean,
				g: String,
			},
		},
		content: {
			a: 100,
			b: false,
			c: "100",
			d: {
				e: 200,
				f: true,
				g: "200"
			},
		},
		events: {
			// content: {
				// ':scope set:d.e': setDE,
				// ':scope.d set:e': setDE,
			// },
		}
	})//.enableEventListeners()
	// model.content.a = 300
	// model.content.a = 400
	// model.content.a = 500
	// model.disableEventListeners()
	// model.enableEventListeners()
	// model.disableEventListeners()
	// model.enableEventListeners()
	model.addEvents({
		content: {
			':scope set:d.e': setDE,
			':scope.d set:e': setDE,
		},
	})
	model.enableEventListeners()
	console.log(model.events)
	model.content.d.e = 300
	model.disableEventListeners()
	model.content.d.e = 3000
	console.log(model.events)
}

function testC() {
	var model = new Model({
		schema: {
			a: Number
		},
		content: {
			a: 333
		}
	})
	model
	.addProps({ a: String }, { a: '333' })
	model.removeProps({ a: null }, { a: null })
}

function testB() {
	const model = new Model({
		schema: {},
		content: {},
		events: {},
	})
	model.addProps({
		a: 333
	}, {
		a: Number
	})
	console.log(model.schema)
	console.log(model.content.toObject())
	model.removeProps({
		a: null
	}, {
		a: null
	})
	console.log(model.schema)
	console.log(model.content.toObject())
	model.addProps({
		a: 333
	})
	console.log(model.schema)
	console.log(model.content.toObject())
	model.addProps({
		a: 333
	}, {
		a: Number
	})
	model.addProps({}, {
		b: String,
	})
	model.addProps({
		b: "333"
	})
	model.removeProps({
		a: null,
		b: null,
	})
	model.addProps({
		a: 333,
		b: '333',
	})
	console.log(model.schema)
	console.log(model.content.toObject())
}

function testA() {
	const model = new Model({
		schema: {},
		content: {},
		events: {},
	})
	model.schema.addProps({
		a: String,
		b: Number,
		c: Boolean,
	})
	model.schema.addProps({
		d: {
			e: String,
			f: Number,
			g: Boolean,
		}
	})
	model.schema.removeProps({
		d: {
			g: null
		}
	})
	console.log(model.schema)
}