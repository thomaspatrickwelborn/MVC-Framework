export default function parseDynamicEventBubbleData($event) {
  const { type, basename, path, detail } = $event
  return [type, { basename, path, detail }]
}