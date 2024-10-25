import { recursiveAssign } from '../../../../../../Coutil/index.js'
import Content from '../../../../index.js'
import { ContentEvent, ValidatorEvent } from '../../../../Events/index.js'
export default function assign() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { sourceTree, events } = $options
  const { path, root, schema, proxy } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
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
      // Validation
      if(schema && enableValidation) {
        const validSourceProp = schema.validateProperty($sourcePropKey, $sourcePropVal)
        if(validationEvents) {
          // Validator Event: Validate Property
          $content.dispatchEvent(
            new ValidatorEvent('validateProperty', {
              path,
              detail: validSourceProp,
            }, $content)
          )
        }
        if(!validSourceProp.valid) { continue iterateSourceProps }
      }
      // Source Prop: Object Type
      if(typeof $sourcePropVal === 'object') {
        // Subschema
        let subschema
        if(schema?.contextType === 'array') { subschema = schema.context[0] }
        else if(schema?.contextType === 'object') { subschema = schema.context[$sourcePropKey] }
        else { subschema = null }
        // Content
        const _path = (path !== null)
          ? path.concat('.', $sourcePropKey)
          : $sourcePropKey
        const content = new Content($sourcePropVal, subschema, recursiveAssign({}, $content.options, {
          path: _path,
          parent: proxy,
        }))
        // Assignment
        let assignment
        // Source Tree: False
        if(sourceTree === false) {
          assignment = { [$sourcePropKey]: content }
        }
        // Source Tree: true
        else {
          const sourcePropVal = root[$sourcePropKey]
          // Assignment: Existing Content Instance
          if(sourcePropVal?.classToString === Content.toString()) {
            sourcePropVal.assign($sourcePropVal)
            Object.assign(sourcePropVal, { path: _path, parent: proxy })
            assignment = { [$sourcePropKey]: sourcePropVal }
          }
          // Assignment: New Content Instance
          else {
            assignment = { [$sourcePropKey]: content }
          }
        }
        // Assignment
        Object.assign(root, assignment)
        Object.assign(assignedSource, assignment)
      }
      // Source Prop: Primitive Type
      else {
        let assignment = {
          [$sourcePropKey]: $sourcePropVal
        }
        // Assign Root
        Object.assign(root, assignment)
        // Assigned Source
        Object.assign(assignedSource, assignment)
      }
      // Content Event: Assign Source Property
      if(contentEvents && events.includes('assignSourceProperty')) {
        $content.dispatchEvent(
          new ContentEvent('assignSourceProperty', {
            path,
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
    // Content Event: Assign Source
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
  // Content Event: Assign
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