import { Model, View } from '/mvc-framework/index.js'

export default function Header() {
	const headerModel = new Model()
	headerModel.addProps({
		menu: {
			pan: 'im', // 'im',
			icon: '≡',
			listItems: {
				'AAA': '#AAA',
				'BBB': '#BBB',
				'CCC': '#CCC',
			}
		}
	})
	headerModel.addEvents({
		'menu set:pan': function menuSetPan($event) {
			console.log($event.detail)
			headerView.selectors.menu[0]
			.setAttribute('data-pan', $event.detail.val)
		}
	}, true)
	const HeaderMenuListItemsTemplate = ($listItems) => {
		const listItems = []
		for(const [
			$listItemName, $listItemHREF
		] of Object.entries($listItems)) {
			const listItem = `<li><a href="${$listItemHREF}">${$listItemName}</a></li>`
			listItems.push(listItem)
		}
		return listItems.join('\n')
	}
	const HeaderTemplate = ($data) => `
		<menu data-pan="${$data.menu.pan}">
			<button>${$data.menu.icon}</button>
			<ul>
				${HeaderMenuListItemsTemplate($data.menu.listItems)}
			</ul>
		</menu
	`
	const headerView = new View({
		templates: {
			default: HeaderTemplate,
		},
		selectors: {
			menu: ':scope menu',
			menuButton: ':scope menu > button',
		},
	})
	headerView.addEvents({
		'menuButton click': function menuButtonClick($event) {
			const preterMenuPan = headerView.selectors.menu[0]
			.getAttribute("data-pan")
			const anterMenuPan = (
				preterMenuPan === 'im'
			) ? 'ex'
			  : 'im'
		  headerModel.set({
		  	menu: {
		  		pan: anterMenuPan
		  	}
		  })
		}
	}),
	headerView.renderElement({
		name: 'default', 
		data: headerModel.content,
	})
	return {
		headerModel,
		headerView,
	}
}