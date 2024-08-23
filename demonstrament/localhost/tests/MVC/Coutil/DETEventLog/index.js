export default function DETEventLog($event) {
  console.log(
    '\n', 'basename', $event.basename, 
    '\n', 'path', $event.path,
    '\n', 'type', $event.type, 
    '\n', 'detail', JSON.stringify(
      $event.detail, null, 2
    )
  )
}