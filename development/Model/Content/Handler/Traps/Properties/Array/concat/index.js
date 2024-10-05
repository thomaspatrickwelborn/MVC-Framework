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
  const { enableValidation, validationType } = schema.options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments]
        let valuesIndex = 0
        const values = []
        for(const $value of $arguments) {
          let valid
          const _basename = valuesIndex
          const _path = (path !== null)
            ? path.concat('.', valuesIndex)
            : valuesIndex
          // Value: Array
          if(Array.isArray($value)) {
            let subvaluesIndex = 0
            const subvalues = []
            iterateSubvalues: 
            for(const $subvalue of $value) {
              // Subvalue: Objects
              if(isDirectInstanceOf($subvalue, [Object, Array])) {
                let subschema = schema.context[0]
                valid = (enableValidation && validationType === 'object')
                  ? subschema.validate($subvalue).valid
                  : null
                if(valid === true || valid === null) {
                  const subvalue = new Content($subvalue, {
                    basename: _basename,
                    parent: eventTarget,
                    path: _path,
                    rootAlias,
                  }, subschema)
                  subvalues[subvaluesIndex] = subvalue
                }
              }
              // Subvalue: Primitives
              else {
                valid = (enableValidation && validationType === 'primitive')
                  ? schema.validateProperty(valuesIndex, $subvalue).valid
                  : null 
                if(valid === true || valid === null) {
                  subvalues[subvaluesIndex] = $subvalue
                }
              }
              subvaluesIndex++
            }
            values[valuesIndex] = subvalues
          }
          // Value: Not Array
          else {
            // Value: Objects
            if(isDirectInstanceOf($value, [Object])) {
              let subschema = schema.context[0]
              valid = (enableValidation && validationType === 'object')
                ? subschema.validate($value).valid
                : null
              if(valid === true || valid === null) {
                const value = new Content($value, {
                  basename: _basename,
                  parent: eventTarget,
                  path: _path,
                  rootAlias,
                }, subschema)
                values[valuesIndex] = value
              }
            }
            // Value: Primitives
            else {
              valid = (enableValidation && validationType === 'primitive')
                ? schema.validateProperty(valuesIndex, $value).valid
                : null 
              if(valid === true || valid === null) {
                values[valuesIndex] = $value
              }
            }
          }
          if(valid === true || valid === null) {
            root = Array.prototype.concat.call(root, values[valuesIndex])
          }
          // EVENT:START
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
          // EVENT:STOP
          valuesIndex++
        }
        // EVENT:START
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
        // EVENT:STOP
        return root
      }
    }
  )
}