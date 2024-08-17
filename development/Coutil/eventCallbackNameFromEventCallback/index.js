export default function eventCallbackNameFromEventCallback($eventCallback) {
	return (
		$eventCallback.name.length === 0
	) ? 'anonymous'
    : $eventCallback.name
}