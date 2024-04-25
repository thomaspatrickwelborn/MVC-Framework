import { Model, View, Control } from '/mvc-framework/index.js'

export default class MainContent extends Control {
	constructor() {
		super(...arguments)
		this.addClassInstances({
			views: {
				default: {
					templates: {
						default: ($data) => {
							return `<content>
								<h2>${$data.header}</h2>
								<h3>${$data.subheader}</h3>
								<author>${$data.author}</author>
							</content>`
						}
					}
				}
			}
		})
		this.addEvents({
			models: {
				default: {
					'set': ($event, $model) => {
						this.views.default.renderElement({
							name: 'default',
							data: $event.detail,
						})
					}
				}
			}
		}, true)
	}
}