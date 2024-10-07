import { isDirectInstanceOf } from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function Concat(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options
  const {
    eventTarget, 
    // root,
    rootAlias, 
    basename,
    path, 
    schema,
  } = $aliases
  let { root } = $aliases 
  const { enableValidation, validationEvents } = schema.options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments]
        let valuesIndex = 0
        let subvaluesIndex = 0
        const values = []
        iterateValues: 
        for(const $value of $arguments) {
          const _basename = valuesIndex
          const _path = (path !== null)
            ? path.concat('.', valuesIndex)
            : valuesIndex
          // Value: Array
          if(Array.isArray($value)) {
            subvaluesIndex = 0
            const subvalues = []
            iterateSubvalues: 
            // Validation: Subvalue
            for(const $subvalue of $value) {
              if(enableValidation) {
                const validSubvalue = schema.validate($subvalue)
                if(validationEvents) {
                  eventTarget.dispatchEvent(
                    new ValidatorEvent('validateProperty', {
                      basename: _basename,
                      path: _path,
                      detail: validSubvalue,
                    }, eventTarget)
                  )
                }
                if(!validSubvalue.valid) { subvaluesIndex++; continue iterateSubvalues }
              }
              // Subvalue: Objects
              if(isDirectInstanceOf($subvalue, [Object, Array])) {
                let subschema = schema.context[0]
                const subvalue = new Content($subvalue, {
                  basename: _basename,
                  parent: eventTarget,
                  path: _path,
                  rootAlias,
                }, subschema)
                subvalues[subvaluesIndex] = subvalue
              }
              // Subvalue: Primitives
              else {
                subvalues[subvaluesIndex] = $subvalue
              }
              subvaluesIndex++
            }
            values[valuesIndex] = subvalues
          }
          // Value: Not Array
          else {
            // Validation: Value
            if(enableValidation) {
              const validValue = schema.validateProperty(valuesIndex, $subvalue)
              if(validationEvents) {
                eventTarget.dispatchEvent(
                  new ValidatorEvent('validateProperty', {
                    basename: _basename,
                    path: _path,
                    detail: validValue,
                  }, eventTarget)
                )
              }
              if(!validValue.valid) { valuesIndex++; continue iterateValues }
            }
            // Value: Objects
            if(isDirectInstanceOf($value, [Object])) {
              let subschema = schema.context[0]
              const value = new Content($value, {
                basename: _basename,
                parent: eventTarget,
                path: _path,
                rootAlias,
              }, subschema)
              values[valuesIndex] = value
            }
            // Value: Primitives
            else {
              values[valuesIndex] = $value
            }
          }
          root = Array.prototype.concat.call(root, values[valuesIndex])
          if(events.includes('concatValue')) {
            if(valid === true || valid === null) {
              eventTarget.dispatchEvent(
                new ContentEvent('concatValue', {
                  basename: _basename,
                  path: _path,
                  detail: {
                    valuesIndex,
                    value: values[valuesIndex],
                  },
                }, eventTarget)
              )
            }
          }
          valuesIndex++
        }
        if(events.includes('concat')) {
          eventTarget.dispatchEvent(
            new ContentEvent('concat', {
              basename,
              path,
              detail: {
                values
              },
            }, eventTarget)
          )
        }
        return root
      }
    }
  )
}