export default function subtestA() {
	var array = []
	var arrayHandler = {
		get($target, $property, $receiver) {
			// console.log('-----')
			// console.log('GET')
			// console.log('$target', $target)
			// console.log('$property', $property)
			// console.log('$receiver', $receiver)
			return $target[$property]
		},
		set($target, $property, $value, $receiver) {
			console.log('-----')
			console.log('SET')
			console.log('$target', $target)
			console.log('$property', $property)
			console.log('$value', $value)
			console.log('$receiver', $receiver)
			$target[$property] = $value
			return $property in $target
		},
		deleteProperty($target, $property) {
			console.log('-----')
			console.log('DELETEPROPERTY')
			console.log('$target', $target)
			console.log('$property', $property)
			console.log('$property in $target', $property in $target)
			delete $target[$property]
			return $property in $target
		},
	}
	var arrayProxy = new Proxy(array, arrayHandler)
	arrayProxy.push(777)
	arrayProxy[1] = 333
	arrayProxy.splice(0, 1)
	console.log(arrayProxy)
	// arrayProxy[0] = "AAA"
	// arrayProxy[1] = "BBB"
	// arrayProxy.splice(0, 1)
	// arrayProxy[1]
	// console.log(arrayProxy)
	// console.log(arrayProxy)
}