import { typeOf } from '../../../../../../../Coutil/index.js'
import { ContentEvent, ValidatorEvent } from '../../../../../Events/index.js'
import Content from '../../../../../index.js'
export default function SetProperty(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options
  const { root, schema, basename, parent, path, eventTarget } = $aliases
  const { enableValidation, validationEvents } = schema.options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const { proxy } = eventTarget
        const paths = (arguments.length === 1)
          ? Object.entries(arguments[0])
          : (arguments.length === 2)
            ? [[...arguments]]
            : []
        iteratePaths: 
        for(let [$path, $value] of paths) {
          let value
          const pathSegments = $path.split('.')
          const pathRootSegment = pathSegments.shift()
          if(pathSegments.length) {
            return proxy[pathRootSegment].set(pathSegments.join('.'), $value)
          }
          const _basename = pathRootSegment
          const _path = (path !== null)
            ? path.concat('.', pathRootSegment)
            : pathRootSegment
          if(enableValidation) {
            const validValue = schema.validateProperty(pathRootSegment, $value)
            if(validationEvents) {
              eventTarget.dispatchEvent(
                new ValidatorEvent('validateProperty', {
                  parent: eventTarget,
                  basename, 
                  path, 
                  detail: validValue,
                }, eventTarget)
              )
            }
            if(!validValue.valid) { return false }
          }
          // Content Property: Existent
          if($value?.eventTarget instanceof Content) {
            value = $value
            value.set($value)
          }
          // Content Property: Non-Existent
          else if(typeof $value === 'object') {
            let subschema
            switch(schema.contextType) {
              case 'array': subschema = schema.context[0]; break
              case 'object': subschema = schema.context[pathRootSegment]; break
            }
            const contentLiteral = (Array.isArray($value))
              ? []
              : {}
            value = new Content(contentLiteral, {
              parent: eventTarget,
              basename: _basename,
              path: _path,
              parent: eventTarget,
            }, subschema)
            value.set($value)
          } else { value = $value }
          root[pathRootSegment] = $value
          proxy[pathRootSegment] = value
          if(events.includes('set')) {
            eventTarget.dispatchEvent(
              new ContentEvent('set', {
                parent: eventTarget,
                basename: _basename,
                path: _path,
                detail: {
                  property: _basename,
                  value: value,
                },
              }, eventTarget)
            )
          }
        }
        if(arguments.length === 1) { return proxy }
        else if(arguments.length === 2) { return proxy[arguments[0]] }
      }
    }
  )
}