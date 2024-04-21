import { Model } from '/mvc-framework/index.js'

export default function testD() {
	function setAAA($event) { console.log($event.detail) }
	function setBBB($event) { console.log($event.detail) }
	function setCCC($event) { console.log($event.detail) }
	var model = new Model()
	model.addProps({
		aaa: "AAA",
		bbb: 222,
		ccc: true,
	})
	model.addEvents({
		'set:aaa': setAAA,
		'set:bbb': setBBB,
		'set:ccc': setCCC,
	}, true)
	model.set({
		aaa: "AAAAAA",
		bbb: 222222,
		ccc: false,
	})
	model.disableEvents({
		'set:aaa': setAAA,
		'set:bbb': setBBB,
		'set:ccc': setCCC,
	})
	model.set({
		aaa: "AAAAAAAAA",
		bbb: 222222222,
		ccc: true,
	})
	model.enableEvents({
		'set:aaa': setAAA,
		'set:bbb': setBBB,
		'set:ccc': setCCC,
	})
	model.set({
		aaa: "AAAAAAAAAAAA",
		bbb: 222222222222,
		ccc: false,
	})
	model.removeEvents({
		'set:aaa': setAAA,
		'set:bbb': setBBB,
		'set:ccc': setCCC,
	})
	model.set({
		aaa: "BBB",
		bbb: 333,
		ccc: true,
	})
	model.removeProps({
		aaa: null,
		bbb: null,
		ccc: null
	})
	model.set({
		aaa: "BBBBBB",
		bbb: 333333,
		ccc: false,
	})
	console.log(model.schema)
	console.log(model.content)
}
