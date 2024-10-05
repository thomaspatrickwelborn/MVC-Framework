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
    rootAlias, 
    basename,
    path, 
    schema,
  } = $aliases
  const { enableValidation, validationType } = schema.options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const elements = []
        let elementsIndex = 0
        iterateElements:
        for(let $element of arguments) {
          let validElement
          const _basename = elementsIndex
          const _path = (path !== null)
            ? path.concat('.', elementsIndex)
            : elementsIndex
          if(isDirectInstanceOf($element, [Object, Array/*, Map*/])) {
            const subschema = schema.context[0]
            validElement = (enableValidation && validationType === 'object')
              ? subschema.validate($element).valid
              : null
            if(validElement === true || validElement === null) {
              $element = new Content($element, {
                basename: _basename,
                path: _path,
                rootAlias: rootAlias,
              }, subschema)
              elements.push($element)
              Array.prototype.push.call(root, $element)
            }
          } else {
            validElement = (enableValidation && validationType === 'primitive')
              ? schema.validateProperty(elementsIndex, $element).valid
              : null 
            if(validElement === true || validElement === null) {
              elements.push($element)
              Array.prototype.push.call(root, $element)
            }
          }
          if(events.includes('pushProp')) {
            if(validElement === true || validElement === null) {
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