import { Model } from '/mvc-framework/index.js'

export default function testA() {
	const model = new Model({
		content: {
			aaa: "AAA", bbb: 1000, ccc: true, ddd: {
				eee: "EEE", fff: 5000, ggg: false, hhh: {
					iii: "III", jjj: 9000, kkk: true
				},
			}
		}
	})
	model.set({
		ddd: {
			hhh: {
				iii: "IIIIII",
				jjj: 9000000,
				kkk: false,
			}
		}
	})
	console.log(model.get('ddd.hhh.iii'))
	console.log(model.get('ddd.hhh.jjj'))
	console.log(model.get('ddd.hhh.kkk'))
	model.set('ddd', {
		eee: "EEEEEE",
		fff: 5000000,
		ggg: true
	})
	console.log(model.get('ddd.eee'))
	console.log(model.get('ddd.fff'))
	console.log(model.get('ddd.ggg'))
	model.set('aaa', "AAAAAA")
	model.set('bbb', 10000000)
	model.set('ccc', false)
	console.log(model.get('aaa'))
	console.log(model.get('bbb'))
	console.log(model.get('ccc'))
	console.log(model.get('ddd'))
}
