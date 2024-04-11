import { Model, View, Control } from '/mvc-framework/index.js'

function switchContentSet($event) { switch($event.detail.path) {
	case 'a':
		console.log($event.detail)
		break
	case 'b':
		console.log($event.detail)
		break
	case 'c':
		console.log($event.detail)
		break
	case 'c.d':
		console.log($event.detail)
		break
}}

function DOMContentLoaded($event) {
	const model = new Model({
		schema: {
			a: Number,
			b: Boolean,
			c: {
				d: Number,
			},
		},
		content: {
			a: 1000,
			b: true,
			c: {
				d: 10000,
			},
		},
		events: {
			content: {
				'set': switchContentSet,
			},
		},
	})
	model.content.a = 2000
	model.content.b = false
	model.content.c.d = 20000
	model.content.c = { d: 30000 }
}

document.addEventListener(
	'DOMContentLoaded', DOMContentLoaded
)