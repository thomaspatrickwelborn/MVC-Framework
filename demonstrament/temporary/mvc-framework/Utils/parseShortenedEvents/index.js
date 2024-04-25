import typeOf from '../typeOf/index.js'

function parseShortenedEvents($propEvents) {
	if(typeOf($propEvents) === 'array') return $propEvents
	const propEvents = []
	iteratePropEvents: for(const [
		$propEventType, $propEventCallback
	] of Object.entries($propEvents)) {
		const propEvent = {
			type: $propEventType,
			callback: $propEventCallback,
		}
		propEvents.push(propEvent)
	}
	return propEvents
}

export default parseShortenedEvents