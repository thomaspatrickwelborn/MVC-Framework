import path from 'node:path'
export default function outputPath(
  $route, $document, $documentPath, $documentPathType
) {
  // Struct
  if($document.type === 'struct') {
    if($document.outputType === 'server') {
      $document[$documentPathType] = path.join(
        $route.target, $documentPath.replace(
          new RegExp(/\.ejs$/), '.html'
        )
      )
    }
    // Struct Client
    else if($document.outputType === 'client') {
      $document[$documentPathType] = path.join(
        $route.source, $documentPath
        .replace(new RegExp(/\$/), '')
        .replace(new RegExp(/\.ejs$/), '.js')
      )
    }
  }
  // Simule, Script, Style
  else {
    $document[$documentPathType] = path.join(
      $route.target, $documentPath
    )
  }
}