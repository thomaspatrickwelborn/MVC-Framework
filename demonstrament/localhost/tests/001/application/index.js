import { Model, View, Control, StaticRouter } from '/mvc-framework/index.js'
import Header from './header/index.js'
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
			},
			routers: {
				default: new StaticRouter({
					routes: {
						'link-a': {
							name: "Link C",
							path: 'link-a',
							class: "Main",
							content: {
								header: "SUBJECT A",
								subheader: "SUBJECT A EXTENDED",
								author: "SOME AUTHOR NAME",
							}
						},
						'link-b': {
							name: "Link C",
							path: 'link-b',
							class: "Main",
							content: {
								header: "SUBJECT B",
								subheader: "SUBJECT B EXTENDED",
								author: "SOME AUTHOR NAME",
							}
						},
						'link-c': {
							name: "Link C",
							path: 'link-c',
							class: "Main",
							content: {
								header: "SUBJECT B",
								subheader: "SUBJECT B EXTENDED",
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
					'routeChange': ($event) => { console.log($event) }
				}
			}
		}, true)
		console.log(this.events)
		this.views.default.element.insertAdjacentElement(
			'afterbegin', this.controls.header.views.default.element.content.firstElementChild
		)
	}
}