import path from 'node:path'
export default function templatePath(
  $route, $document, $documentPath, $documentPathType
) {
  // Struct
  $document[$documentPathType] = path.join(
    $route.source, $documentPath
  )
}