function parseShortenedPropEvent($propEventTargetData, $propEventCallback) {
	const propEventTargetDataFrags = $propEventTargetData
	.split(' ')
	const propEvent = {}
	if(propEventTargetDataFrags.length === 1) {
		propEventTargetDataFrags.unshift(':scope')
	}
	const [
		$propEventTarget, $propEventName
	] = propEventTargetDataFrags
	propEvent.name = $propEventName
	propEvent.target = $propEventTarget
	propEvent.callback = $propEventCallback
	propEvent.enabled = false
	return propEvent
}

function parseShortenedPropEvents($propEvents) {
	const propEvents = []
	iteratePropEvents: for(const [
		$propEventTargetData, $propEventCallback
	] of Object.entries($propEvents)) {
		const propEvent = parseShortenedPropEvent(
			$propEventTargetData, $propEventCallback
		)
		propEvents.push(propEvent)
	}
	return propEvents
}

export default parseShortenedPropEvents