import { Model, View, Control } from '/mvc-framework/index.js'
import MainContent from './content/index.js'

export default class Main extends Control {
	constructor() {
		super(...arguments)
		this.addClassInstances({
			views: {
				default: new View({
					templates: {
						default: ($data) => `<main></main>`,
					},
					selectors: {
						main: 'main',
					},
				})
			}
		})
		this.views.default.renderElement({
			name: 'default',
		})
	}
	routeChange($route) {
		const controlName = $route.path
		if(this.controls[controlName] === undefined) {
			this.controls[controlName] = new MainContent({
				models: {
					default: new Model({
						content: $route.content
					})
				},
			})
			this.controls[controlName].addEvents({
				views: {
					default: {
						'render': ($event, $view) => {
							console.log($event)
							// console.log($view.element.content.firstElementChild)
							// this.views.default.selectors.main
							// .replaceChildren($view.element.content.firstElementChild)
						}
					}
				}
			}, true)
		}
		this.controls[controlName].models.default.set($route.content)
	}
}