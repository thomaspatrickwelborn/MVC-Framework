import { Model, View, Control } from '/mvc-framework/index.js'
import Header from './header/index.js'

export default class Application extends Control {
	constructor() {
		super(...arguments)
		this.addClassInstances({
			views: {
				default: new View({
					element: document.querySelector('application'),
				})
			},
			controls: {
				header: new Header(),
			},
		})
		this.views.default.element.insertAdjacentElement(
			'afterbegin', this.controls.header.views.default.element.content.firstElementChild
		)
	}
}