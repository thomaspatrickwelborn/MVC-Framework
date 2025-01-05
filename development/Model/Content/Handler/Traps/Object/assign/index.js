import { recursiveAssign } from '../../../../../../Coutil/index.js'
import Content from '../../../../index.js'
import { ContentEvent, ValidatorEvent } from '../../../../Events/index.js'
export default function assign() {
  const $content = Array.prototype.shift.call(arguments)
  const $options = Array.prototype.shift.call(arguments)
  const { sourceTree, events } = $options
  const { path, source, schema, proxy } = $content
  const { enableValidation, validationEvents, contentEvents } = $content.options
  const assignSources = [...arguments]
  const assignedSources = []
  // Iterate Sources
  iterateAssignSources: 
  for(let $assignSource of assignSources) {
    let assignedSource
    if(Array.isArray($assignSource)) { assignedSource = [] }
    else if(typeof $assignSource === 'object') { assignedSource = {} }
    /* <- Property Validation -> */ 
    // Iterate Source Props
    iterateSourceProps:
    for(let [$assignSourcePropKey, $assignSourcePropVal] of Object.entries($assignSource)) {
      let sourcePropVal = source[$assignSourcePropKey]
      let assignSourcePropVal
      const sourcePropValIsContentInstance = (
        source[$assignSourcePropKey]?.classToString === Content.toString()
      ) ? true : false
      // Validation
      if(schema && enableValidation) {
        const validSourceProp = schema.validateProperty($assignSourcePropKey, $assignSourcePropVal, $assignSource, proxy)
        if(validationEvents) {
          let type, propertyType
          const validatorEventPath = (path) ? [path, $assignSourcePropKey].join('.') : String($assignSourcePropKey)
          if(validSourceProp.valid) {
            type = 'validProperty'
            propertyType = ['validProperty', $assignSourcePropKey].join(':')
          }
          else {
            type = 'nonvalidProperty'
            propertyType = ['nonvalidProperty', $assignSourcePropKey].join(':')
          }
          for(const $eventType of [type, propertyType]) {
            $content.dispatchEvent(
              new ValidatorEvent($eventType, {
                path: validatorEventPath,
                detail: validSourceProp,
              }, $content)
            )
          }
          // Validator Event: Validate Property
        }
        if(!validSourceProp.valid) { continue iterateSourceProps }
      }
      const change = {
        preter: {
          key: $assignSourcePropKey,
          value: source[$assignSourcePropKey],
        },
        anter: {
          key: $assignSourcePropKey,
          value: undefined,
        },
        conter: undefined
      }
      // Source Prop: Object Type
      if($assignSourcePropVal && typeof $assignSourcePropVal === 'object') {
        if($assignSourcePropVal.classToString === Content.toString()) {
          $assignSourcePropVal = $assignSourcePropVal.object
        }
        // Subschema
        let subschema
        if(schema?.type === 'array') { subschema = schema.context[0] }
        else if(schema?.type === 'object') { subschema = schema.context[$assignSourcePropKey] }
        else { subschema = null }
        // Content
        const contentPath = (path)
          ? [path, $assignSourcePropKey].join('.')
          : String($assignSourcePropKey)
        // Assignment
        let assignment
        // Source Tree: False
        if(sourceTree === false) {
          assignment = { [$assignSourcePropKey]: content }
        }
        // Source Tree: true
        else {
          // Assignment: Existing Content Instance
          if(sourcePropValIsContentInstance) {
            sourcePropVal.assign($assignSourcePropVal)
          }
          // Assignment: New Content Instance
          else {
            sourcePropVal = new Content($assignSourcePropVal, subschema, 
              recursiveAssign({}, $content.options, {
                path: contentPath,
                parent: proxy,
              })
            )
          }
          assignment = { [$assignSourcePropKey]: sourcePropVal }
        }
        // Assignment
        Object.assign(source, assignment)
        Object.assign(assignedSource, assignment)
      }
      // Source Prop: Primitive Type
      else {
        let assignment = {
          [$assignSourcePropKey]: $assignSourcePropVal
        }
        // Assign Root
        Object.assign(source, assignment)
        // Assigned Source
        Object.assign(assignedSource, assignment)
      }
      change.anter.value = sourcePropVal
      change.conter = (sourcePropValIsContentInstance)
        ? (sourcePropVal.string !== JSON.stringify(sourcePropVal))
        : (JSON.stringify(sourcePropVal) !== JSON.stringify(sourcePropVal))
      change.anter.value = sourcePropVal
      // Content Event: Assign Source Property
      if(contentEvents) {
        const contentEventPath = (path) ? [path, $assignSourcePropKey].join('.') : String($assignSourcePropKey)
        if(events['assignSourceProperty']) {
          $content.dispatchEvent(
            new ContentEvent('assignSourceProperty', {
              path: contentEventPath,
              value: $assignSourcePropVal,
              change,
              detail: {
                key: $assignSourcePropKey,
                value: $assignSourcePropVal,
                source: $assignSource,
              }
            }, $content)
          )
        }
        if(events['assignSourceProperty:$key']) {
          const type = ['assignSourceProperty', $assignSourcePropKey].join(':')
          $content.dispatchEvent(
            new ContentEvent(type, {
              path: contentEventPath,
              value: $assignSourcePropVal,
              change,
              detail: {
                key: $assignSourcePropKey,
                value: $assignSourcePropVal,
                source: $assignSource,
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
          sources: assignedSources
        },
      }, $content)
    )
  }
  return proxy
}