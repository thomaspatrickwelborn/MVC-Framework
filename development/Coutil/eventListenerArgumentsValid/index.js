export default function eventListenerArgumentsValid($eventName, $eventCallback) {
	return (
		typeof($eventName) !== 'string' || 
		(
			typeof($eventName) === 'string' &&
			typeof($eventName).length === 0
		) ||
		typeof($eventCallback) !== 'function'
	)
}