import path from 'node:path'
export default function outputPath(
  $route, $document, $documentPath, $documentPathType
) {
  // Script, Simule, Struct, Style
  $document[$documentPathType] = path.join(
    $route.source, $documentPath
  )
}