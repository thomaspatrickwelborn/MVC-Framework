function compareObjects($lexObject, $dexObject) {
	let lexObjectIsDexObject
	const lexObjectEntries = Object.entries($lexObject)
	const dexObjectEntries = Object.entries($dexObject)
	if(
		lexObjectEntries.length !== dexObjectEntries.length
	) {
		lexObjectIsDexObject = false
		return lexObjectIsDexObject
	}
	iterateLexObjectEntries: for(let [
		$lexKey, $lexVal
	] of lexObjectEntries) {
		if($lexVal instanceof Schema) $lexVal = $lexVal.toObject()
		const typeOfLexVal = typeOf($lexVal)
		const dexKey = $lexKey
		let dexVal = $dexObject[dexKey]
		if(dexVal instanceof Schema) dexVal = dexVal.toObject()
		const typeOfDexVal = typeOf(dexVal)
		if(typeOfLexVal !== typeOfDexVal) {
			lexObjectIsDexObject = false
			return lexObjectIsDexObject
		} else if(
			typeOfLexVal === 'object'
		) {
			lexObjectIsDexObject = compareObjects($lexVal, $dexVal)
			if(lexObjectIsDexObject === false) {
				return lexObjectIsDexObject
			}
		} else {
			if($lexVal !== dexVal) {
				lexObjectIsDexObject = false
				return lexObjectIsDexObject
			}
		}
	}
	if(lexObjectIsDexObject === undefined) lexObjectIsDexObject = true
	return lexObjectIsDexObject
}

function arrayIncludesObject($array, $object) {
	let objectIncluded = false
	iterateArrayItems: for(const $arrayItem of $array) {
		objectIncluded = compareObjects($arrayItem, $object)
		if(objectIncluded === true) {
			break iterateArrayItems
		}
	}
	return objectIncluded
}

export default arrayIncludesObject