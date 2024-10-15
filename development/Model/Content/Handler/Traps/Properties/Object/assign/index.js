import { typeOf, isDirectInstanceOf } from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent, ValidatorEvent } from '../../../../../Events/index.js'
export default function Assign($content, $options) {
  const { recursive, events } = $options
  const { basename, path, root, schema } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  return function assign() {
    const { proxy } = $content
    const sources = [...arguments]
    // Iterate Sources
    iterateSources: 
    for(let $source of sources) {
      // Iterate Source Props
      iterateSourceProps:
      for(let [
        $sourcePropKey, $sourcePropVal
      ] of Object.entries($source)) {
        const _basename = $sourcePropKey
        const _path = (path !== null)
          ? path.concat('.', _basename)
          : _basename
        // Validation
        if(schema && enableValidation) {
          const validSourceProp = schema.validateProperty($sourcePropKey, $sourcePropVal)
          if(validationEvents) {
            $content.dispatchEvent(
              new ValidatorEvent('validateProperty', {
                basename: _basename,
                path: _path,
                detail: validSourceProp,
              }, $content)
            )
          }
          if(!validSourceProp.valid) { continue iterateSourceProps }
        }
        // Assign Root Content Property
        // Source Prop: Object Type
        if(isDirectInstanceOf($sourcePropVal, [Object, Array/*, Map*/])) {
          let subschema
          switch(schema.contextType) {
            case 'array': subschema = schema.context[0]; break
            case 'object': subschema = schema.context[$sourcePropKey]; break
            default: subschema = null
          }
          // Assign Root Content Property: Existent
          if(root[$sourcePropKey]?.constructor.name === 'bound Content') {
            root[$sourcePropKey].assign($sourcePropVal)
          }
          // Assign Root Content Property: Non-Existent
          else {
            const contentObject = new Content($sourcePropVal, subschema, {
              basename: _basename,
              parent: proxy,
              path: _path,
            })
            Object.assign(root, {
              [$sourcePropKey]: contentObject
            })
          }
        }
        // Source Prop: Primitive Type
        else {
          Object.assign(root, {
            [$sourcePropKey]: $sourcePropVal
          })
        }
        // Assign Source Property Event
        if(contentEvents && events.includes('assignSourceProperty')) {
          $content.dispatchEvent(
            new ContentEvent('assignSourceProperty', {
              basename: _basename,
              path: _path,
              detail: {
                key: $sourcePropKey,
                val: $sourcePropVal,
                source: $source,
              }
            }, $content)
          )
        }
      }
      // Assign Source Event
      if(contentEvents && events.includes('assignSource')) {
        $content.dispatchEvent(
          new ContentEvent('assignSource', {
            basename,
            path,
            detail: {
              source: $source,
            },
          }, $content)
        )
      }
    }
    // Assign Event
    if(contentEvents && events.includes('assign')) {
      $content.dispatchEvent(
        new ContentEvent('assign', { 
          basename,
          path,
          detail: {
            sources
          },
        }, $content)
      )
    }
    return proxy
  }
}