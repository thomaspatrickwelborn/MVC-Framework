import { View } from '/mvc-framework/index.js'
import Header from './header/index.js'


export default function subtestB() {
	const {
		headerView,
		headerModel,
	} = Header()
	function insertHeader() {
		appView.selectors.header[0]
		.replaceChildren(...headerView.element.content.children)
	}
	const appView = new View({
		element: document.querySelector('app'),
		selectors: {
			header: ':scope > header',
			main: ':scope > main',
			footer: ':scope > footer',
		},
		events: {},
	}, { enable: true })
	insertHeader()
}