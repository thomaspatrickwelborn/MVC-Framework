import { Model, Control } from '/mvc-framework/index.js'

function DOMContentLoaded($event) {
	function setEventCallback($event) { console.log($event.detail) }
	var control = new Control({
		models: {
			model: new Model({
				content: {
					aaa: 'aaa',
					bbb: 'bbb',
					ccc: 'ccc,',
					ddd: {
						eee: 'eee',
						fff: 'fff',
						ggg: 'ggg,'
					},
				},
			})
		},
		events: {
			'models.model.content': {
				'set': setEventCallback,
				// 'set:aaa': setEventCallback,
				// 'set:ddd.eee': setEventCallback
			},
		},
	}, { enableEvents: true })
	// control.models.model.set('aaa', 'AAAAAA')
	control.models.model.set({
		ddd: {}
	})
	// control.removeEvents({
	// 	'models.model.content': {
	// 		'set:aaa': setAAA
	// 	}
	// })
	// control.models.model.set('aaa', 'aaaaaa')
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
