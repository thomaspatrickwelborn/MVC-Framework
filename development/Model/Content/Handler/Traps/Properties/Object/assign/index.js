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
  const { enableValidation, validationType } = schema.options
  return Object.defineProperty(
    $trap, $trapPropertyName, {
      value: function() {
        const sources = [...arguments]
        // Iterate Sources
        let validSource, validSourceProp
        iterateSources: 
        for(let $source of sources) {
          // Iterate Source Props
          iterateSourceProps:
          for(let [
            $sourcePropKey, $sourcePropVal
          ] of Object.entries($source)) {
            // Assign Root DET Property
            if(isDirectInstanceOf($sourcePropVal, [Object, Array/*, Map*/])) {
              let subschema
              switch(schema.contextType) {
                case 'array': subschema = schema.context[0]; break
                case 'object': subschema = schema.context[$sourcePropKey]; break
              }
              validSource = (enableValidation && validationType === 'object')
                ? subchema.validate($sourcePropVal).valid
                : null
              if(validSource === true || validSource === null) {
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
            }
            // Assign Root Property
            else {
              validSourceProp = (enableValidation && validationType === 'property')
                ? schema.validateProperty($sourcePropKey, $sourcePropVal).valid
                : null
              if(validSourceProp === true || validSourceProp === null) {
                Object.assign(root, {
                  [$sourcePropKey]: $sourcePropVal
                })
              }
            }
            // Assign Source Property Event
            if(events.includes('assignSourceProperty')) {
              if(validSourceProp === true || validSourceProp === null) {
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
          }
          // Assign Source Event
          if(events.includes('assignSource')) {
            if(validSource === true || validSource === null) {
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