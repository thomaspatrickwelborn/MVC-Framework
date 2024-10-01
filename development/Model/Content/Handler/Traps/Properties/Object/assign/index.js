import { typeOf, isDirectInstanceOf } from '../../Coutil/index.js'
import Content from '../../../../../index.js'
import ContentEvent from '../../../../../Event/index.js'
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
            // [VALIDATION:START]
            let valid, validateSourceProperty
            const { enableValidation } = schema.options
            // [VALIDATION:CONSTAT]
            // Assign Root DET Property
            if(isDirectInstanceOf($sourcePropVal, [Object, Array/*, Map*/])) {
              // [SUBSCHEMA:START]
              let subschema
              switch(schema.contextType) {
                case 'array': subschema = schema.context[0]; break
                case 'object': subschema = schema.context[$sourcePropKey]; break
              }
              // Enable Validation, No Subschema: Iterate Source Props
              if(enableValidation && !subschema) continue iterateSourceProps
              // [SUBSCHEMA:STOP]
              // Assign Root DET Property: Existent 
              if(root[$sourcePropKey]?.constructor.name === 'bound Content') {
                root[$sourcePropKey].assign($sourcePropVal)
              }
              // Assign Root DET Property: Non-Existent
              else {
                const _basename = $sourcePropKey
                const _path = (path !== null)
                  ? path.concat('.', $sourcePropKey)
                  : $sourcePropKey
                const contentObject = new Content(
                  $sourcePropVal, {
                    basename: _basename,
                    parent: eventTarget,
                    path: _path,
                    rootAlias,
                  }, subschema
                )
                Object.assign(root, {
                  [$sourcePropKey]: contentObject
                })
              }
            }
            // Assign Root Property
            else {
              // [VALIDATION:CONSTAT]
              validateSourceProperty = (enableValidation)
                ? schema.validateProperty($sourcePropKey, $sourcePropVal)
                : null
              valid = ((
                enableValidation && validateSourceProperty.valid
              ) || !enableValidation)
              if(valid) {
                // [VALIDATION:CONSTAT]
                Object.assign(root, {
                  [$sourcePropKey]: $sourcePropVal
                })
                // [VALIDATION:CONSTAT]
              }
              // [VALIDATION:STOP]
            }
            // Assign Source Property Event
            if(events.includes('assignSourceProperty') && valid) {
              eventTarget.dispatchEvent(
                new ContentEvent('assignSourceProperty', {
                  basename,
                  path,
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