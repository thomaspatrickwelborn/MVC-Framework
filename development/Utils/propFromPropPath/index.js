export default function propFromPropPath(
	$context, $propPath, $propVal
) {
	var propPath = $propPath.split('.')
	var propKey = propPath.pop()
	for(var $propKey of propPath) {
		$context = $context[$propKey]
	}
	var propVal = $propVal || $context[propKey]
	return {
		propKey,
		propVal,
		context: $context,
	}
}