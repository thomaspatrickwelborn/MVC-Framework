export default function propFromPropPath($context, $propPath) {
	var propPath = $propPath.split('.')
	var propKey = propPath.pop()
	for(var $propKey of propPath) {
		$context = $context[$propKey]
	}
	return {
		propKey,
		context: $context,
	}
}