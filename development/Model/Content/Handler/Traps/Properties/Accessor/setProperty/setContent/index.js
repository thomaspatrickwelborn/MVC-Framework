import Content from '../../../../../../index.js'
import { ContentEvent } from '../../../../../../Events/index.js'
export default function SetContent($content, $options) {
  const { root, basename, path, schema } = $content
  return function setContent() {
    const { proxy } = $content
    // Arguments
    const $value = arguments[0]
    // Ulteroptions
    const ulteroptions = Object.assign({}, $options, arguments[1] || {})
    const contentOptions = Object.assign(
      {}, $content.options, { traps: { accessor: { set: ulteroptions } }}
    )
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
        let subschema
        if(schema.contextType === 'array') { subschema = schema.context[0] }
        if(schema.contextType === 'object') { subschema = schema.context[$propertyKey] }
        propertyValue = new Content($propertyValue, contentOptions, subschema)
      }
      // Property Value: Primitive Literal
      else { propertyValue = $propertyValue }
      // Root Property: Modified Value
      root[$propertyKey] = propertyValue
    }
    // Return Proxy
    return proxy
  }
}