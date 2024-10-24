import { typeOf, isDirectInstanceOf } from '../../../../../../Coutil/index.js'
import Content from '../../../../index.js'
import { ContentEvent, ValidatorEvent } from '../../../../Events/index.js'
export default function defineProperty() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { descriptorTree, events } = $options
  const { root, path, schema, proxy } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  const propertyKey = arguments[0]
  const propertyDescriptor = arguments[1]
  const _path = (
    path !== null
  ) ? path.concat('.', propertyKey)
    : propertyKey
  // Validation
  if(schema && enableValidation) {
    const validSourceProp = schema.validateProperty(propertyKey, propertyDescriptor.value)
    if(validationEvents) {
      $content.dispatchEvent(
        new ValidatorEvent('validateProperty', {
          path: _path,
          detail: validSourceProp,
        }, $content)
      )
    }
    if(!validSourceProp.valid) { return proxy }
  }
  // Property Descriptor Value: Object Type
  if(typeof propertyDescriptor.value === 'object') {
    // Subschema
    let subschema
    if(schema.contextType === 'array') { subschema = schema.context[0] }
    else if(schema.contextType === 'object') { subschema = schema.context[propertyKey] }
    else { subschema = undefined}
    const rootPropertyDescriptor = Object.getOwnPropertyDescriptor(root, propertyKey) || {}
    // Root Property Descriptor Value: Existent Content Instance
    if(rootPropertyDescriptor.value.classToString === Content.toString()) {
      // Descriptor Tree: true
      if(descriptorTree === true) {
        rootPropertyDescriptor.value.defineProperties(propertyDescriptor.value)
      }
      // Descriptor Tree: false
      else {
        Object.defineProperty(root, propertyKey, propertyDescriptor)
      }
    }
    // Root Property Descriptor Value: New Content Instance
    else {
      let _root
      if(typeOf(propertyDescriptor.value) === 'object') { _root = {} }
      else if (typeOf(propertyDescriptor.value) === 'array') { _root = [] }
      else { _root = {} }
      const contentObject = new Content(
        _root, subschema, {
          parent: proxy,
          path: _path,
        }
      )
      // Root Define Properties, Descriptor Tree
      if(descriptorTree === true) {
        contentObject.defineProperties(propertyDescriptor.value)
        root[propertyKey] = contentObject
      } else 
      // Root Define Properties, No Descriptor Tree
      if(descriptorTree === false) {
        Object.defineProperty(root, propertyKey, propertyDescriptor)
      }
    }
  }
  // Property Descriptor Value: Primitive Type
  else {
    Object.defineProperty(root, propertyKey, propertyDescriptor)
  }
  // Define Property Event
  if(contentEvents && events.includes('defineProperty')) {
    $content.dispatchEvent(
      new ContentEvent('defineProperty', {
        path: _path,
        detail: {
          prop: propertyKey,
          descriptor: propertyDescriptor,
        },
      }, $content
    ))
  }
  return proxy
}