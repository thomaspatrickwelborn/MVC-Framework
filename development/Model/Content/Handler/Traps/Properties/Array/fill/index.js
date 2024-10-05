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
    rootAlias, 
    basename,
    path, 
    schema,
  } = $aliases
  const { enableValidation, validationType } = schema.options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const $arguments = [...arguments]
        let value = $arguments[0]
        let validValue
        if(isDirectInstanceOf(
          value, [Object, Array/*, Map*/]
        )) {
          const subschema = schema.context[0]
          validValue = (enableValidation && validationType === 'object')
            ? subschema.validate(value).valid
            : null
          if(validValue === true || validValue === null) {
            value = new Content(value, {
              rootAlias: rootAlias,
            }, subschema)
          }
        } else {
          validValue = (enableValidation && validationType === 'primitive')
            ? schema.validateProperty(0, value).valid
            : null
        }
        if(validValue === false) return root
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