import Content from '../../../../../index.js'
export default function GetProperty(
  $trap, $trapPropertyName, $aliases
) {
  const { root, eventTarget } = $aliases
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const { proxy } = eventTarget
        if(arguments.length === 0) { return proxy }
        else if(arguments.length === 1) {
          console.log(arguments[0])
          // return proxy.get(arguments[0])
          // const pathSegments = arguments[0].split('.')
          // console.log(pathSegments)
          // let value = proxy
          // let pathSegmentsIndex = 0

          // iteratePathSegments: 
          // for(const $pathSegment of pathSegments) {
          //   console.log('$pathSegment', $pathSegment)
          //   // if(value.eventTarget instanceof Content) {
          //   //   // console.log(value.get('aaa'))
          //   // }
          //   // console.log('value', value.get($pathSegment))
          //   // if(value[$pathSegment]?.eventTarget instanceof Content) {
          //   //   value = value.get($pathSegment)
          //   // }
          //   // else {
          //   //   value = value[$pathSegment]
          //   // }
          //   pathSegmentsIndex++
          // }
          // console.log(value)
          // return value
        }
      }
    }
  )
}