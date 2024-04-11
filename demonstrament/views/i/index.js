import {
	Model, View, Control
} from '/mvc-framework/index.js'


function DOMContentLoaded($event) {
	testA()
}

document.addEventListener(
	'DOMContentLoaded', DOMContentLoaded
)

function testA() {
	function modelSet($event) { console.log($event) }
	function viewClick($event) { console.log($event) }
	const model = new Model({
		schema: { aaa: String },
		content: { aaa: 'Hello All Dogs' },
	})
	const viewTemplate = ($data) => `<div class="aaa">${$data.aaa}</div>`
	const view = new View({
		templates: { viewTemplate },
		selectors: {
			aaa: 'div.aaa',
		},
	})
	.render('viewTemplate', model.content.toObject())
	.enableQuerySelectors()
	const control = new Control({
		models: { model },
		views: { view },
		events: {
			models: {
				'model.content set:aaa': modelSet,
			},
			views: {
				'view.querySelectors.aaa click': viewClick
			},
		}
	})
	.enableEventListeners()

	document
	.querySelectorAll('body')[0]
	.insertAdjacentElement('afterbegin', ...view.fragment.content.children)
}