export default function logEvent($event) {
  console.log(
    '\n', '$event.type', $event.type,
    '\n', '$event.path', $event.path,
    '\n', '$event.basename', $event.basename,
    '\n', '$event.detail', $event.detail,
  )
}