import { Model, View, Control } from '/mvc-framework/index.js'

function setA($event) { console.log($event.detail) }
function setB($event) { console.log($event.detail) }

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
		events: {
			content: {
				'set:aaa': setA,
				'set:bbb': setB,
			}
		},
	})
	model.content.aaa = true
	model.enableEventListeners()
	model.content.aaa = false
	model.disableEventListeners()
	model.content.aaa = true
	model.removeEvents({
		content: [{
			name: 'set:aaa',
			target: ':scope',
			callback: setA,
		}]
	})
	model.content.aaa = false
	model.enableEventListeners()
	model.content.aaa = true
	model.addEvents({
		content: [{
			name: 'set:aaa',
			target: ':scope',
			callback: setA,
		}]
	})
	model.content.aaa = false
	model.enableEventListeners()
	model.content.aaa = true
	model.disableEventListeners({
		content: [{
			name: 'set:aaa',
			target: ':scope',
			callback: setA,
		}]
	})
	model.content.aaa = false
	model.enableEventListeners({
		content: [{
			name: 'set:aaa',
			target: ':scope',
			callback: setA,
		}]
	})
	model.content.aaa = true
	// model.addEvents({
	// 	content: [{
	// 		name: 'set:aaa',
	// 		target: ':scope',
	// 		callback: setA,
	// 	}, {
	// 		name: 'set:bbb',
	// 		target: ':scope',
	// 		callback: setB,
	// 	}]
	// })
	// model.removeEvents({
	// 	content: [{
	// 		name: 'set:bbb',
	// 		target: ':scope',
	// 		callback: setB,
	// 	}]
	// })
	// model.content.aaa = false	
	// model.disableEventListeners()
	// model.content.bbb = 10	

}

document.addEventListener(
	'DOMContentLoaded', DOMContentLoaded
)