import ArrayEventTarget from '/mvc-framework/ArrayEventTarget/index.js'
export default function($event) {
	var arrayEventTarget = new ArrayEventTarget()
	const arrayEventTargetChange = ($event) => { console.log($event) } 
	// arrayEventTarget.addEventListener('change', ($event) => { console.log($event) })
	arrayEventTarget.addEventListener('change', arrayEventTargetChange)
	arrayEventTarget.dispatchEvent(new CustomEvent('change', {
		detail: { name: 'change' }
	}))
	arrayEventTarget.removeEventListener('change', arrayEventTargetChange)
	arrayEventTarget.dispatchEvent(new CustomEvent('change', {
		detail: { name: 'change' }
	}))
	arrayEventTarget.addEventListener('change', arrayEventTargetChange)
	arrayEventTarget.dispatchEvent(new CustomEvent('change', {
		detail: { name: 'change' }
	}))
	// console.log(arrayEventTarget)
	const arrayEventTarget2Change = ($event) => { console.log($event) } 
	var arrayEventTarget2 = new ArrayEventTarget()
	// arrayEventTarget2.addEventListener('change', ($event) => { console.log($event) })
	arrayEventTarget2.addEventListener('change', arrayEventTarget2Change)
	arrayEventTarget2.dispatchEvent(new CustomEvent('change', {
		detail: { name: 'change' }
	}))
	arrayEventTarget2.removeEventListener('change', arrayEventTarget2Change)
	arrayEventTarget2.dispatchEvent(new CustomEvent('change', {
		detail: { name: 'change' }
	}))
	arrayEventTarget2.addEventListener('change', arrayEventTarget2Change)
	arrayEventTarget2.dispatchEvent(new CustomEvent('change', {
		detail: { name: 'change' }
	}))
	// console.log(arrayEventTarget2)
}
