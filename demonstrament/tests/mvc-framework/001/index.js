import { View } from '/mvc-framework/index.js'

function DOMContentLoaded($event) {
	var view = new View({
		element: document.querySelector('#app'),
		selectors: {
			header: ':scope > header',
			main: ':scope > main',
			footer: ':scope > footer',
		},
		events: {
			selectors: {
				'header click': function headerClick($event) {
					$event.currentTarget.setAttribute('data-clicked', true)
				},
				'main click': function mainClick($event) {
					$event.currentTarget.setAttribute('data-clicked', true)
				},
				'footer click': function footerClick($event) {
					$event.currentTarget.setAttribute('data-clicked', true)
				}
			}
		}
	}, { enable: true })

	const selectorClickTimeoutDuration = 500
	const selectorClickTargets = ['header', 'main', 'footer']
	const selectorClickTargetsLength = selectorClickTargets.length
	var selectorClickTargetsIndex = 0
	iterateSelectorClickTargets: while(
		selectorClickTargetsIndex < selectorClickTargetsLength
	) {
		const selectorClickTargetName = selectorClickTargets[
			selectorClickTargetsIndex
		]
		const selectorClickTarget = view.selectors[
			selectorClickTargetName
		]
		const selectorClickTimeout = (
			selectorClickTargetsIndex + 1
		) * selectorClickTimeoutDuration
		setTimeout(() => {
			for(const $selectorClickTarget of selectorClickTarget) {
				$selectorClickTarget.dispatchEvent(new MouseEvent('click'))
			}
		}, selectorClickTimeout)
		selectorClickTargetsIndex++
	}
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
