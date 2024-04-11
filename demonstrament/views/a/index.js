import { View } from '/mvc-framework/index.js'

const AppData = {
	header: 'HEADER',
	main: 'MAIN',
	footer: 'FOOTER',
}
const AppTemplate = ($data) => {
	return `<app id="app">
		<header>${$data.header}</header>
		<main>${$data.main}</main>
		<footer>${$data.footer}</footer>
	</app>`
}
function DOMContentLoaded($event) {
	const root = document.querySelector('body')
	const appView = new View({
		templates: { default: AppTemplate },
		selectors: {
			app: '#app',
			header: '#app > header',
			main: '#app > main',
			footer: '#app > footer',
		},
		events: {
			'header click': console.log,
		},
	}).render('default', AppData)
	root.insertAdjacentElement(
		'afterbegin', appView.content.firstChild
	)
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
