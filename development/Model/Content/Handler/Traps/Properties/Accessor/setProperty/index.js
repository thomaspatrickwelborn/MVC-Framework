import { ContentEvent, ValidatorEvent } from '../../../../../Events/index.js'
import Content from '../../../../../index.js'
export default function SetProperty(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { events } = $options
  const { root, schema, basename, path, eventTarget } = $aliases
  const { enableValidation, validationEvents } = schema.options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function($path, $value) {
        const pathSegments = $path.split('.')
        const rootPathSegment = pathSegments.shift()
        if(pathSegments.length) {
          return root[rootPathSegment].set(pathSegments.join('.'), $value)
        }
        if(enableValidation) {
          const _basename = $path
          const _path = (path !== null)
            ? path.concat('.', $path)
            : $path
          const validValue = schema.validateProperty(rootPathSegment, $value)
          if(validationEvents) {
            eventTarget.dispatchEvent(
              new ValidatorEvent('validateProperty', {
                basename: _basename,
                path: _path,
                detail: validValue,
              }, eventTarget)
            )
          }
          if(!validValue.valid) { return false }
        }
        // Dynamic Event Target Property
        if(typeof $value === 'object') {
          let subschema
          switch(schema.contextType) {
            case 'array': subschema = schema.context[0]; break
            case 'object': subschema = schema.context[$path]; break
          }
          $value = new Content($value, {
            path,
            basename,
            parent: eventTarget,
          }, subschema)
        }
        root[rootPathSegment] = $value
        if(events.includes('set')) {
          eventTarget.dispatchEvent(
            new ContentEvent('set', {
              basename: basename, // : _basename,
              path: $path, // : _path,
              detail: {
                property: $path,
                value: $value,
              },
            }, eventTarget)
          )
        }
        return root[rootPathSegment]
      }
    }
  )
}