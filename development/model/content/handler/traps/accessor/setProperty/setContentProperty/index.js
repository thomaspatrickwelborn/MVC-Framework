import { recursiveAssign, regularExpressions } from '../../../../../../../coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent, ValidatorEvent } from '../../../../../events/index.js'
export default function setContentProperty() {
  const $arguments = [...arguments]
  const [$content, $options, $path, $value, $ulteroptions] = [...$arguments]
  const { target, path, schema, proxy } = $content
  const { enableValidation, validationEvents } = $content.options
  // Options
  const ulteroptions = recursiveAssign(
    {}, $content.options, $options, $ulteroptions
  )
  // console.log("setContentProperty", "ulteroptions", ulteroptions)
  const contentOptions = $content.options
  // contentOptions.traps.accessor.set = ulteroptions
  const { events, pathkey, subpathError, recursive, setObject } = ulteroptions
  // Path Key: true
  if(pathkey === true) {
    // Subpaths
    const subpaths = $path.split(new RegExp(regularExpressions.quotationEscape))
    // Property Key
    const propertyKey = subpaths.shift()
    // Property Value
    let propertyValue
    const contentPath = (path)
      ? [path, propertyKey].join('.')
      : String(propertyKey)
    // Return: Subproperty
    if(subpaths.length) {
      if(recursive && target[propertyKey] === undefined) {
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
        propertyValue = new Content(subcontent, subschema, recursiveAssign({}, contentOptions, {
          path: contentPath,
          parent: $content,
        }))
      }
      else {
        propertyValue = target[propertyKey]
      }
      // Subpath Error
      if(subpathError === false && propertyValue === undefined) { return undefined }
      propertyValue.set(subpaths.join('.'), $value, ulteroptions)
      return propertyValue
    }
    // Validation
    if(schema && enableValidation) {
      const validTargetProp = schema.validateProperty(propertyKey, $value, setObject, proxy)
      if(validationEvents) {
        let type, propertyType
        const validatorEventPath = (path)
          ? [path, propertyKey].join('.')
          : String(propertyKey)
        if(validTargetProp.valid) {
          type = 'validProperty'
          propertyType = ['validProperty', ':', propertyKey].join('')
        }
        else {
          type = 'nonvalidProperty'
          propertyType = ['nonvalidProperty', ':', propertyKey].join('')
        }
        for(const $eventType of [type, propertyType]) {
          $content.dispatchEvent(new ValidatorEvent($eventType, validTargetProp, $content))
        }
      }
      if(!validTargetProp.valid) { return }
    }
    const change = {
      preter: {
        key: propertyKey,
        value: target[propertyKey],
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
      propertyValue = new Content($value, subschema, recursiveAssign(
        {}, contentOptions, {
          path: contentPath,
          parent: $content,
        }
      ))
    }
    // Value: Primitive Literal
    else {
      propertyValue = $value
    }
    // Root Assignment
    target[propertyKey] = propertyValue
    // Set Property Event
    if(events) {
      const contentEventPath = (path)
        ? [path, propertyKey].join('.')
        : String(propertyKey)
      if(events['setProperty']) {
        $content.dispatchEvent(
          new ContentEvent('setProperty', {
            path: contentEventPath, 
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
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: contentEventPath, 
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
      const contentPath = (path)
        ? [path, propertyKey].join('.')
        : String(propertyKey)
      propertyValue = new Content($value, subschema, recursiveAssign(
        {}, contentOptions, {
          path: contentPath,
          parent: $content,
        }
      ))
    }
    // Property Value: Primitive Literal
    else { propertyValue = $value }
    // Root Assignment
    target[propertyKey] = propertyValue
    // Set Property Event
    if(events) {
      const contentEventPath = (path)
        ? [path, propertyKey].join('.')
        : String(propertyKey)
      if(events['setProperty']) {
        $content.dispatchEvent(
          new ContentEvent('setProperty', {
            path: contentEventPath, 
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
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: contentEventPath, 
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