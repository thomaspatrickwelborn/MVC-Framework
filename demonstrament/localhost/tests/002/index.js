import Schema from '/mvc-framework/Model/Schema/index.js'

function DOMContentLoaded($event) {
	const schema = new Schema({
		aaa: Array,
		bbb: [{
			ccc: String,
			ddd: Number,
			eee: Boolean,
		}]
	})
	// schema.removeProps({
	// 	bbb: [{
	// 		ccc: String,
	// 		ddd: Number,
	// 		eee: Boolean,
	// 	}]
	// })
	schema.removeProps([
		'bbb.0'
	])
	console.log(schema)
	schema.removeProps(['bbb'])
	console.log(schema)
	schema.addProps({
		bbb: []
	})
	console.log(schema)
	schema.addProps({
		bbb: [{
			ccc: String,
			ddd: Number,
			eee: Boolean,
		}]
	})
	console.log(schema)
}

document.addEventListener(
	'DOMContentLoaded', DOMContentLoaded
)
