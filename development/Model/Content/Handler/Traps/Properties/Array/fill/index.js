import { isDirectInstanceOf } from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent } from '../../../../../Events/index.js'
export default function Fill(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options
  const {
    eventTarget, 
    root, 
    basename,
    path, 
    schema,
  } = $aliases
  const { enableValidation, validationEvents } = schema.options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments]
        let value = $arguments[0]
        if(enableValidation) {
          let validValue = schema.validate(validValue)
          if(validationEvents) {
            eventTarget.dispatchEvent(
              new ValidatorEvent('validateProperty', {
                basename: _basename,
                path: _path,
                detail: validValue,
              }, eventTarget)
            )
          }
          if(!validValue.valid) { return root }
        }
        if(isDirectInstanceOf(
          value, [Object, Array/*, Map*/]
        )) {
          const subschema = schema.context[0]
          value = new Content(value, {}, subschema)
        }
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
        while(
          fillIndex < root.length &&
          fillIndex < end
        ) {
          Array.prototype.fill.call(
            root, value, fillIndex, fillIndex + 1
          )
          const _basename = fillIndex
          const _path = (
            path !== null
          ) ? path.concat('.', fillIndex)
            : fillIndex
          // Array Fill Index Event
          if(events.includes('fillIndex')) {
            eventTarget.dispatchEvent(
              new ContentEvent('fillIndex', {
                basename: _basename,
                path: _path,
                detail: {
                  start: fillIndex,
                  end: fillIndex + 1,
                  value,
                },
              }, eventTarget)
            )
          }
          fillIndex++
        }
        // Array Fill Event
        if(events.includes('fill')) {
          eventTarget.dispatchEvent(
            new ContentEvent('fill', {
              basename,
              path,
              detail: {
                start,
                end,
                value,
              },
            },
            eventTarget)
          )
        }
        return root
      }
    }
  )
}