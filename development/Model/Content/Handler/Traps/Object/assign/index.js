import { typeOf, isDirectInstanceOf } from '../../../../../../Coutil/index.js'
import Content from '../../../../index.js'
import { ContentEvent, ValidatorEvent } from '../../../../Events/index.js'
export default function assign() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { recursive, events } = $options
  const { path, root, schema } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  const { proxy } = $content
  const sources = [...arguments]
  const assignedSources = []
  // Iterate Sources
  iterateSources: 
  for(let $source of sources) {
    let assignedSource
    if(Array.isArray($source)) { assignedSource = [] }
    else if(typeof $source === 'object') { assignedSource = {} }
    // Iterate Source Props
    iterateSourceProps:
    for(let [$sourcePropKey, $sourcePropVal] of Object.entries($source)) {
      const _path = (path !== null)
        ? path.concat('.', $sourcePropKey)
        : $sourcePropKey
      // Validation
      if(schema && enableValidation) {
        const validSourceProp = schema.validateProperty($sourcePropKey, $sourcePropVal)
        if(validationEvents) {
          $content.dispatchEvent(
            new ValidatorEvent('validateProperty', {
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
          default: subschema = undefined
        }
        // Assign Root Content Property: Existent
        if(root[$sourcePropKey]?.constructor.name === 'bound Content') {
          // Assign Root
          root[$sourcePropKey].assign($sourcePropVal)
          // Assigned Source
          Object.assign(assignedSource, {
            [$sourcePropKey]: $sourcePropVal
          })
        }
        // Assign Root Content Property: Non-Existent
        else {
          const contentObject = new Content($sourcePropVal, subschema, Object.assign({
            parent: proxy,
            path: _path,
          }, $options))
          // Assign Root
          Object.assign(root, {
            [$sourcePropKey]: contentObject
          })
          // Assigned Source
          Object.assign(assignedSource, {
            [$sourcePropKey]: contentObject
          })
        }
      }
      // Source Prop: Primitive Type
      else {
        // Assign Root
        Object.assign(root, {
          [$sourcePropKey]: $sourcePropVal
        })
        // Assigned Source
        Object.assign(assignedSource, {
          [$sourcePropKey]: $sourcePropVal
        })
      }
      // Assign Source Property Event
      if(contentEvents && events.includes('assignSourceProperty')) {
        $content.dispatchEvent(
          new ContentEvent('assignSourceProperty', {
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
    assignedSources.push(assignedSource)
    // Assign Source Event
    if(contentEvents && events.includes('assignSource')) {
      $content.dispatchEvent(
        new ContentEvent('assignSource', {
          path,
          detail: {
            source: assignedSource,
          },
        }, $content)
      )
    }
  }
  // Assign Event
  if(contentEvents && events.includes('assign')) {
    $content.dispatchEvent(
      new ContentEvent('assign', { 
        path,
        detail: {
          assignedSources
        },
      }, $content)
    )
  }
  return proxy
}