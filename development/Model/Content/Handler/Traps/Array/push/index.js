import Content from '../../../../index.js'
import { ContentEvent } from '../../../../Events/index.js'
export default function push() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { events } = $options
  const { root, path, schema } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  const { proxy } = $content
  const elements = []
  let elementsIndex = 0
  iterateElements:
  for(let $element of arguments) {
    // Validation
    if(schema && enableValidation) {
      const validElement = schema.validateProperty(elementsIndex, $element)
      if(validationEvents) {
        $content.dispatchEvent(
          new ValidatorEvent('validateProperty', {
            path,
            detail: validElement,
          }, $content)
        )
      }
      if(!validElement.valid) { return root.length }
    }
    if($element.classToString !== Content.toString()) {
      $element = Object.assign($element, { path, parent })
    }
    else if(typeof $element === 'object') {
      const _path = (path !== null)
        ? path.concat('.', elementsIndex)
        : elementsIndex
      const subschema = schema?.context[0] || null
      $element = new Content($element, subschema, {
        path: _path,
        parent: proxy,
      })
      elements.push($element)
      Array.prototype.push.call(root, $element)
    } else {
      elements.push($element)
      Array.prototype.push.call(root, $element)
    }
    if(contentEvents && events.includes('pushProp')) {
      $content.dispatchEvent(
        new ContentEvent('pushProp', {
          path,
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
  if(contentEvents && events.includes('push')) {
    $content.dispatchEvent(
      new ContentEvent('push', {
        path,
        detail: {
          elements,
        },
      }, $content)
    )
  }
  return root.length
}