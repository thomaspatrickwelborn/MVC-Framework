export default function impandEvents($propEvents) {
  if(!Array.isArray($propEvents)) { return $propEvents }
  const propEvents = {}
  iteratePropEvents: 
  for(const $propEvent of $propEvents) {
    const { path, type, listener, options } = $propEvent
    const propEventSettings = `${$path} ${$type}`
    if(options !== undefined) {
      propEvents[propEventSettings] = [listener, options]
    }
    else {
      propEvents[propEventSettings] = listener
    }
  }
  return propEvents
}