import { regularExpressions, recursiveAssign } from '../../../../../../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent, ValidatorEvent } from '../../../../../Events/index.js'
export default function setContentProperty() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { source, path, schema } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  const { proxy } = $content
  // Arguments
  const $path = arguments[0]
  const $value = arguments[1]
  // Options
  const ulteroptions = recursiveAssign({
    pathkey: $content.options.pathkey,
    subpathError: $content.options.subpathError,
  }, $options, arguments[2])
  const contentOptions = $content.options
  // contentOptions.traps.accessor.set = ulteroptions
  const { events, pathkey, subpathError, recursive } = ulteroptions
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
      if(recursive && source[propertyKey] === undefined) {
        // Subschema
        let subschema
        if(schema?.type === 'array') { subschema = schema.context[0] }
        else if(schema?.type === 'object') { subschema = schema.context[propertyKey] }
        else { subschema = undefined }
        // Subcontent
        let subcontent
        if(subschema?.type === 'array') { subcontent = [] }
        else if(subschema?.type === 'object') { subcontent = {} }
        else {
          if(Number(propertyKey)) { subcontent = [] }
          else { subcontent = {} }
        }
        propertyValue = new Content(subcontent, subschema, Object.assign({}, contentOptions, {
          path: _path,
          parent: proxy,
        }))
      }
      else {
        propertyValue = source[propertyKey]
      }
      // Subpath Error
      if(subpathError === false && propertyValue === undefined) { return undefined }
      propertyValue.set(subpaths.join('.'), $value, ulteroptions)
      return propertyValue
    }
    // Validation
    if(schema && enableValidation) {
      const validSourceProp = schema.validateProperty(propertyKey, $value)
      if(validationEvents) {
        let type, propertyType
        const _path = [path, '.', propertyKey].join('')
        if(validSourceProp.valid) {
          type = 'validProperty'
          propertyType = ['validProperty', ':', propertyKey].join('')
        }
        else {
          type = 'nonvalidProperty'
          propertyType = ['nonvalidProperty', ':', propertyKey].join('')
        }
        for(const $eventType of [type, propertyType]) {
          $content.dispatchEvent(
            new ValidatorEvent($eventType, {
              path,
              detail: validSourceProp,
            }, $content)
          )
        }
      }
      if(!validSourceProp.valid) { return }
    }
    const change = {
      preter: {
        key: propertyKey,
        value: source[propertyKey],
      },
      anter: {
        key: propertyKey,
        value: $value,
      },
      conter: undefined,
    }
    // Return: Property
    // Value: Object Literal
    if(typeof $value === 'object') {
      // Value: Content
      if($value?.classToString === Content.toString()) { $value = $value.object }
      let subschema
      if(schema?.type === 'array') { subschema = schema.context[0] }
      else if(schema?.type === 'object') { subschema = schema.context[propertyKey] }
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
    // Root Assignment
    source[propertyKey] = propertyValue
    // Set Property Event
    if(contentEvents) {
      if(events['setProperty']) {
        $content.dispatchEvent(
          new ContentEvent('setProperty', {
            path, 
            value: propertyValue,
            change,
            detail: {
              key: propertyKey,
              value: propertyValue,
            }
          }, $content)
        )
      }
      if(events['setProperty:$key']) {
        const type = ['setProperty', ':', propertyKey].join('')
        const _path = [path, '.', propertyKey].join('')
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: _path, 
            value: propertyValue,
            change,
            detail: {
              value: propertyValue,
            }
          }, $content)
        )
      }
    }
    // Return Property Value
    return propertyValue
  }
  // Path Key: false
  else if(pathkey === false) {
    let propertyKey = $path
    // Property Value: Object
    if(typeof $value === 'object') {
      if($value.classToString === Content.toString()) { $value = $value.object }
      let subschema
      if(schema?.type === 'array') { subschema = schema.context[0] }
      if(schema?.type === 'object') { subschema = schema.context[propertyKey] }
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
    source[propertyKey] = propertyValue
    // Set Property Event
    if(contentEvents) {
      if(events['setProperty']) {
        $content.dispatchEvent(
          new ContentEvent('setProperty', {
            path, 
            value: propertyValue,
            detail: {
              key: propertyKey,
              value: propertyValue,
            }
          }, $content)
        )
      }
      if(events['setProperty:$key']) {
        const type = ['setProperty', ':', propertyKey].join('')
        const _path = [path, '.', propertyKey].join('')
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: _path, 
            value: propertyValue,
            detail: {
              value: propertyValue,
            }
          }, $content)
        )
      }
    }
    // Return Property Value
    return propertyValue
  }
}