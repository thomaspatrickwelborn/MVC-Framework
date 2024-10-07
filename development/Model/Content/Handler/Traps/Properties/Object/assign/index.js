import { typeOf, isDirectInstanceOf } from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import { ContentEvent, ValidatorEvent } from '../../../../../Events/index.js'
export default function Assign(
  $trap, $trapPropertyName, $aliases, $options
) {
  const { merge, events } = $options
  const {
    basename, 
    eventTarget, 
    path, 
    root, 
    rootAlias, 
    schema,
  } = $aliases
  const { enableValidation, validationEvents } = schema.options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
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
            if(enableValidation) {
              const validSourceProp = schema.validateProperty($sourcePropKey, $sourcePropVal)
              if(validationEvents) {
                eventTarget.dispatchEvent(
                  new ValidatorEvent('validateProperty', {
                    basename: _basename,
                    path: _path,
                    detail: validSourceProp,
                  }, eventTarget)
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
                  parent: eventTarget,
                  path: _path,
                  rootAlias,
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
              eventTarget.dispatchEvent(
                new ContentEvent('assignSourceProperty', {
                  basename: _basename,
                  path: _path,
                  detail: {
                    key: $sourcePropKey,
                    val: $sourcePropVal,
                    source: $source,
                  }
                }, eventTarget)
              )
            }
          }
          // Assign Source Event
          if(events.includes('assignSource')) {
            eventTarget.dispatchEvent(
              new ContentEvent('assignSource', {
                basename,
                path,
                detail: {
                  source: $source,
                },
              }, eventTarget)
            )
          }
        }
        // Assign Event
        if(events.includes('assign')) {
          eventTarget.dispatchEvent(
            new ContentEvent('assign', { 
              basename,
              path,
              detail: {
                sources
              },
            }, eventTarget)
          )
        }
        return root
      }
    }
  )
}