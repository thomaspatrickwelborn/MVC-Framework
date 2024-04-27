import Schema from '/mvc-framework/Model/Schema/index.js'
export default function subtestB() {
	const schema = new Schema({
		aaa: Array,
		bbb: [{
			ccc: String,
			ddd: Number,
			eee: Boolean,
		}]
	})
	schema.addProps({
		bbb: [{
			ccc: String,
			ddd: Number,
			eee: Boolean,
		}]
	})
	schema.addProps({
		bbb: [{
			ccc: Boolean,
			ddd: String,
			eee: Number,
		}]
	})
	schema.addProps({
		bbb: [{
			ccc: Boolean,
			ddd: String,
			eee: Number,
		}]
	})
	console.log(schema)
}