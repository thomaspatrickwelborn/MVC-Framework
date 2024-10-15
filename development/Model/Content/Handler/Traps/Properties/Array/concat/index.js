import { isDirectInstanceOf } from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function Concat($content, $options) {
  const { events } = $options
  const { root, basename, path, schema } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  return function concat() {
    const { proxy } = $content
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
          if(schema && enableValidation) {
            const validSubvalue = schema.validate($subvalue)
            if(validationEvents) {
              $content.dispatchEvent(
                new ValidatorEvent('validateProperty', {
                  basename: _basename,
                  path: _path,
                  detail: validSubvalue,
                }, $content)
              )
            }
            if(!validSubvalue.valid) { subvaluesIndex++; continue iterateSubvalues }
          }
          // Subvalue: Objects
          if(isDirectInstanceOf($subvalue, [Object, Array])) {
            let subschema = schema.context[0] || null
            const subvalue = new Content($subvalue, subschema, {
              basename: _basename,
              parent: proxy,
              path: _path,
            })
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
        if(schema && enableValidation) {
          const validValue = schema.validateProperty(valuesIndex, $subvalue)
          if(validationEvents) {
            $content.dispatchEvent(
              new ValidatorEvent('validateProperty', {
                basename: _basename,
                path: _path,
                detail: validValue,
              }, $content)
            )
          }
          if(!validValue.valid) { valuesIndex++; continue iterateValues }
        }
        // Value: Objects
        if(isDirectInstanceOf($value, [Object])) {
          let subschema = schema.context[0] || null
          const value = new Content($value, subschema, {
            basename: _basename,
            parent: proxy,
            path: _path,
          })
          values[valuesIndex] = value
        }
        // Value: Primitives
        else {
          values[valuesIndex] = $value
        }
      }
      root = Array.prototype.concat.call(root, values[valuesIndex])
      if(contentEvents && events.includes('concatValue')) {
        if(valid === true || valid === null) {
          $content.dispatchEvent(
            new ContentEvent('concatValue', {
              basename: _basename,
              path: _path,
              detail: {
                valuesIndex,
                value: values[valuesIndex],
              },
            }, $content)
          )
        }
      }
      valuesIndex++
    }
    if(contentEvents && events.includes('concat')) {
      $content.dispatchEvent(
        new ContentEvent('concat', {
          basename,
          path,
          detail: {
            values
          },
        }, $content)
      )
    }
    return proxy
  }
}