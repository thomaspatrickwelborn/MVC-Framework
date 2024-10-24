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
  const $arguments = [...arguments].reduce(($arguments, $argument) => {
    if(Array.isArray($argument)) { $arguments.push(...$argument) }
    else { $arguments.push($argument) }
    return $arguments
  }, [])
  let valueIndex = root.length
  const values = []
  let rootConcat = [...Array.from(root)]
  let proxyConcat
  iterateValues: 
  for(const $value of $arguments) {
    const _basename = String(valueIndex)
    const _path = (path !== null)
      ? path.concat('.', _basename)
      : _basename
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
    // Value: Content
    if($value.classToString === Content.toString) {
      values[valueIndex] = value
    }
    // Value: Objects
    else if(typeof $value === 'object') {
      let subschema = schema?.context[0] || null
      const value = new Content($value, subschema, {
        parent: proxy,
        path: _path,
      })
      values[valueIndex] = value
    }
    // Value: Primitives
    else {
      values[valueIndex] = $value
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