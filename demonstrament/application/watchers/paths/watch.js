import path from 'node:path'
export default function watchPath(
  $route, $document, $documentPath, $documentPathType
) {
  // Script, Simule, Struct, Style
  for(let [
    $watchPathIndex, $watchPath
  ] of Object.entries($documentPath)) {
    let watchPath
    if($watchPath.charAt(0) === '!') {
      watchPath = '!'.concat(
        path.join(
          $route.source, $watchPath.replace(new RegExp(/^\!/), '')
        )
      )
    } else {
      watchPath = path.join(
        $route.source, $watchPath
      )
    }
    $documentPath[$watchPathIndex] = watchPath
  }
}