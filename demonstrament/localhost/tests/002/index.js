import { Model, Control } from '/mvc-framework/index.js'

function DOMContentLoaded($event) {
	function setEventCallback($event) {
		console.log($event.type, $event.detail)
	}
	function deleteEventCallback($event) {
		console.log($event.type, $event.detail)
		// console.log($event)
	}
	var control = new Control({
		models: {
			model: new Model({
				content: {
					aaa: 'aaa',
					bbb: 222,
					ccc: false,
					ddd: {
						eee: 'eee',
						fff: 666,
						ggg: true
					},
				},
			})
		},
		events: {
			'models.model.content': {
				'set': setEventCallback,
				'delete': deleteEventCallback,
			},
		},
	}, { enableEvents: true })
	const controlModel = control.models.model
	controlModel.delete('aaa')
	controlModel.delete('ddd.eee')
	controlModel.set('aaa', 'AAA')
	controlModel.set('ddd.eee', 'EEE')
}

document.addEventListener(
	'DOMContentLoaded', DOMContentLoaded
)
