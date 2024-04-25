import { Model, View, Control } from '/mvc-framework/index.js'

export default class Header extends Control {
	constructor() {
		super(...arguments)
		this.addClassInstances({
			models: {
				default: new Model({
					content: {
						entity: {
							name: 'Entity',
						},
						menu: {
							pan: 'im', // ex,
							symbol: '≡',
							nav: {
								'Button A': '#link-a',
								'Button B': '#link-b',
								'Button C': '#link-c',
							},
						}
					}
				}, { enable: true })
			},
			views: {
				default: new View({
					selectors: {
						menu: 'menu',
						menuButtonPan: 'menu > button.toggle-data-pan',
						menuNavAnchor: 'menu > nav > a',
					},
					templates: {
						default: ($data) => {
							return `
								<header>
									<entity>${$data.entity.name}</entity>
									<menu data-pan="${$data.menu.pan}"">
										<button class="toggle-data-pan">${$data.menu.symbol}</button>
										<nav>
											${Object.entries($data.menu.nav)
											.reduce(($anchors, [$anchorText, $anchorLink]) => {
												$anchors
												.push(`<a href="${$anchorLink}">${$anchorText}</a>`)
												return $anchors
											}, [])
											.join('\n')}
										</nav>
									</menu>
								</header>
							`
						}
					},
				}, { enable: true })
			}
		})
		this.addEvents({
			models: { default: {
				'menu set:pan': ($event) => {
					this.views.default.selectors.menu[0]
					.setAttribute('data-pan', $event.detail.val)
				},
			} },
			views: { default: {
				'menuButtonPan click': ($event) => {
					const pan = (
						this.views.default.selectors.menu[0]
						.getAttribute('data-pan') === 'im'
					) ? 'ex'
					  : 'im'
					this.models.default.set({
						menu: { pan },
					})
				},
				'menuNavAnchor click': ($event) => {
					const pan = 'im'
					this.models.default.set({
						menu: { pan }
					})
				},
			} },
		})
		this.views.default.renderElement({
			name: 'default', 
			data: this.models.default.content,
		})
		this.enableEvents()
	}
}