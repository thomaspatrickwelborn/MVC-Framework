import Content from '/mvc-framework/Model/Content/index.js'
import Schema from '/mvc-framework/Model/Schema/index.js'
import SchemaArray from '/mvc-framework/Model/Schema/SchemaArray/index.js'

export default function subtestC() {
	const SchemaA = new Schema({
		aaa: String,
		bbb: Number,
		ccc: Boolean,
	})
	const SchemaB = new Schema({
		ddd: String,
		eee: Number,
		fff: Boolean,
	})
	const schema = new Schema({
		ggg: new SchemaArray({
			SchemaA,
			SchemaB,
		}),
		hhh: new SchemaArray({
			String, 
			Number, 
			Boolean
		}),
		iii: String,
		jjj: Number,
		kkk: Boolean,
	})
	console.log(schema.iii)
	schema.removeProps('iii')
	console.log(schema.iii)
	console.log(schema.ggg)
	schema.ggg.removeProps({
		SchemaA
	})
	console.log(schema.ggg)
	// console.log('-----')
	// console.log(schema.kkk)
	// schema.removeProps('kkk')
	// console.log(schema.kkk)
	// console.log('-----')
	// console.log(schema.hhh)
	// schema.hhh.removeProps({ Boolean })
	// console.log(schema.hhh)
	// console.log(schema.ggg)
	// schema.ggg.removeProps({ SchemaB })
	// console.log(schema.ggg)

}