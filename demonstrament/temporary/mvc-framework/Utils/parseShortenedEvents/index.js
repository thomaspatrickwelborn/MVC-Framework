import typeOf from '../typeOf/index.js'

function parseShortenedEvents($propEvents) {
	if(typeOf($propEvents) === 'array') return $propEvents
	const propEvents = []
	iteratePropEvents: for(const [
		$propEventSettings, $propEventCallback
	] of Object.entries($propEvents)) {
		const propEventSettings = $propEventSettings.split(' ')
		let type, target, callback
		if(propEventSettings.length === 1) {
			target = ':scope'
			type = propEventSettings[0]
		} else if(propEventSettings.length > 1) {
			target = propEventSettings[0]
			type = propEventSettings[1]
		}
		const propEvent = {
			type,
			target,
			callback: $propEventCallback,
			enable: false,
		}
		propEvents.push(propEvent)
	}
	return propEvents
}

export default parseShortenedEvents