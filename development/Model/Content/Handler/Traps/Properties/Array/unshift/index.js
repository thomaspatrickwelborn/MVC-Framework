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
    rootAlias, 
    basename,
    path, 
    schema,
  } = $aliases
  const { enableValidation, validationType } = schema.options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments]
        const elements = []
        const elementsLength = $arguments.length
        let elementIndex = elementsLength - 1
        iterateElements:
        while(elementIndex > -1) {
          let validElement
          const elementsLength = $arguments.length
          let element = $arguments[elementIndex]
          const _basename = elementIndex
          const _path = (
            path !== null
          ) ? path.concat('.', elementIndex)
            : elementIndex
          if(isDirectInstanceOf(element, [Object, Array/*, Map*/])) {
            const subschema = schema.context[0]
            validElement = (enableValidation && validationType === 'object')
              ? subschema.validate(element).valid
              : null
            if(validElement === true || validElement === null) {
              element = new Content(element, {
                basename: _basename,
                path: _path,
                rootAlias: rootAlias,
              }, subschema)
              elements.unshift(element)
              Array.prototype.unshift.call(root, element)
            }
          }
          else {
            validElement = (enableValidation && validationType === 'primitive')
              ? schema.validateProperty(elementIndex, element).valid
              : null
            if(validElement === true || validElement === null) {
              elements.unshift(element)
              Array.prototype.unshift.call(root, element)
            }
          }
          // Array Unshift Prop Event
          if(events.includes('unshiftProp')) {
            if(validElement === true || validElement === null) {
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
          }
          if(enableValidation === true && validationEvents === true) {
            eventTarget.dispatchEvent(
              new ValidatorEvent('validateProperty', {
                basename,
                path,
                detail: validSourceProp,
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