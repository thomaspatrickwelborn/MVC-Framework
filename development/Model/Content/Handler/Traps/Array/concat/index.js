import Content from '../../../../index.js'
import { ContentEvent } from '../../../../Events/index.js'
export default function concat() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { events } = $options
  const { target, path, schema } = $content
  const { enableValidation, validationEvents } = $content.options
  const { proxy } = $content
  const $arguments = [...arguments].reduce(($arguments, $argument) => {
    if(Array.isArray($argument)) { $arguments.push(...$argument) }
    else { $arguments.push($argument) }
    return $arguments
  }, [])
  let valueIndex = target.length
  const values = []
  let targetConcat = [...Array.from(target)]
  let proxyConcat
  iterateValues: 
  for(const $value of $arguments) {
    // Validation: Value
    if(schema && enableValidation) {
      const validValue = schema.validateProperty(valueIndex, $subvalue, $content, proxy)
      if(schema &&validationEvents) {
        let type, propertyType
        const validatorPath = (path)
          ? [path, valueIndex].join('.')
          : String(valueIndex)
        if(validValue.valid) {
          type = 'validProperty'
          propertyType = ['validProperty', ':', valueIndex].join('')
        }
        else {
          type = 'nonvalidProperty'
          propertyType = ['nonvalidProperty', ':', valueIndex].join('')
        }
        for(const $eventType of [type, propertyType]) {
          $content.dispatchEvent(new ValidatorEvent($eventType, validValue, $content))
        }
      }
      if(!validValue.valid) { valueIndex++; continue iterateValues }
    }
    const contentPath = (path)
      ? [path, valueIndex].join('.')
      : String(valueIndex)
    // Value: Object Type
    if(typeof $value === 'object') {
      // Value: Content
      if($value?.classToString === Content.toString()) { $value = $value.object }
      let subschema = schema?.context[0] || null
      const value = new Content($value, subschema, {
        path: contentPath,
        parent: proxy,
      })
      values[valueIndex] = value
    }
    // Value: Primitive Type
    else {
      values[valueIndex] = $value
    }
    targetConcat = Array.prototype.concat.call(targetConcat, values[valueIndex])
    if(events) {
      const contentEventPath = (path)
        ? [path, valueIndex].join('.')
        : String(valueIndex)
      if(events['concatValue']) {
        $content.dispatchEvent(
          new ContentEvent('concatValue', {
            path: contentEventPath,
            value: values[valueIndex],
            detail: {
              valueIndex,
              value: values[valueIndex],
            },
          }, $content)
        )
      }
      if(events['concatValue:$index']) {
        const type = ['concatValue', ':', valueIndex].join('')
        $content.dispatchEvent(
          new ContentEvent('concatValue', {
            path: contentEventPath,
            value: values[valueIndex],
            detail: {
              valueIndex,
              value: values[valueIndex],
            },
          }, $content)
        )
      }
    }
    valueIndex++
  }
  proxyConcat = new Content(targetConcat, schema, $content.options)
  if(events && events['concat']) {
    $content.dispatchEvent(
      new ContentEvent('concat', {
        path,
        detail: {
          values: proxyConcat,
        },
      }, $content)
    )
  }
  return proxyConcat
}