import { Model, View, Control } from '/mvc-framework/index.js'

function setA($event) {
	console.log($event.detail)
}
function setB($event) {
	console.log($event.detail)
}
function setC($event) {
	console.log($event.detail)
}

function DOMContentLoaded($event) {
	const model = new Model({
		schema: {
			aaa: Boolean,
			bbb: Number,
		},
		content: {
			aaa: false,
			bbb: 0,
		},
		// events: {
		// 	content: {
		// 		'set:aaa': setA,
		// 		'set:bbb': setB,
		// 	}
		// },
	})
	model.content.aaa = true
	model.content.bbb = 3
	model.content.addProps({
		ccc: "CCC"
	})
	model.schema.addProps({
		ccc: String,
	})
	model.content.addProps({
		ccc: "CCC"
	})
	model.addEvents({
		content: {
			'set:ccc': setC,
		}
	}).enableEventListeners()
	model.content.ccc = "CCCCCC"
	console.log('-----')
	console.log(model.schema)
	console.log(model.content.toObject())
	console.log(model.content)
	model.schema.removeProps({
		ccc: null,
	})
	model.content.removeProps({
		ccc: null,
	})
	console.log('-----')
	console.log(model.schema)
	console.log(model.content)
	console.log(model.content.toObject())
}



document.addEventListener(
	'DOMContentLoaded', DOMContentLoaded
)