import { recursiveAssign } from '../../../../../coutil/index.js'
import { typeOf, typedObjectLiteral, impandTree } from '../../../../../coutil/index.js'
import Content from '../../../index.js'
import { ContentEvent, ValidatorEvent } from '../../../events/index.js'
export default function defineProperty($content, $options, $propertyKey, $propertyDescriptor) {
  const { descriptorTree, events } = $options
  const { target, path, schema } = $content
  const { enableValidation, validationEvents } = $options
  const propertyValue = $propertyDescriptor.value
  const targetPropertyDescriptor = Object.getOwnPropertyDescriptor(target, $propertyKey) || {}
  const targetPropertyValue = targetPropertyDescriptor.value
  const targetPropertyValueIsContentInstance = (
    targetPropertyValue instanceof Content
  ) ? true : false
  // Validation
  if(schema && enableValidation) {
    const validProperty = schema.validateProperty($propertyKey, propertyValue, $content)
    if(validationEvents) {
      let type, propertyType
      const validatorPath = (path)
        ? [path, $propertyKey].join('.')
        : String($propertyKey)
      if(validProperty.valid) {
        type = 'validProperty'
        propertyType = ['validProperty', $propertyKey].join(':')
      }
      else {
        type = 'nonvalidProperty'
        propertyType = ['nonvalidProperty', $propertyKey].join(':')
      }
      for(const $eventType of [type, propertyType]) {
        $content.dispatchEvent(new ValidatorEvent($eventType, validProperty, $content))
      }
    }
    if(!validProperty.valid) { return $content }
  }
  const change = {
    preter: {
      key: $propertyKey,
      value: target[$propertyKey],
    },
    anter: {
      key: $propertyKey,
      value: undefined,
    },
    conter: undefined,
  }
  // Property Descriptor Value: Object Type
  if(typeof propertyValue === 'object') {
    // Subschema
    let subschema
    if(schema.type === 'array') { subschema = schema.context[0] }
    else if(schema.type === 'object') { subschema = schema.context[$propertyKey] }
    else { subschema = undefined}
    // Root Property Descriptor Value: Existent Content Instance
    const contentPath = (path)
      ? [path, $propertyKey].join('.')
      : String($propertyKey)
    if(targetPropertyValueIsContentInstance) {
      // Descriptor Tree: true
      if(descriptorTree === true) {
        // propertyValue = Object.assign(propertyValue, { path: contentPath, parent: $content })
        targetPropertyValue.defineProperties(propertyValue)
      }
      // Descriptor Tree: false
      else {
        Object.defineProperty(target, $propertyKey, $propertyDescriptor)
      }
    }
    // Root Property Descriptor Value: New Content Instance
    else {
      let _target = typedObjectLiteral(propertyValue)
      const contentObject = new Content(
        _target, subschema, {
          path: contentPath,
          parent: $content,
        }
      )
      // Root Define Properties, Descriptor Tree
      if(descriptorTree === true) {
        contentObject.defineProperties(propertyValue)
        target[$propertyKey] = contentObject
      } else 
      // Root Define Properties, No Descriptor Tree
      if(descriptorTree === false) {
        Object.defineProperty(target, $propertyKey, $propertyDescriptor)
      }
    }
  }
  // Property Descriptor Value: Primitive Type
  else {
    Object.defineProperty(target, $propertyKey, $propertyDescriptor)
  }
  change.anter.value = propertyValue
  change.conter = (targetPropertyValueIsContentInstance)
    ? (targetPropertyValue.toString() !== JSON.stringify(propertyValue))
    : (JSON.stringify(targetPropertyValue) !== JSON.stringify(propertyValue))
  // Define Property Event
  if(events) {
    const contentEventPath = (path)
      ? [path, $propertyKey].join('.')
      : String($propertyKey)
    if(events['defineProperty']) {
      $content.dispatchEvent(
        new ContentEvent('defineProperty', {
          path: contentEventPath,
          value: propertyValue,
          change, 
          detail: {
            prop: $propertyKey,
            descriptor: $propertyDescriptor,
          },
        }, $content
      ))
    }
    if(events['defineProperty:$key']) {
      const type = ['defineProperty', $propertyKey].join(':')
      $content.dispatchEvent(
        new ContentEvent(type, {
          path: contentEventPath,
          value: propertyValue,
          change, 
          detail: {
            prop: $propertyKey,
            descriptor: $propertyDescriptor,
          },
        }, $content
      ))
    }
  }
  return $content
}