import { recursiveAssign } from '../../../../../../Coutil/index.js'
import Content from '../../../../index.js'
import { ContentEvent, ValidatorEvent } from '../../../../Events/index.js'
export default function assign() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { sourceTree, events } = $options
  const { path, source, schema, proxy } = $content
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
          let type
          const _path = [path, '.', $sourcePropKey].join('')
          if(validSourceProp.valid) {
            type = ['validProperty', ':', $sourcePropKey].join('')
          }
          else {
            type = ['nonvalidProperty', ':', $sourcePropKey].join('')
          }
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
        if($sourcePropVal?.classToString === Content.toString()) { $sourcePropVal = $sourcePropVal.object }
        // Subschema
        let subschema
        if(schema?.type === 'array') { subschema = schema.context[0] }
        else if(schema?.type === 'object') { subschema = schema.context[$sourcePropKey] }
        else { subschema = null }
        // Content
        const _path = (path !== null)
          ? path.concat('.', $sourcePropKey)
          : $sourcePropKey
        let sourcePropVal = source[$sourcePropKey]
        // Assignment
        let assignment
        // Source Tree: False
        if(sourceTree === false) {
          assignment = { [$sourcePropKey]: content }
        }
        // Source Tree: true
        else {
          // Assignment: Existing Content Instance
          if(sourcePropVal?.classToString === Content.toString()) {
            sourcePropVal.assign($sourcePropVal)
          }
          // Assignment: New Content Instance
          else {
            sourcePropVal = new Content($sourcePropVal, subschema, 
              recursiveAssign({}, $content.options, {
                path: _path,
                parent: proxy,
              })
            )
          }
          assignment = { [$sourcePropKey]: sourcePropVal }
        }
        // Assignment
        Object.assign(source, assignment)
        Object.assign(assignedSource, assignment)
      }
      // Source Prop: Primitive Type
      else {
        let assignment = {
          [$sourcePropKey]: $sourcePropVal
        }
        // Assign Root
        Object.assign(source, assignment)
        // Assigned Source
        Object.assign(assignedSource, assignment)
      }
      // Content Event: Assign Source Property
      if(contentEvents) {
        if(events['assignSourceProperty']) {
          $content.dispatchEvent(
            new ContentEvent('assignSourceProperty', {
              path,
              value: $sourcePropVal,
              detail: {
                key: $sourcePropKey,
                value: $sourcePropVal,
                source: $source,
              }
            }, $content)
          )
        }
        if(events['assignSourceProperty:$key']) {
          const type = ['assignSourceProperty', ':', $sourcePropKey].join('')
          const _path = [path, '.', $sourcePropKey].join('')
          $content.dispatchEvent(
            new ContentEvent(type, {
              path: _path,
              detail: {
                key: $sourcePropKey,
                value: $sourcePropVal,
                source: $source,
              }
            }, $content)
          )
        }
      }
    }
    assignedSources.push(assignedSource)
    // Content Event: Assign Source
    if(contentEvents && events['assignSource']) {
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
  if(contentEvents && events['assign']) {
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