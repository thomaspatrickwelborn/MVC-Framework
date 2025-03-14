import { recursiveAssign } from '../../../../../../coutil/index.js'
import Content from '../../../../index.js'
import { ContentEvent } from '../../../../events/index.js'
export default function push() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const ulteroptions = recursiveAssign({}, $options, $content.options)
  // console.log("push", "ulteroptions", ulteroptions)
  const { events } = $options
  const { target, path, schema } = $content
  const { enableValidation, validationEvents } = $content.options
  const { proxy } = $content
  const elements = []
  let elementsIndex = 0
  iterateElements:
  for(let $element of arguments) {
    // Validation
    if(schema && enableValidation) {
      const validElement = schema.validateProperty(elementsIndex, $element, {}, proxy)
      if(validationEvents) {
        let type, propertyType
        const validatorPath = (path)
          ? [path, elementsIndex].join('.')
          : String(elementsIndex)
        if(validElement.valid) {
          type = 'validProperty'
          propertyType = ['validProperty', ':', elementsIndex].join('')
        }
        else {
          type = 'nonvalidProperty'
          propertyType = ['nonvalidProperty', ':', elementsIndex].join('')
        }
        for(const $eventType of [type, propertyType]) {
          $content.dispatchEvent(new ValidatorEvent($eventType, validElement, $content))
        }
      }
      if(!validElement.valid) { return target.length }
    }
    const contentPath = (path)
      ? [path, elementsIndex].join('.')
      : String(elementsIndex)
    if(typeof $element === 'object') {
      if($element?.classToString === Content.toString()) { $element = $element.object }
      const subschema = schema?.context[0] || null
      $element = new Content($element, subschema, {
        path: contentPath,
        parent: $content,
      })
      elements.push($element)
      Array.prototype.push.call(target, $element)
    } else {
      elements.push($element)
      Array.prototype.push.call(target, $element)
    }
    if(events) {
      const contentEventPath = (path)
        ? [path, '.', elementsIndex].join('')
        : String(elementsIndex)
      if(events['pushProp']) {
        $content.dispatchEvent(
          new ContentEvent('pushProp', {
            path: contentEventPath,
            value: elements[elementsIndex],
            detail: {
              elementsIndex,
              element: elements[elementsIndex],
            },
          }, $content)
        )
      }
      if(events['pushProp:$index']) {
        const type = ['pushProp', ':', elementsIndex].join('')
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: contentEventPath,
            value: elements[elementsIndex],
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
  if(events && events['push']) {
    $content.dispatchEvent(
      new ContentEvent('push', {
        path,
        detail: {
          elements,
        },
      }, $content)
    )
  }
  return target.length
}