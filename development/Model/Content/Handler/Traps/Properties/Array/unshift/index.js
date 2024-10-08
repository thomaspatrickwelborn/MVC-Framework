import { isDirectInstanceOf } from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function Unshift(
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
        const $arguments = [...arguments]
        const elements = []
        const elementsLength = $arguments.length
        let elementIndex = elementsLength - 1
        iterateElements:
        while(elementIndex > -1) {
          const elementsLength = $arguments.length
          let element = $arguments[elementIndex]
          const _basename = elementIndex
          const _path = (
            path !== null
          ) ? path.concat('.', elementIndex)
            : elementIndex
          // Validation
          if(enableValidation) {
            const validElement = schema.validateProperty(elementIndex, element)
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

          if(isDirectInstanceOf(element, [Object, Array/*, Map*/])) {
            const subschema = schema.context[0]
            element = new Content(element, {
              basename: _basename,
              path: _path,
            }, subschema)
            elements.unshift(element)
            Array.prototype.unshift.call(root, element)
          }
          else {
            elements.unshift(element)
            Array.prototype.unshift.call(root, element)
          }
          // Array Unshift Prop Event
          if(events.includes('unshiftProp')) {
            eventTarget.dispatchEvent(
              new ContentEvent('unshiftProp', {
                basename: _basename,
                path: _path,
                detail: {
                  elementIndex, 
                  element: element,
                },
              }, eventTarget)
            )
          }
          elementIndex--
        }
        // Array Unshift Event
        const _basename = elementIndex
        const _path = (
          path !== null
        ) ? path.concat('.', elementIndex)
          : elementIndex
        if(events.includes('unshift') && elements.length) {
          eventTarget.dispatchEvent(
            new ContentEvent('unshift', {
              basename: _basename,
              path: _path,
              detail: {
                elements,
              },
            },
            eventTarget)
          )
        }
        return root.length
      }
    }  
  )
}