import DynamicEventTarget from '/mvc-framework//Core/DynamicEventTarget/index.js'

function DOMContentLoaded($event) {
	subtestA()
}

function subtestA() {
	const map = new DynamicEventTarget(new Map())
	console.log(map)
	map.addEventListener('set', ($event) => console.log($event.type, $event.detail))
	map.addEventListener('set:a', ($event) => console.log($event.type, $event.detail))
	map.addEventListener('get', ($event) => console.log($event.type, $event.detail))
	map.addEventListener('get:a', ($event) => console.log($event.type, $event.detail))
	map.addEventListener('delete', ($event) => console.log($event.type, $event.detail))
	map.addEventListener('delete:a', ($event) => console.log($event.type, $event.detail))
	console.log(map.set('a', 1))
	console.log(map.get('a'))
	console.log(map.delete('a'))
}

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
