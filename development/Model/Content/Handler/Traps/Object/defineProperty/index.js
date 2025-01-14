import { typeOf, typedObjectLiteral, impandTree } from '../../../../../../Coutil/index.js'
import Content from '../../../../index.js'
import { ContentEvent, ValidatorEvent } from '../../../../Events/index.js'
export default function defineProperty() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { descriptorTree, events } = $options
  const { target, path, schema, proxy } = $content
  const { enableValidation, validationEvents } = $content.options
  const propertyKey = arguments[0]
  const propertyDescriptor = arguments[1]
  const propertyValue = propertyDescriptor.value
  const targetPropertyDescriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {}
  const targetPropertyValue = targetPropertyDescriptor.value
  const targetPropertyValueIsContentInstance = (
    targetPropertyValue?.classToString === Content.toString()
  ) ? true : false
  // Validation
  if(schema && enableValidation) {
    const impandPropertyValue = impandTree({
      [propertyKey]: propertyDescriptor
    }, "value")[propertyKey]
    const validProperty = schema.validateProperty(propertyKey, impandPropertyValue, $content, proxy)
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
        $content.dispatchEvent(new ValidatorEvent($eventType, validProperty, $content))
      }
    }
    if(!validProperty.valid) { return proxy }
  }
  const change = {
    preter: {
      key: propertyKey,
      value: target[propertyKey],
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
    // Root Property Descriptor Value: Existent Content Instance
    const contentPath = (path)
      ? [path, propertyKey].join('.')
      : String(propertyKey)
    if(targetPropertyValueIsContentInstance) {
      // Descriptor Tree: true
      if(descriptorTree === true) {
        // propertyValue = Object.assign(propertyValue, { path: contentPath, parent: proxy })
        targetPropertyValue.defineProperties(propertyValue)
      }
      // Descriptor Tree: false
      else {
        Object.defineProperty(target, propertyKey, propertyDescriptor)
      }
    }
    // Root Property Descriptor Value: New Content Instance
    else {
      let _target = typedObjectLiteral(propertyValue)
      const contentObject = new Content(
        _target, subschema, {
          path: contentPath,
          parent: proxy,
        }
      )
      // Root Define Properties, Descriptor Tree
      if(descriptorTree === true) {
        contentObject.defineProperties(propertyValue)
        target[propertyKey] = contentObject
      } else 
      // Root Define Properties, No Descriptor Tree
      if(descriptorTree === false) {
        Object.defineProperty(target, propertyKey, propertyDescriptor)
      }
    }
  }
  // Property Descriptor Value: Primitive Type
  else {
    Object.defineProperty(target, propertyKey, propertyDescriptor)
  }
  change.anter.value = propertyValue
  change.conter = (targetPropertyValueIsContentInstance)
    ? (targetPropertyValue.string !== JSON.stringify(propertyValue))
    : (JSON.stringify(targetPropertyValue) !== JSON.stringify(propertyValue))
  // Define Property Event
  if(events) {
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