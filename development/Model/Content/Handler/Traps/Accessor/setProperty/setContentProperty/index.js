import { regularExpressions } from '../../../../../../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent, ValidatorEvent } from '../../../../../Events/index.js'
export default function setContentProperty() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { root, path, schema } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  const { proxy } = $content
  // Arguments
  const $path = arguments[0]
  const $value = arguments[1]
  // Options
  const ulteroptions = Object.assign(
    {}, $options, arguments[2]
  )
  const contentOptions = $content.options
  contentOptions.traps.accessor.set = ulteroptions
  const { events, pathkey, keychaining, recursive } = ulteroptions
  // Path Key: true
  if(pathkey === true) {
    // Subpaths
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
    // Property Key
    const propertyKey = subpaths.shift()
    // Property Value
    let propertyValue
    const _path = (path !== null)
      ? String(path).concat('.', propertyKey)
      : propertyKey
    // Return: Subproperty
    if(subpaths.length) {
      propertyValue = root[propertyKey]
      // Recursive: True
      // Property Value: Undefined
      if(recursive && propertyValue === undefined) {
        // Subschema
        let subschema
        if(schema?.contextType === 'array') { subschema = schema.context[0] }
        else if(schema?.contextType === 'object') { subschema = schema.context[propertyKey] }
        else { subschema = undefined }
        // Subcontent
        let subcontent
        if(subschema?.contextType === 'array') { subcontent = [] }
        else if(subschema?.contextType === 'object') { subcontent = {} }
        else {
          if(Number(propertyKey)) { subcontent = [] }
          else { subcontent = {} }
        }
        propertyValue = new Content(subcontent, subschema, Object.assign({}, contentOptions, {
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
            path, 
            detail: validSourceProp,
          }, $content)
        )
      }
      if(!validSourceProp.valid) { return }
    }
    // Return: Property
    // Value: Object Literal
    else if(typeof $value === 'object') {
      // Value: Content
      if($value?.classToString === Content.toString()) { $value = $value.object }
      let subschema
      if(schema?.contextType === 'array') { subschema = schema.context[0] }
      else if(schema?.contextType === 'object') { subschema = schema.context[propertyKey] }
      else { subschema = undefined }
      propertyValue = new Content($value, subschema, Object.assign(
        {}, contentOptions, {
          path: _path,
          parent: proxy,
        }
      ))
    }
    // Value: Primitive Literal
    else {
      propertyValue = $value
    }
    // Set Property Event
    if(contentEvents && events.includes('setProperty')) {
      $content.dispatchEvent(
        new ContentEvent('setProperty', {
          path, 
          detail: {
            key: propertyKey,
            value: propertyValue,
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
    // Property Value: Content Instance
    if($value.classToString === Content.toString()) {
      propertyValue = Object.assign($value, { path: _path, parent: proxy })
    }
    // Property Value: New Content Instance
    else if(typeof $value === 'object') {
      let subschema
      if(schema?.contextType === 'array') { subschema = schema.context[0] }
      if(schema?.contextType === 'object') { subschema = schema.context[propertyKey] }
      else { subschema = undefined }
      const _path = (path !== null)
        ? path.concat('.', propertyKey)
        : propertyKey
      propertyValue = new Content($value, subschema, Object.assign(
        {}, contentOptions, {
          path: _path,
          parent: proxy,
        }
      ))
    }
    // Property Value: Primitive Literal
    else { propertyValue = $value }
    // Root Assignment
    root[propertyKey] = propertyValue
    // Set Property Event
    if(contentEvents && events.includes('setProperty')) {
      $content.dispatchEvent(
        new ContentEvent('setProperty', {
          path, 
          detail: {
            key: propertyKey,
            value: propertyValue,
          }
        }, $content)
      )
    }
    // Return Property Value
    return propertyValue
  }
}