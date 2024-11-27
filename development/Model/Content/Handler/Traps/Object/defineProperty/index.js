import { typeOf, typedObjectLiteral, impandTree } from '../../../../../../Coutil/index.js'
import Content from '../../../../index.js'
import { ContentEvent, ValidatorEvent } from '../../../../Events/index.js'
export default function defineProperty() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { descriptorTree, events } = $options
  const { source, path, schema, proxy } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  const propertyKey = arguments[0]
  const propertyDescriptor = arguments[1]
  const propertyValue = propertyDescriptor.value
  const sourcePropertyDescriptor = Object.getOwnPropertyDescriptor(source, propertyKey) || {}
  const sourcePropertyValue = sourcePropertyDescriptor.value
  const sourcePropertyValueIsContentInstance = (
    sourcePropertyValue?.classToString === Content.toString()
  ) ? true : false
  // Validation
  if(schema && enableValidation) {
    const impandPropertyValue = impandTree({
      [propertyKey]: propertyDescriptor
    }, "value")[propertyKey]
    console.log("propertyKey", propertyKey)
    console.log("impandPropertyValue", impandPropertyValue)
    const validProperty = schema.validateProperty(propertyKey, impandPropertyValue)
    if(validationEvents) {
      let type, propertyType
      const validatorPath = (path)
        ? [path, propertyKey].join('.')
        : String(propertyKey)
      if(validProperty.valid) {
        type = 'validProperty'
        propertyType = ['validProperty', propertyKey].join(':')
      }
      else {
        type = 'nonvalidProperty'
        propertyType = ['nonvalidProperty', propertyKey].join(':')
      }
      for(const $eventType of [type, propertyType]) {
        $content.dispatchEvent(
          new ValidatorEvent($eventType, {
            path: validatorPath,
            detail: validProperty,
          }, $content)
        )
      }
    }
    if(!validProperty.valid) { return proxy }
  }
  const change = {
    preter: {
      key: propertyKey,
      value: source[propertyKey],
    },
    anter: {
      key: propertyKey,
      value: undefined,
    },
    conter: undefined,
  }
  // Property Descriptor Value: Object Type
  if(typeof propertyValue === 'object') {
    // Subschema
    let subschema
    if(schema.type === 'array') { subschema = schema.context[0] }
    else if(schema.type === 'object') { subschema = schema.context[propertyKey] }
    else { subschema = undefined}
    // const  = Object.getOwnPropertyDescriptor(source, propertyKey) || {}
    // Root Property Descriptor Value: Existent Content Instance
    const contentPath = (path)
      ? [path, propertyKey].join('.')
      : String(propertyKey)
    if(sourcePropertyValueIsContentInstance) {
      // Descriptor Tree: true
      if(descriptorTree === true) {
        // propertyValue = Object.assign(propertyValue, { path: contentPath, parent: proxy })
        sourcePropertyValue.defineProperties(propertyValue)
      }
      // Descriptor Tree: false
      else {
        Object.defineProperty(source, propertyKey, propertyDescriptor)
      }
    }
    // Root Property Descriptor Value: New Content Instance
    else {
      let _source = typedObjectLiteral(propertyValue)
      const contentObject = new Content(
        _source, subschema, {
          path: contentPath,
          parent: proxy,
        }
      )
      // Root Define Properties, Descriptor Tree
      if(descriptorTree === true) {
        contentObject.defineProperties(propertyValue)
        source[propertyKey] = contentObject
      } else 
      // Root Define Properties, No Descriptor Tree
      if(descriptorTree === false) {
        Object.defineProperty(source, propertyKey, propertyDescriptor)
      }
    }
  }
  // Property Descriptor Value: Primitive Type
  else {
    Object.defineProperty(source, propertyKey, propertyDescriptor)
  }
  change.anter.value = propertyValue
  change.conter = (sourcePropertyValueIsContentInstance)
    ? (sourcePropertyValue.string !== JSON.stringify(propertyValue))
    : (JSON.stringify(sourcePropertyValue) !== JSON.stringify(propertyValue))
  // Define Property Event
  if(contentEvents) {
    const contentEventPath = (path)
      ? [path, propertyKey].join('.')
      : String(propertyKey)
    if(events['defineProperty']) {
      $content.dispatchEvent(
        new ContentEvent('defineProperty', {
          path: contentEventPath,
          value: propertyValue,
          change, 
          detail: {
            prop: propertyKey,
            descriptor: propertyDescriptor,
          },
        }, $content
      ))
    }
    if(events['defineProperty:$key']) {
      const type = ['defineProperty', propertyKey].join(':')
      $content.dispatchEvent(
        new ContentEvent(type, {
          path: contentEventPath,
          value: propertyValue,
          change, 
          detail: {
            prop: propertyKey,
            descriptor: propertyDescriptor,
          },
        }, $content
      ))
    }
  }
  return proxy
}