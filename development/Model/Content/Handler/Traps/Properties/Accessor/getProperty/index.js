export default function GetProperty(
  $trap, $trapPropertyName, $aliases
) {
  const { root, eventTarget } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function($path) {
        const pathSegments = $path.split('.')
        let value = root
        let pathSegmentsIndex = 0
        iteratePathSegments: 
        for(const $pathSegment of pathSegments) {
          if(pathSegmentsIndex === 0) { value = value[$pathSegment] }
          else {
            try { value = value.get($pathSegment) }
            catch($err) { return }
          }
          pathSegmentsIndex++
        }
        return value
      }
    }
  )
}