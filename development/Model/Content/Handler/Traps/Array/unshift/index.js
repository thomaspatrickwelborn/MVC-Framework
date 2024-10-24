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
    let $element = $arguments[elementIndex]
    // Validation
    if(schema && enableValidation) {
      const validElement = schema.validateProperty(elementIndex, $element)
      if(validationEvents) {
        $content.dispatchEvent(
          new ValidatorEvent('validateProperty', {
            path,
            detail: validElement,
          }, $content)
        )
      }
      if(!validElement.valid) { return proxy.length }
    }
    // Element: Object Type
    if(typeof $element === 'object') {
      const subschema = schema?.context[0] || null
      const _path = (path !== null)
        ? path.concat('.', elementIndex)
        : elementIndex
      const element = new Content($element, subschema, {
        path: _path,
        parent: proxy,
      })
      elements.unshift(element)
      Array.prototype.unshift.call(root, element)
    }
    // Element: Primitive Type
    else {
      elements.unshift($element)
      Array.prototype.unshift.call(root, $element)
    }
    // Array Unshift Prop Event
    if(contentEvents && events.includes('unshiftProp')) {
      $content.dispatchEvent(
        new ContentEvent('unshiftProp', {
          path,
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
  if(contentEvents && events.includes('unshift') && elements.length) {
    $content.dispatchEvent(
      new ContentEvent('unshift', {
        path,
        detail: {
          elements,
        },
      },
      $content)
    )
  }
  return proxy.length
}