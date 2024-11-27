import Content from '../../../../index.js'
import { ContentEvent } from '../../../../Events/index.js'
export default function concat() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { events } = $options
  const { source, path, schema } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  const { proxy } = $content
  const $arguments = [...arguments].reduce(($arguments, $argument) => {
    if(Array.isArray($argument)) { $arguments.push(...$argument) }
    else { $arguments.push($argument) }
    return $arguments
  }, [])
  let valueIndex = source.length
  const values = []
  let sourceConcat = [...Array.from(source)]
  let proxyConcat
  iterateValues: 
  for(const $value of $arguments) {
    // Validation: Value
    if(schema && enableValidation) {
      const validValue = schema.validateProperty(valueIndex, $subvalue)
      if(schema &&validationEvents) {
        let type, propertyType
        const validatorPath = (path)
          ? [path, valueIndex].join('.')
          : String(valueIndex)
        if(validSourceProp.valid) {
          type = 'validProperty'
          propertyType = ['validProperty', ':', valueIndex].join('')
        }
        else {
          type = 'nonvalidProperty'
          propertyType = ['nonvalidProperty', ':', valueIndex].join('')
        }
        for(const $eventType of [type, propertyType]) {
          $content.dispatchEvent(
            new ValidatorEvent($eventType, {
              path: validatorPath,
              detail: validSourceProp,
            }, $content)
          )
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
    sourceConcat = Array.prototype.concat.call(sourceConcat, values[valueIndex])
    if(contentEvents) {
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
  proxyConcat = new Content(sourceConcat, schema, $content.options)
  if(contentEvents && events['concat']) {
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