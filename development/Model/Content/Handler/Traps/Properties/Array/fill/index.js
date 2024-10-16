import { isDirectInstanceOf } from '../../../../../../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function fill() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { events } = $options
  const { root, basename, path, schema } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  const { proxy } = $content
  const $arguments = [...arguments]
  let start
  if(typeof $arguments[1] === 'number') {
    start = (
      $arguments[1] >= 0
    ) ? $arguments[1]
      : root.length + $arguments[1]
  } else {
    start = 0
  }
  let end
  if(typeof $arguments[2] === 'number') {
    end = (
      $arguments[2] >= 0
    ) ? $arguments[2]
      : root.length + $arguments[2]
  } else {
    end = root.length
  }
  let fillIndex = start
  iterateFillIndexes: 
  while(
    fillIndex < root.length &&
    fillIndex < end
  ) {
    const _basename = fillIndex
    const _path = (
      path !== null
    ) ? path.concat('.', fillIndex)
      : fillIndex
    
    if(schema && enableValidation) {
      let validValue = schema.validate(validValue)
      if(validationEvents) {
        $content.dispatchEvent(
          new ValidatorEvent('validateProperty', {
            basename: _basename,
            path: _path,
            detail: validValue,
          }, $content)
        )
      }
      if(!validValue.valid) { continue iterateFillIndexes }
    }
    let value = $arguments[0]
    if(isDirectInstanceOf(
      value, [Object, Array]
    )) {
      const subschema = schema?.context[0] || null
      value = new Content(value, subschema, {
        basename: _basename,
        path: _path,
        parent: proxy,
      })
    }
    Array.prototype.fill.call(
      root, value, fillIndex, fillIndex + 1
    )
    // Array Fill Index Event
    if(contentEvents && events.includes('fillIndex')) {
      $content.dispatchEvent(
        new ContentEvent('fillIndex', {
          basename: _basename,
          path: _path,
          detail: {
            start: fillIndex,
            end: fillIndex + 1,
            value,
          },
        }, $content)
      )
    }
    fillIndex++
  }
  // Array Fill Event
  if(contentEvents && events.includes('fill')) {
    $content.dispatchEvent(
      new ContentEvent('fill', {
        basename,
        path,
        detail: {
          start,
          end,
          value,
        },
      },
      $content)
    )
  }
  return proxy
}