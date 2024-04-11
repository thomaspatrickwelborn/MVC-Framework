import { Model, View, Control } from '/mvc-framework/index.js'

function DOMContentLoaded($event) {
	const model = new Model({
		schema: {
			aaa: String,
			bbb: Boolean,
			ccc: {
				ddd: String,
				eee: Number,
			},
		},
		content: {
			aaa: "AAA",
			bbb: false,
			ccc: {
				ddd: "DDD",
				eee: 100,
			},
		},
		events: {
			content: {
				// 
				'set': ($event) => { console.log($event.detail.path) },
				':scope set': ($event) => { console.log($event.detail.path) },
				// 
				'set:aaa': ($event) => { console.log($event.detail.path) },
				':scope set:aaa': ($event) => { console.log($event.detail.path) },
				// 
				'set:bbb': ($event) => { console.log($event.detail.path) },
				':scope set:bbb': ($event) => { console.log($event.detail.path) },
				// 
				'set:ccc': ($event) => { console.log($event.detail.path) },
				':scope set:ccc': ($event) => { console.log($event.detail.path) },
				':scope.ccc set': ($event) => { console.log($event.detail.path) },
				'ccc set': ($event) => { console.log($event.detail.path) },
				// 
				'set:ccc.ddd': ($event) => { console.log($event.detail.path) },
				':scope set:ccc.ddd': ($event) => { console.log($event.detail.path) },
				':scope.ccc set:ddd': ($event) => { console.log($event.detail.path) },
				'ccc set:ddd': ($event) => { console.log($event.detail.path) },
				// 
				'set:ccc.eee': ($event) => { console.log($event.detail.path) },
				':scope set:ccc.eee': ($event) => { console.log($event.detail.path) },
				':scope.ccc set:eee': ($event) => { console.log($event.detail.path) },
				'ccc set:eee': ($event) => { console.log($event.detail.path) },
				// 
				// 
				// 
			},
		}
	})
}

document.addEventListener(
	'DOMContentLoaded', DOMContentLoaded
)