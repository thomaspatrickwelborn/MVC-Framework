import { Model, View, Control } from '/mvc-framework/index.js'

const ViewData = {
	header: 'HEADER',
	main: 'MAIN',
	footer: 'FOOTER',
}
const ViewTemplate = ($data) => {
	return `<app id="app">
		<header>${$data.header}</header>
		<main>${$data.main}</main>
		<footer>${$data.footer}</footer>
	</app>`
}

function appClick($event) { console.log($event) }
function headerClick($event) { console.log($event) }
function mainClick($event) { console.log($event) }
function footerClick($event) { console.log($event) }

function DOMContentLoaded($event) {
	const root = document.querySelector('body')
	const view = new View({
		templates: { default: ViewTemplate },
		selectors: {
			app: '#app',
			header: '#app > header',
			main: '#app > main',
			footer: '#app > footer',
		},
		events: {
			querySelectors: {
				'header click': headerClick,
				'main click': mainClick,
				'footer click': footerClick,
			},
		},
	})
	.render('default', ViewData)
	view.enableQuerySelectors()
	view.enableEventListeners()
	root.insertAdjacentElement(
		'afterbegin', view.fragment.content.firstChild
	)
	// setTimeout(() => {
	// 	view.disableEventListeners()
	// 	view.removeEvents()
	// 	view.addEvents({
	// 		querySelectors: [{
	// 			name: 'click',
	// 			target: 'app',
	// 			callback: appClick,
	// 		}]
	// 	})
	// }, 5000)
}


document.addEventListener(
	'DOMContentLoaded', DOMContentLoaded
)