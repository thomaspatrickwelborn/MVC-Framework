import { View } from '/mvc-framework/index.js'

export default function subtestA() {
	function headerClick($event) {
		console.log(this)
	}
	function mainClick($event) {
		console.log(this)
	}
	function footerClick($event) {
		console.log(this)
	}
	const view = new View({
		element: document.querySelector('app'),
		selectors: {
			header: ':scope header',
			main: ':scope main',
			footer: ':scope footer',
		},
		events: {
			'header click': headerClick,
			'main click': mainClick,
			'footer click': footerClick,
		},
	}, { enable: true })
	
	setTimeout(() => {
		for(const $element of view.selectors.header) {
 			$element.dispatchEvent(new MouseEvent('click'))
 			$element.setAttribute('data-clicked', true)
		}
	}, 500)
	setTimeout(() => {
		for(const $element of view.selectors.main) {
 			$element.dispatchEvent(new MouseEvent('click'))
 			$element.setAttribute('data-clicked', true)
		}
	}, 1000)
	setTimeout(() => {
		for(const $element of view.selectors.footer) {
			$element.dispatchEvent(new MouseEvent('click'))
			$element.setAttribute('data-clicked', true)
		}
	}, 1500)
}