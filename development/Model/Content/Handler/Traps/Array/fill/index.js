import Content from '../../../../index.js'
import { ContentEvent } from '../../../../Events/index.js'
export default function fill() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { events } = $options
  const { source, path, schema } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  const { proxy } = $content
  const $arguments = [...arguments]
  let $start
  if(typeof $arguments[1] === 'number') {
    $start = ($arguments[1] >= 0)
      ? $arguments[1]
      : source.length + $arguments[1]
  }
  else { $start = 0 }
  let $end
  if(typeof $arguments[2] === 'number') {
    $end = ($arguments[2] >= 0)
      ? $arguments[2]
      : source.length + $arguments[2]
  } else { $end = source.length }
  let fillIndex = $start
  iterateFillIndexes: 
  while(
    fillIndex < source.length &&
    fillIndex < $end
  ) {
    if(schema && enableValidation) {
      let validValue = schema.validate(validValue)
      if(validationEvents) {
        let type
        const _path = [path, '.', fillIndex].join('')
        if(validSourceProp.valid) {
          type = ['validProperty', ':', fillIndex].join('')
        }
        else {
          type = ['nonvalidProperty', ':', fillIndex].join('')
        }
        $content.dispatchEvent(
          new ValidatorEvent(type, {
            path: _path, 
            detail: validValue,
          }, $content)
        )
      }
      if(!validValue.valid) { continue iterateFillIndexes }
    }
    const _path = (path !== null)
      ? path.concat('.', fillIndex)
      : fillIndex
    let value = $arguments[0]
    if(typeof value === 'object') {
      if(value?.classToString === Content.toString()) { value = value.object }
      const subschema = schema?.context[0] || null
      value = new Content(value, subschema, {
        path: _path,
        parent: proxy,
      })
    }
    Array.prototype.fill.call(
      source, value, fillIndex, fillIndex + 1
    )
    // Array Fill Index Event
    if(contentEvents) {
      if(events['fillIndex']) {
        $content.dispatchEvent(
          new ContentEvent('fillIndex', {
            path, 
            value: value,
            detail: {
              start: fillIndex,
              end: fillIndex + 1,
              value,
            },
          }, $content)
        )
      }
      if(events['fillIndex:$index']) {
        const type = ['fillIndex', ':', fillIndex].join('')
        const _path = [path, '.', fillIndex].join('')
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: _path, 
            detail: {
              start: fillIndex,
              end: fillIndex + 1,
              value,
            },
          }, $content)
        )
      }
    }
    fillIndex++
  }
  // Array Fill Event
  if(contentEvents && events['fill']) {
    $content.dispatchEvent(
      new ContentEvent('fill', {
        path,
        detail: {
          start: $start,
          end: $end,
          value,
        },
      },
      $content)
    )
  }
  return proxy
}