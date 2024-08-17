function propFragIsNumber($propFrag) {
	const propFragMatch = $propFrag.match(
		new RegExp(`^[0-9]{${$propFrag.length}}$`, "g")
	)
	return (
		propFragMatch === null
	) ? false
	  : true
}

function parsePropFrag($propFrag) {
	return (
		propFragIsNumber($propFrag) === true
	) ? Number($propFrag)
	  : $propFrag
}

export default parsePropFrag