import Content from '../../../../../../index.js'
import { ContentEvent } from '../../../../../../Events/index.js'
export default function SetContent($content, $options) {
  const { radicle, root, basename, path, schema } = $content
  console.log('schema', schema)
  return function setContent() {
    const { proxy } = $content
    // Arguments
    const $value = arguments[0]
    // Ulteroptions
    const ulteroptions = Object.assign({}, $options, arguments[1] || {})
    // Delete Preterproperties
    proxy.delete()
    const { events } = ulteroptions
    // Set Anterproperties
    const properties = Object.entries($value)
    iterateProperties: 
    for(const [$propertyKey, $propertyValue] of properties) {
      // Property Value
      let propertyValue
      // Property Value: Content Instance
      if($propertyValue instanceof Content) {
        propertyValue = $propertyValue
      }
      // Property Value: New Content Instance
      else if(typeof $propertyValue === 'object') {
        propertyValue = new Content(
          $propertyValue, { traps: { accessor: { set: ulteroptions } }}
        )
      }
      // Property Value: Primitive Literal
      else { propertyValue = $propertyValue }
      // Radicle Property: Unmodified Value
      radicle[$propertyKey] = structuredClone($propertyValue)
      // Root Property: Modified Value
      root[$propertyKey] = propertyValue
    }
    // Return Proxy
    return proxy
  }
}