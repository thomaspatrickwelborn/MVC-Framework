import Content from '../../../../index.js'
import { ContentEvent, ValidatorEvent } from '../../../../Events/index.js'
export default function unshift() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const $arguments = [...arguments]
  const { events } = $options
  const { source, path, schema, proxy } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  const elements = []
  const elementsLength = $arguments.length
  let elementIndex = elementsLength - 1
  let elementCoindex = 0
  iterateElements:
  while(elementIndex > -1) {
    const elementsLength = $arguments.length
    let $element = $arguments[elementIndex]
    let element
    const sourceElement = source[elementIndex]
    const sourceElementIsContentInstance = (
      sourceElement?.classToString === Content.toString()
    ) ? true : false
    // Validation
    if(schema && enableValidation) {
      const validElement = schema.validateProperty(elementIndex, $element, $content, proxy)
      if(validationEvents) {
        let type, propertyType
        const validatorEventPath = (path)
          ? [path, '.', elementCoindex].join('')
          : elementCoindex
        if(validElement.valid) {
          type = 'validProperty'
          propertyType = ['validProperty', ':', elementCoindex].join('')
        }
        else {
          type = 'nonvalidProperty'
          propertyType = ['nonvalidProperty', ':', elementCoindex].join('')
        }
        for(const $eventType of [type, propertyType]) {
          $content.dispatchEvent(
            new ValidatorEvent($eventType, {
              path: validatorEventPath,
              detail: validElement,
            }, $content)
          )
        }
      }
      if(!validElement.valid) { return proxy.length }
    }
    const change = {
      preter: {
        key: elementCoindex,
        value: source[elementCoindex],
      },
      anter: {
        key: elementCoindex,
        value: undefined,
      },
      conter: undefined,
    }
    // Element: Object Type
    if(typeof $element === 'object') {
      const subschema = schema?.context[0] || null
      const contentPath = (path)
        ? path.concat('.', elementCoindex)
        : String(elementCoindex)
      element = new Content($element, subschema, {
        path: contentPath,
        parent: proxy,
      })
      elements.unshift(element)
      Array.prototype.unshift.call(source, element)
    }
    // Element: Primitive Type
    else {
      element = $element
      elements.unshift(element)
      Array.prototype.unshift.call(source, $element)
    }
    change.anter.value = element
    change.conter = (sourceElementIsContentInstance)
      ? (sourceElement.string !== JSON.stringify(element))
      : (JSON.stringify(sourceElement) !== JSON.stringify(element))
    // Array Unshift Prop Event
    if(contentEvents) {
      const type = ['unshiftProp', elementCoindex].join(':')
      const contentEventPath = (path)
        ? [path, elementCoindex].join('.')
        : String(elementCoindex)
      if(events['unshiftProp']) {
        $content.dispatchEvent(
          new ContentEvent('unshiftProp', {
            path: contentEventPath,
            value: element,
            change,
            detail: {
              elementIndex: elementCoindex, 
              element: element,
            },
          }, $content)
        )
      }
      if(events['unshiftProp:$index']) {
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: contentEventPath,
            value: element,
            change,
            detail: {
              elementIndex: elementCoindex, 
              element: element,
            },
          }, $content)
        )
      }

    }
    elementIndex--
    elementCoindex++
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