import Schema from '/mvc-framework/Model/Schema/index.js'
import Content from '/mvc-framework/Model/Content/index.js'

function DOMContentLoaded($event) {
	const schema = new Schema({
		aaa: Array,
		bbb: [{
			ccc: String,
			ddd: Number,
			eee: Boolean,
		}]
	})
	console.log(schema)
	// const content = new Content({
	// 	aaa: [1, 2, 3, 4, 5],
	// 	bbb: [{
	// 		ccc: 'CCC',
	// 		ddd: 444,
	// 		eee: false
	// 	}, {
	// 		ccc: 'CCCCCC',
	// 		ddd: 444444,
	// 		eee: true
	// 	}]
	// }, schema)
}

document.addEventListener(
	'DOMContentLoaded', DOMContentLoaded
)
