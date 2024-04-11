import { Model } from '/mvc-framework/index.js'

function DOMContentLoaded($event) {
	const model = new Model({
		schema: {
			aaa: String,
			bbb: {
				ccc: String,
				ddd: {
					eee: String,
					fff: {
						ggg: String,
					}
				}
			}
		},
		content: {
			aaa: 'AAA',
			bbb: {
				ccc: 'CCC',
				ddd: {
					eee: 'EEE',
					fff: {
						ggg: 'GGG',
					}
				}
			}
		}
	})
	model.content.addEventListener('set', ($event) => {
		console.log(
			'\n', '-----',
			'\n', $event.detail
		)
	})
	model.content.aaa = 'AAAAAA'
	model.content.bbb = "!!!"
	model.content.bbb = { ccc: 'CCCCCC' }
	model.content.bbb.ddd.eee = 'EEEEEE'
	console.log(model.content.bbb)
	
}

document.addEventListener(
	'DOMContentLoaded', DOMContentLoaded
)