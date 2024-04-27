import Schema from '/mvc-framework/Model/Schema/index.js'
import Content from '/mvc-framework/Model/Content/index.js'
export default function subtestB() {
	const schema = new Schema({
		aaa: Array,
		bbb: [{
			ccc: String,
			ddd: Number,
			eee: Boolean,
		}]
	})
	const content = new Content({
		aaa: [1, 2, 3, 4, 5],
		bbb: [{
			ccc: 'CCC',
			ddd: 444,
			eee: false
		}, {
			ccc: 'CCCCCC',
			ddd: 444444,
			eee: true
		}]
	}, schema)
	// schema.addProps({
	// 	bbb: [{
	// 		ccc: String,
	// 		ddd: Number,
	// 		eee: Boolean,
	// 	}]
	// })
	// schema.addProps({
	// 	bbb: [{
	// 		ccc: Boolean,
	// 		ddd: String,
	// 		eee: Number,
	// 	}]
	// })
	// schema.addProps({
	// 	bbb: [{
	// 		ccc: Boolean,
	// 		ddd: String,
	// 		eee: Number,
	// 	}]
	// })
	console.log(schema)
}