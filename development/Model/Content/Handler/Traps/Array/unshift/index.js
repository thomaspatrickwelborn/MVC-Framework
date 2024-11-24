import Content from '../../../../index.js'
import { ContentEvent } from '../../../../Events/index.js'
export default function unshift() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const $arguments = [...arguments]
  const { events } = $options
  const { source, path, schema } = $content
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
        let type
        const _path = [path, '.', elementIndex].join('')
        if(validSourceProp.valid) {
          type = ['validProperty', ':', elementIndex].join('')
        }
        else {
          type = ['nonvalidProperty', ':', elementIndex].join('')
        }
        $content.dispatchEvent(
          new ValidatorEvent(type, {
            path: _path,
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
      Array.prototype.unshift.call(source, element)
    }
    // Element: Primitive Type
    else {
      elements.unshift($element)
      Array.prototype.unshift.call(source, $element)
    }
    // Array Unshift Prop Event
    if(contentEvents) {
      if(events['unshiftProp']) {
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
      if(events['unshiftProp:$index']) {
        const type = ['unshiftProp', ':', elementIndex].join('')
        const _path = [path, '.', elementIndex]
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: _path,
            detail: {
              elementIndex, 
              element: element,
            },
          }, $content)
        )
      }

    }
    elementIndex--
  }
  // Array Unshift Event
  if(contentEvents && events['unshift'] && elements.length) {
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