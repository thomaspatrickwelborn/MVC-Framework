import { recursiveAssign } from '../../../../../../coutil/index.js'
import Content from '../../../../index.js'
import { ContentEvent } from '../../../../events/index.js'
export default function fill() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const ulteroptions = recursiveAssign({}, $options, $content.options)
  // console.log("fill", "ulteroptions", ulteroptions)
  const { events } = $options
  const { target, path, schema } = $content
  const { enableValidation, validationEvents } = $content.options
  const { proxy } = $content
  const $arguments = [...arguments]
  let $start
  if(typeof $arguments[1] === 'number') {
    $start = ($arguments[1] >= 0)
      ? $arguments[1]
      : target.length + $arguments[1]
  }
  else { $start = 0 }
  let $end
  if(typeof $arguments[2] === 'number') {
    $end = ($arguments[2] >= 0)
      ? $arguments[2]
      : target.length + $arguments[2]
  } else { $end = target.length }
  let fillIndex = $start
  iterateFillIndexes: 
  while(
    fillIndex < target.length &&
    fillIndex < $end
  ) {
    if(schema && enableValidation) {
      let validValue = schema.validate(validValue)
      if(validationEvents) {
        let type, propertyType
        const validatorPath = (path)
          ? [path, fillIndex].join('.')
          : String(fillIndex)
        if(validValue.valid) {
          type = 'validProperty'
          propertyType = ['validProperty', ':', fillIndex].join('')
        }
        else {
          type = 'nonvalidProperty'
          propertyType = ['nonvalidProperty', ':', fillIndex].join('')
        }
        for(const $eventType of [type, propertyType]) {
          $content.dispatchEvent(new ValidatorEvent($eventType, validValue, $content))
        }
      }
      if(!validValue.valid) { continue iterateFillIndexes }
    }
    const contentPath = (path)
      ? [path, fillIndex].join('.')
      : String(fillIndex)
    let value = $arguments[0]
    if(typeof value === 'object') {
      if(value?.classToString === Content.toString()) { value = value.object }
      const subschema = schema?.context[0] || null
      value = new Content(value, subschema, {
        path: contentPath,
        parent: $content,
      })
    }
    Array.prototype.fill.call(
      target, value, fillIndex, fillIndex + 1
    )
    // Array Fill Index Event
    if(events) {
      const contentEventPath = (path)
        ? [path, fillIndex].join('.')
        : String(fillIndex)
      if(events['fillIndex']) {
        $content.dispatchEvent(
          new ContentEvent('fillIndex', {
            path: contentEventPath, 
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
        $content.dispatchEvent(
          new ContentEvent(type, {
            path: contentEventPath, 
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
  if(events && events['fill']) {
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