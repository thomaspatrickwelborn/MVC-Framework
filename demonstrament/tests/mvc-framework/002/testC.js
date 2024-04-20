import { Model } from '/mvc-framework/index.js'

export default function testC() {
	function setAAA($event) {
		console.log($event)
	}
	const model = new Model()
	model.addProps({
		aaa: "AAA",
		bbb: 222,
		ccc: false
	})
	model.addEvents({
		content: {
			'set:aaa': setAAA
		}
	}, true)
	model.set('aaa', "AAAAAA")
	model.removeEvents({
		content: {
			'set:aaa': setAAA
		}
	})
	model.set('aaa', "AAAAAAAAAA")
	model.removeProps({
		aaa: null
	})
	model.set('aaa', "AAAAAAAAAAAAHHHHH")
	model.addProps({
		aaa: "AAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHH"
	})
	console.log(model.content)
}