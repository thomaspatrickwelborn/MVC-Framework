import { isDirectInstanceOf } from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function Push($content, $options) {
  const { events } = $options
  const { root, basename, path, schema } = $content
  const { enableValidation, validationEvents } = $content.options
  return function push() {
    const elements = []
    let elementsIndex = 0
    iterateElements:
    for(let $element of arguments) {
      const _basename = elementsIndex
      const _path = (path !== null)
        ? path.concat('.', elementsIndex)
        : elementsIndex
      // Validation
      if(schema && enableValidation) {
        const validElement = schema.validateProperty(elementsIndex, $element)
        if(validationEvents) {
          $content.dispatchEvent(
            new ValidatorEvent('validateProperty', {
              basename: _basename,
              path: _path,
              detail: validElement,
            }, $content)
          )
        }
        if(!validElement.valid) { return root.length }
      }
      if(isDirectInstanceOf($element, [Object, Array/*, Map*/])) {
      const subschema = schema.context[0]
        $element = new Content($element, {
          basename: _basename,
          path: _path,
        }, subschema)
        elements.push($element)
        Array.prototype.push.call(root, $element)
      } else {
        elements.push($element)
        Array.prototype.push.call(root, $element)
      }
      if(events.includes('pushProp')) {
        $content.dispatchEvent(
          new ContentEvent('pushProp', {
            basename: _basename,
            path: _path,
            detail: {
              elementsIndex,
              element: elements[elementsIndex],
            },
          }, $content)
        )
      }
      elementsIndex++
    }
    // Push Event
    if(events.includes('push')) {
      $content.dispatchEvent(
        new ContentEvent('push', {
          basename,
          path,
          detail: {
            elements,
          },
        }, $content)
      )
    }
    return root.length
  }
}