import { typeOf, isDirectInstanceOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../../../../index.js'
import DETEvent from '../../../../../DynamicEvent/index.js'
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
            let valid, validateSourceProperty
            let subschema
            switch(schema.contextType) {
              case 'array': subschema = schema.context[0]; break
              case 'object': subschema = schema.context[$sourcePropKey]; break
            }
            const { enableValidation } = schema.options
            // Enable Validation, No Subschema: Iterate Source Props
            if(enableValidation && !subschema) continue iterateSourceProps
            // Assign Root DET Property
            if(isDirectInstanceOf($sourcePropVal, [Object, Array/*, Map*/])) {
              // Assign Root DET Property: Existent 
              if(root[$sourcePropKey]?.constructor.name === 'bound DynamicEventTarget') {
                root[$sourcePropKey].assign($sourcePropVal)
              }
              // Assign Root DET Property: Non-Existent
              else {
                const _basename = $sourcePropKey
                const _path = (path !== null)
                  ? path.concat('.', $sourcePropKey)
                  : $sourcePropKey
                const detObject = new DynamicEventTarget(
                  $sourcePropVal, {
                    basename: _basename,
                    parent: eventTarget,
                    path: _path,
                    rootAlias,
                  }, subschema
                )
                Object.assign(root, {
                  [$sourcePropKey]: detObject
                })
              }
            }
            // Assign Root Property
            else {
              validateSourceProperty = (enableValidation)
                ? schema.validateProperty($sourcePropKey, $sourcePropVal)
                : null
              valid = ((
                enableValidation && validateSourceProperty.valid
              ) || !enableValidation)
              if(valid) {
                Object.assign(root, {
                  [$sourcePropKey]: $sourcePropVal
                })
              }
            }
            // Assign Source Property Event
            if(events.includes('assignSourceProperty') && valid) {
              eventTarget.dispatchEvent(
                new DETEvent('assignSourceProperty', {
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
              new DETEvent('assignSource', {
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
            new DETEvent('assign', { 
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