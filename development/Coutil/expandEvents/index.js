function expandEvents($propEvents) {
	if(Array.isArray($propEvents)) return $propEvents
	const propEvents = []
	iteratePropEvents: for(const [
		$propEventSettings, $propEventCallback
	] of Object.entries($propEvents)) {
		const propEventSettings = $propEventSettings.split(' ')
		let type, path, callback, enable
		if(propEventSettings.length === 1) {
			path = ':scope'
			type = propEventSettings[0]
		} else if(propEventSettings.length > 1) {
			path = propEventSettings[0]
			type = propEventSettings[1]
		}
		const propEvent = {
			type,
			path,
			callback: $propEventCallback,
			enable: false,
		}
		propEvents.push(propEvent)
	}
	return propEvents
}

export default expandEvents