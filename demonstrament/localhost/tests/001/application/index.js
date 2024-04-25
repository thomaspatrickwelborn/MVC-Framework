import { Model, View, Control, StaticRouter } from '/mvc-framework/index.js'
import Header from './header/index.js'
import Main from './main/index.js'
import {  } from '/mvc-framework/index.js'
// const router = 
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
				main: new Main(),
			},
			routers: {
				default: new StaticRouter({
					routes: {
						'link-a': {
							name: "Link A",
							path: 'link-a',
							content: {
								header: "SUBJECT A",
								subheader: "SUBJECT A EXTENDED",
								author: "SOME AUTHOR NAME",
							}
						},
						'link-b': {
							name: "Link B",
							path: 'link-b',
							content: {
								header: "SUBJECT B",
								subheader: "SUBJECT B EXTENDED",
								author: "SOME AUTHOR NAME",
							}
						},
						'link-c': {
							name: "Link C",
							path: 'link-c',
							content: {
								header: "SUBJECT C",
								subheader: "SUBJECT C EXTENDED",
								author: "SOME AUTHOR NAME",
							}
						},
					}
				}, { enable: true })
			},
		})
		this.addEvents({
			routers: {
				default: {
					'routeChange': ($event) => {
						this.controls.main.routeChange($event.detail)
					}
				}
			}
		}, true)
		this.#defaultViewElement.replaceChildren(
			this.#headerDefaultViewElement,
			this.#mainDefaultViewElement,
		)
	}
	get #defaultViewElement() {
		return this.views.default.element
	}
	get #headerDefaultViewElement() {
		return this.controls.header.views.default.element
		.content.firstElementChild
	}
	get #mainDefaultViewElement() {
		return this.controls.main.views.default.element
		.content.firstElementChild
	}
}