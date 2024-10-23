import { isDirectInstanceOf } from '../../../../../../Coutil/index.js'
import Content from '../../../../index.js'
import { ContentEvent } from '../../../../Events/index.js'
export default function concat() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { events } = $options
  const { root, basename, path, schema } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  const { proxy } = $content
  const $arguments = [...arguments]
  let valueIndex = root.length
  const values = []
  let rootConcat = [...Array.from(root)]
  let proxyConcat
  iterateValues: 
  for(const $value of $arguments) {
    let _basename
    let _path
    // Value: Array
    if(Array.isArray($value)) {
      let subvalueIndex = 0
      const subvalues = []
      iterateSubvalues: 
      for(const $subvalue of $value) {
        _basename = valueIndex + subvalueIndex
        _path = (path !== null)
        ? path.concat('.', valueIndex + subvalueIndex)
        : valueIndex
        // Validation: Subvalue
        if(schema && enableValidation) {
          const validSubvalue = schema.validate($subvalue)
          if(schema && validationEvents) {
            $content.dispatchEvent(
              new ValidatorEvent('validateProperty', {
                basename: _basename,
                path: _path,
                detail: validSubvalue,
              }, $content)
            )
          }
          if(!validSubvalue.valid) { subvalueIndex++; continue iterateSubvalues }
        }
        // Subvalue: Objects
        if(isDirectInstanceOf($subvalue, [Object, Array])) {
          let subschema = schema?.context[0] || null
          const subvalue = new Content($subvalue, subschema, {
            basename: _basename,
            parent: proxy,
            path: _path,
          })
          subvalues[subvalueIndex] = subvalue
        }
        // Subvalue: Primitives
        else {
          subvalues[subvalueIndex] = $subvalue
        }
        subvalueIndex++
      }
      values[valueIndex] = subvalues
    }
    // Value: Not Array
    else {
      _basename = valueIndex
      _path = (path !== null)
        ? path.concat('.', valueIndex)
        : valueIndex
      // Validation: Value
      if(schema && enableValidation) {
        const validValue = schema.validateProperty(valueIndex, $subvalue)
        if(schema &&validationEvents) {
          $content.dispatchEvent(
            new ValidatorEvent('validateProperty', {
              basename: _basename,
              path: _path,
              detail: validValue,
            }, $content)
          )
        }
        if(!validValue.valid) { valueIndex++; continue iterateValues }
      }
      // Value: Objects
      if(isDirectInstanceOf($value, [Object])) {
        let subschema = schema?.context[0] || null
        const value = new Content($value, subschema, {
          basename: _basename,
          parent: proxy,
          path: _path,
        })
        values[valueIndex] = value
      }
      // Value: Primitives
      else {
        values[valueIndex] = $value
      }
    }
    rootConcat = Array.prototype.concat.call(rootConcat, values[valueIndex])
    if(contentEvents && events.includes('concatValue')) {
      $content.dispatchEvent(
        new ContentEvent('concatValue', {
          basename: _basename,
          path: _path,
          detail: {
            valueIndex,
            value: values[valueIndex],
          },
        }, $content)
      )
    }
    valueIndex++
  }
  proxyConcat = new Content(rootConcat, schema, $content.options)
  if(contentEvents && events.includes('concat')) {
    $content.dispatchEvent(
      new ContentEvent('concat', {
        basename,
        path,
        detail: {
          values: proxyConcat,
        },
      }, $content)
    )
  }
  return proxyConcat
}