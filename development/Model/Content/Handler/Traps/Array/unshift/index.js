import { isDirectInstanceOf } from '../../../../../../Coutil/index.js'
import Content from '../../../../index.js'
import { ContentEvent } from '../../../../Events/index.js'
export default function unshift() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const $arguments = [...arguments]
  const { events } = $options
  const { root, path, schema } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  const elements = []
  const elementsLength = $arguments.length
  let elementIndex = elementsLength - 1
  iterateElements:
  while(elementIndex > -1) {
    const elementsLength = $arguments.length
    let element = $arguments[elementIndex]
    const _path = (
      path !== null
    ) ? path.concat('.', elementIndex)
      : elementIndex
    // Validation
    if(schema && enableValidation) {
      const validElement = schema.validateProperty(elementIndex, element)
      if(validationEvents) {
        $content.dispatchEvent(
          new ValidatorEvent('validateProperty', {
            path: _path,
            detail: validElement,
          }, $content)
        )
      }
      if(!validElement.valid) { return proxy.length }
    }

    if(isDirectInstanceOf(element, [Object, Array/*, Map*/])) {
      const subschema = schema?.context[0] || null
      element = new Content(element, subschema, {
        path: _path,
        parent: proxy,
      })
      elements.unshift(element)
      Array.prototype.unshift.call(root, element)
    }
    else {
      elements.unshift(element)
      Array.prototype.unshift.call(root, element)
    }
    // Array Unshift Prop Event
    if(contentEvents && events.includes('unshiftProp')) {
      $content.dispatchEvent(
        new ContentEvent('unshiftProp', {
          path: _path,
          detail: {
            elementIndex, 
            element: element,
          },
        }, $content)
      )
    }
    elementIndex--
  }
  // Array Unshift Event
  const _path = (
    path !== null
  ) ? path.concat('.', elementIndex)
    : elementIndex
  if(contentEvents && events.includes('unshift') && elements.length) {
    $content.dispatchEvent(
      new ContentEvent('unshift', {
        path: _path,
        detail: {
          elements,
        },
      },
      $content)
    )
  }
  return proxy.length
}