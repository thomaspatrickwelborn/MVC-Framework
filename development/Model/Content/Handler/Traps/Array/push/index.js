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
        let type
        const _path = [path, '.', elementsIndex].join('')
        if(validSourceProp.valid) {
          type = ['validProperty', ':', elementsIndex].join('')
        }
        else {
          type = ['nonvalidProperty', ':', elementsIndex].join('')
        }
        $content.dispatchEvent(
          new ValidatorEvent(type, {
            path: _path,
            detail: validElement,
          }, $content)
        )
      }
      if(!validElement.valid) { return root.length }
    }
    const _path = (path !== null)
      ? path.concat('.', elementsIndex)
      : elementsIndex
    if(typeof $element === 'object') {
      if($element?.classToString === Content.toString()) { $element = $element.object }
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
    if(contentEvents) {
      if(events['pushProp']) {
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
      if(events['pushProp:$index']) {
        const type = ['pushProp', ':', elementsIndex].join('')
        const _path = [path, '.', elementsIndex].join('')
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: _path,
            detail: {
              elementsIndex,
              element: elements[elementsIndex],
            },
          }, $content)
        )
      }
    }
    elementsIndex++
  }
  // Push Event
  if(contentEvents && events['push']) {
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