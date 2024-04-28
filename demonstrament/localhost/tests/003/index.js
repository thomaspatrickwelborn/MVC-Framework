function DOMContentLoaded($event) {
	var array = ['contentA', 'contentB']
	array.schemas = [
		'schemaA', 'schemaB'
	]
	console.log(array)
	console.log('Object.entries', Object.entries(array))
	console.log(
		'Object.getOwnPropertyDescriptors', 
		Object.getOwnPropertyDescriptors(array)
	)
	console.log(
		'array.length', array.length
	)
	array.forEach(($arrayItem) => console.log($arrayItem))

	console.log(
		structuredClone(array).schemas
	)
} 

document.addEventListener('DOMContentLoaded', DOMContentLoaded)
