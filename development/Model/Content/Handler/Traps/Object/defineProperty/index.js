import { typeOf } from '../../../../../../Coutil/index.js'
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
  // Validation
  if(schema && enableValidation) {
    const validSourceProp = schema.validateProperty(propertyKey, propertyDescriptor.value)
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
    if(!validSourceProp.valid) { return proxy }
  }
  // Property Descriptor Value: Object Type
  if(typeof propertyDescriptor.value === 'object') {
    // Subschema
    let subschema
    if(schema.type === 'array') { subschema = schema.context[0] }
    else if(schema.type === 'object') { subschema = schema.context[propertyKey] }
    else { subschema = undefined}
    const sourcePropertyDescriptor = Object.getOwnPropertyDescriptor(source, propertyKey) || {}
    // Root Property Descriptor Value: Existent Content Instance
    const _path = (
      path !== null
    ) ? path.concat('.', propertyKey)
      : propertyKey
    if(sourcePropertyDescriptor.value.classToString === Content.toString()) {
      // Descriptor Tree: true
      if(descriptorTree === true) {
        propertyDescriptor.value = Object.assign(propertyDescriptor.value, { path: _path, parent: proxy })
        sourcePropertyDescriptor.value.defineProperties(propertyDescriptor.value)
      }
      // Descriptor Tree: false
      else {
        Object.defineProperty(source, propertyKey, propertyDescriptor)
      }
    }
    // Root Property Descriptor Value: New Content Instance
    else {
      let _source
      if(typeOf(propertyDescriptor.value) === 'object') { _source = {} }
      else if (typeOf(propertyDescriptor.value) === 'array') { _source = [] }
      else { _source = {} }
      const contentObject = new Content(
        _source, subschema, {
          path: _path,
          parent: proxy,
        }
      )
      // Root Define Properties, Descriptor Tree
      if(descriptorTree === true) {
        contentObject.defineProperties(propertyDescriptor.value)
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
  // Define Property Event
  if(contentEvents) {
    if(events['defineProperty']) {
      $content.dispatchEvent(
        new ContentEvent('defineProperty', {
          path,
          value: propertyDescriptor.value,
          detail: {
            prop: propertyKey,
            descriptor: propertyDescriptor,
          },
        }, $content
      ))
    }
    if(events['defineProperty:$key']) {
      const type = ['defineProperty', ':', propertyKey].join('')
      const _path = [path, '.', propertyKey].join('')
      $content.dispatchEvent(
        new ContentEvent(type, {
          path: _path,
          value: propertyDescriptor.value,
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