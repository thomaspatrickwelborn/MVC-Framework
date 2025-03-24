import { recursiveAssign, typedObjectLiteral } from '../../../../../../coutil/index.js'
import Content from '../../../../index.js'
import { ContentEvent, ValidatorEvent } from '../../../../events/index.js'
export default function assign($content, $options, ...$sources) {
  const ulteroptions = recursiveAssign({}, $options, $content.options)
  const { path, target, schema } = $content
  const { events, sourceTree, enableValidation, validationEvents } = ulteroptions
  const assignedSources = []
  // Iterate Sources
  iterateAssignSources: 
  for(let $assignSource of $sources) {
    let assignedSource
    if(Array.isArray($assignSource)) { assignedSource = [] }
    else if(typeof $assignSource === 'object') { assignedSource = {} }
    // Iterate Source Props
    iterateSourceProps:
    for(let [$assignSourcePropKey, $assignSourcePropVal] of Object.entries($assignSource)) {
      let targetPropVal = target[$assignSourcePropKey]
      let assignSourcePropVal
      const targetPropValIsContentInstance = (
        target[$assignSourcePropKey]?.classToString === Content.toString()
      ) ? true : false
      // Validation
      if(schema && enableValidation) {
        const validSourceProp = schema.validateProperty(
          $assignSourcePropKey, $assignSourcePropVal, $assignSource, $content
        )
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
            $content.dispatchEvent(new ValidatorEvent($eventType, validSourceProp, $content))
          }
        }
        if(!validSourceProp.valid) { continue iterateSourceProps }
      }
      const change = {
        preter: {
          key: $assignSourcePropKey,
          value: target[$assignSourcePropKey],
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
        let contentTypedLiteral = typedObjectLiteral($assignSourcePropVal)
        // Assignment
        let assignment
        // Source Tree: False
        if(sourceTree === false) {
          targetPropVal = new Content(contentTypedLiteral, subschema, 
            recursiveAssign({}, $content.options, {
              path: contentPath,
              parent: $content,
            })
          )
          targetPropVal.assign($assignSourcePropVal)
          assignment = { [$assignSourcePropKey]: targetPropVal }
        }
        // Source Tree: true
        else {
          // Assignment: Existing Content Instance
          if(targetPropValIsContentInstance) {
            targetPropVal.assign($assignSourcePropVal)
          }
          // Assignment: New Content Instance
          else {
            targetPropVal = new Content(contentTypedLiteral, subschema, 
              recursiveAssign({}, $content.options, {
                path: contentPath,
                parent: $content,
              })
            )
            targetPropVal.assign($assignSourcePropVal)
          }
          assignment = { [$assignSourcePropKey]: targetPropVal }
        }
        // Assignment
        Object.assign(target, assignment)
        Object.assign(assignedSource, assignment)
      }
      // Source Prop: Primitive Type
      else {
        let assignment = {
          [$assignSourcePropKey]: $assignSourcePropVal
        }
        // Assign Root
        Object.assign(target, assignment)
        // Assigned Source
        Object.assign(assignedSource, assignment)
      }
      change.anter.value = targetPropVal
      change.conter = (targetPropValIsContentInstance)
        ? (targetPropVal.string !== JSON.stringify(targetPropVal))
        : (JSON.stringify(targetPropVal) !== JSON.stringify(targetPropVal))
      change.anter.value = targetPropVal
      // Content Event: Assign Source Property
      if(events) {
        const contentEventPath = (path) ? [path, $assignSourcePropKey].join('.') : String($assignSourcePropKey)
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
      }
    }
    assignedSources.push(assignedSource)
    // Content Event: Assign Source
    if(events && events['assignSource']) {
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
  if(events && events['assign']) {
    $content.dispatchEvent(
      new ContentEvent('assign', { 
        path,
        detail: {
          sources: assignedSources
        },
      }, $content)
    )
  }
  return $content
}