import { isDirectInstanceOf } from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function Push(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options
  const {
    eventTarget, 
    root, 
    basename,
    path, 
    schema,
  } = $aliases
  const { enableValidation, validationEvents } = schema.options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const elements = []
        let elementsIndex = 0
        iterateElements:
        for(let $element of arguments) {
          const _basename = elementsIndex
          const _path = (path !== null)
            ? path.concat('.', elementsIndex)
            : elementsIndex
          // Validation
          if(enableValidation) {
            const validElement = schema.validateProperty(elementsIndex, $element)
            if(validationEvents) {
              eventTarget.dispatchEvent(
                new ValidatorEvent('validateProperty', {
                  basename: _basename,
                  path: _path,
                  detail: validElement,
                }, eventTarget)
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
            eventTarget.dispatchEvent(
              new ContentEvent('pushProp', {
                basename: _basename,
                path: _path,
                detail: {
                  elementsIndex, 
                  element: elements[elementsIndex],
                },
              }, eventTarget)
            )
          }
          elementsIndex++
        }
        // Push Event
        if(events.includes('push')) {
          eventTarget.dispatchEvent(
            new ContentEvent('push', {
              basename,
              path,
              detail: {
                elements,
              },
            }, eventTarget)
          )
        }
        return root.length
      }
    }  
  )
}