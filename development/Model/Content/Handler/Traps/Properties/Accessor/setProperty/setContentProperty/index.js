import Content from '../../../../../../index.js'
import { ContentEvent } from '../../../../../../Events/index.js'
export default function SetContentProperty($content, $options) {
  const { root, basename, path, schema } = $content
  return function setContentProperty() {
    // Arguments
    const $path = arguments[0]
    const $value = arguments[1]
    // Options
    const ulteroptions = Object.assign({}, $options, arguments[2] || {})
    const contentOptions = Object.assign(
      {}, $content.options, { traps: { accessor: { set: ulteroptions } }}
    )
    const { recursive, events, pathkey, pathsep, pathesc } = ulteroptions
    // Property Value
    let propertyValue
    // Path Key: true
    if(pathkey === true) {
      let subpaths = $path.split(new RegExp(/\.(?=(?:[^"]*"[^"]*")*[^"]*$)/))
      let propertyKey = subpaths.shift()
      // Return: Subpath
      if(subpaths.length) {
        let subpropertyValue = root[propertyKey]
        // Recursive: True
        // SubpropertyValue: Undefined
        if(recursive && !subpropertyValue) {
          let subschema
          if(schema.contextType === 'array') { subschema = schema.context[0] }
          else if(schema.contextType === 'object') { subschema = schema.context[propertyKey] }
          let subcontent
          if(subschema.contextType === 'array') { subcontent = [] }
          else if(subschema.contextType === 'object') { subcontent = {} }
          subpropertyValue = new Content(subcontent, ulteroptions, subschema)
        }
        return subproperty?.set(subpaths.join('.'), $value, ulteroptions)
      }
      // Return: Path
      // Value: Content
      if($value instanceof Content) {
        root[propertyKey]
      }
      // Value: Object Literal
      else if(typeof $value === 'object') {}
      // Value: Primitive Literal
    }
    // Path Key: false
    else if(pathkey === false) {
      let path = $path
      // Property Value: Content Instance
      if($value instanceof Content) {
        propertyValue = $value
      }
      // Property Value: New Content Instance
      else if(typeof $value === 'object') {
        let subschema
        if(schema.contextType === 'array') { subschema = schema.context[0] }
        if(schema.contextType === 'object') { subschema = schema.context[$propertyKey] }
        propertyValue = new Content(
          $value, contentOptions, subschema
        )
      }
      // Property Value: Primitive Literal
      else { propertyValue = $value }
      // Root Assignment
      root[path] = propertyValue
    }
    // Return Property Value
    return propertyValue
  }
}