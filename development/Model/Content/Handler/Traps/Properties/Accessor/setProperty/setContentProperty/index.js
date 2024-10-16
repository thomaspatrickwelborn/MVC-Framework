import Content from '../../../../../../index.js'
import { ContentEvent, ValidatorEvent } from '../../../../../../Events/index.js'
export default function SetContentProperty($content, $options) {
  const { root, basename, path, schema } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  return function setContentProperty() {
    const { proxy } = $content
    // Arguments
    const $path = arguments[0]
    const $value = arguments[1]
    // Options
    const ulteroptions = Object.assign({}, $options, arguments[2] || {})
    const contentOptions = Object.assign(
      {}, $content.options, { traps: { accessor: { set: ulteroptions } }}
    )
    const { recursive, events, pathkey } = ulteroptions
    // Path Key: true
    if(pathkey === true) {
      // Subpaths
      const subpaths = $path.split(new RegExp(/\.(?=(?:[^"]*"[^"]*")*[^"]*$)/))
      // Property Key
      const propertyKey = subpaths.shift()
      // Property Value
      let propertyValue
      const _basename = propertyKey
      const _path = (path !== null)
        ? String(path).concat('.', _basename)
        : _basename
      // Return: Subproperty
      if(subpaths.length) {
        propertyValue = root[propertyKey]
        // Recursive: True
        // Property Value: Undefined
        if(recursive && !propertyValue) {
          // Subschema
          let subschema
          if(schema?.contextType === 'array') { subschema = schema.context[0] }
          else if(schema?.contextType === 'object') { subschema = schema.context[propertyKey] }
          else { subschema = null }
          // Subcontent
          let subcontent
          if(subschema?.contextType === 'array') { subcontent = [] }
          else if(subschema?.contextType === 'object') { subcontent = {} }
          else {
            if(Number(propertyKey)) { subcontent = [] }
            else { subcontent = {} }
          }
          propertyValue = new Content(subcontent, subschema, Object.assign({}, contentOptions, {
            basename: _basename,
            path: _path,
            parent: proxy,
          }))
        }
        return propertyValue.set(subpaths.join('.'), $value, ulteroptions)
      }
      // Validation
      if(schema && enableValidation) {
        const validSourceProp = schema.validateProperty(propertyKey, $value)
        if(validationEvents) {
          $content.dispatchEvent(
            new ValidatorEvent('validateProperty', {
              basename: _basename,
              path: _path,
              detail: validSourceProp,
            }, $content)
          )
        }
        if(!validSourceProp.valid) { return }
      }
      // Return: Property
      // Value: Content
      if($value instanceof Content) {
        propertyValue = $value
      }
      // Value: Object Literal
      else if(typeof $value === 'object') {
        let subschema
        if(schema?.contextType === 'array') { subschema = schema.context[0] }
        else if(schema?.contextType === 'object') { subschema = schema.context[propertyKey] }
        else { subschema = null }
        propertyValue = new Content($value, subschema, Object.assign({}, contentOptions, {
          basename: _basename,
          path: _path,
          parent: proxy,
        }))
      }
      // Value: Primitive Literal
      else {
        propertyValue = $value
      }
      // Set Property Event
      if(contentEvents && events.includes('setProperty')) {
        $content.dispatchEvent(
          new ContentEvent('setProperty', {
            basename: _basename,
            path: _path,
            detail: {
              key: propertyKey,
              val: propertyValue,
            }
          }, $content)
        )
      }
      // Root Assignment
      root[propertyKey] = propertyValue
      // Return Property Value
      return propertyValue
    }
    // Path Key: false
    else if(pathkey === false) {
      let propertyKey = $path
      const _basename = propertyKey
      const _path = (path !== null)
        ? path.concat('.', _basename)
        : _basename
      // Property Value: Content Instance
      if($value instanceof Content) {
        propertyValue = $value
      }
      // Property Value: New Content Instance
      else if(typeof $value === 'object') {
        let subschema
        if(schema?.contextType === 'array') { subschema = schema.context[0] }
        if(schema?.contextType === 'object') { subschema = schema.context[propertyKey] }
        else { subschema = null }
        propertyValue = new Content($value, subschema, Object.assign({}, contentOptions, {
          basename: _basename,
          path: _path,
          parent: proxy,
        }))
      }
      // Property Value: Primitive Literal
      else { propertyValue = $value }
      // Root Assignment
      root[propertyKey] = propertyValue
      // Set Property Event
      if(contentEvents && events.includes('setProperty')) {
        $content.dispatchEvent(
          new ContentEvent('setProperty', {
            basename: _basename,
            path: _path,
            detail: {
              key: propertyKey,
              val: propertyValue,
            }
          }, $content)
        )
      }
      // Return Property Value
      return propertyValue
    }
  }
}