import { typeOf, isDirectInstanceOf } from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent, ValidatorEvent } from '../../../../../Events/index.js'
export default function Assign($content, $options) {
  const { recursive, events } = $options
  const { basename, path, root, schema } = $content
  const { enableValidation, validationEvents } = $content.options
  return function assign() {
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
          ? path.concat('.', $sourcePropKey)
          : $sourcePropKey
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
        // Assign Root DET Property
        // Source Prop: Object Type
        if(isDirectInstanceOf($sourcePropVal, [Object, Array/*, Map*/])) {
          let subschema
          switch(schema.contextType) {
            case 'array': subschema = schema.context[0]; break
            case 'object': subschema = schema.context[$sourcePropKey]; break
          }
          // Assign Root DET Property: Existent
          if(root[$sourcePropKey]?.constructor.name === 'bound Content') {
            root[$sourcePropKey].assign($sourcePropVal)
          }
          // Assign Root DET Property: Non-Existent
          else {
            const contentObject = new Content($sourcePropVal, {
              basename: _basename,
              parent: $content,
              path: _path,
            }, subschema)
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
        if(events.includes('assignSourceProperty')) {
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
      if(events.includes('assignSource')) {
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
    if(events.includes('assign')) {
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
    return root
  }
}