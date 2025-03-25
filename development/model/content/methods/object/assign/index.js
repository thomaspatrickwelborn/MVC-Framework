import { recursiveAssign, typedObjectLiteral } from '../../../../../coutil/index.js'
import Content from '../../../index.js'
import Change from '../../../change/index.js'
import { ContentEvent, ValidatorEvent } from '../../../events/index.js'
export default function assign($content, $options, ...$sources) {
  const { path, target, schema } = $content
  const { events, sourceTree, enableValidation, validationEvents } = $options
  const changes = {
    assignChange: new Change({ preter: $content }),
    assignSourceChange: new Change({ preter: $content }),
    assignSourcePropertyChange: new Change(),
    assignSourcePropertyKeyChange: new Change(),
  }
  const assignedSources = []
  // Iterate Sources
  iterateAssignSources: 
  for(let $assignSource of $sources) {
    let assignedSource
    if(Array.isArray($assignSource)) { assignedSource = [] }
    else if(typeof $assignSource === 'object') { assignedSource = {} }
    // Iterate Source Props
    iterateSourceProps:
    for(let [$sourceKey, $sourceValue] of Object.entries($assignSource)) {
      changes.assignSourcePropertyChange.preter = target[$sourceKey]
      changes.assignSourcePropertyKeyChange.preter = target[$sourceKey]
      // Validation
      if(schema && enableValidation) {
        const validSourceProp = schema.validateProperty(
          $sourceKey, $sourceValue, $assignSource, $content
        )
        if(validationEvents) {
          let type, propertyType
          const validatorEventPath = (path) ? [path, $sourceKey].join('.') : String($sourceKey)
          if(validSourceProp.valid) {
            type = 'validProperty'
            propertyType = ['validProperty', $sourceKey].join(':')
          }
          else {
            type = 'nonvalidProperty'
            propertyType = ['nonvalidProperty', $sourceKey].join(':')
          }
          for(const $eventType of [type, propertyType]) {
            $content.dispatchEvent(new ValidatorEvent($eventType, validSourceProp, $content))
          }
        }
        if(!validSourceProp.valid) { continue iterateSourceProps }
      }
      // Source Prop: Object Type
      if($sourceValue && typeof $sourceValue === 'object') {
        if($sourceValue instanceof Content) {
          $sourceValue = $sourceValue.valueOf()
        }
        // Subschema
        let subschema
        if(schema?.type === 'array') { subschema = schema.context[0] }
        else if(schema?.type === 'object') { subschema = schema.context[$sourceKey] }
        else { subschema = null }
        // Content
        const contentPath = (path)
          ? [path, $sourceKey].join('.')
          : String($sourceKey)
        let contentTypedLiteral = typedObjectLiteral($sourceValue)
        // Assignment
        let assignment
        let sourceValue
        // Source Tree: False
        if(sourceTree === false) {
          sourceValue = new Content(contentTypedLiteral, subschema, 
            recursiveAssign({}, $content.options, {
              path: contentPath,
              parent: $content,
            })
          )
          sourceValue.assign($sourceValue)
          assignment = { [$sourceKey]: sourceValue }
        }
        // Source Tree: true
        else {
          // Assignment: Existing Content Instance
          if(target[$sourceKey] instanceof Content) {
            target[$sourceKey].assign($sourceValue)
          }
          // Assignment: New Content Instance
          else {
            sourceValue = new Content(contentTypedLiteral, subschema, 
              recursiveAssign({}, $content.options, {
                path: contentPath,
                parent: $content,
              })
            )
            sourceValue.assign($sourceValue)
          }
          assignment = { [$sourceKey]: sourceValue }
        }
        // Assignment
        Object.assign(target, assignment)
        Object.assign(assignedSource, assignment)
      }
      // Source Prop: Primitive Type
      else {
        let assignment = { [$sourceKey]: $sourceValue }
        // Assign Root
        Object.assign(target, assignment)
        // Assigned Source
        Object.assign(assignedSource, assignment)
      }
      // Content Event: Assign Source Property
      if(events) {
        const contentEventPath = (path) ? [path, $sourceKey].join('.') : String($sourceKey)
        if(events['assignSourceProperty:$key']) {
          changes.assignSourcePropertyKeyChange.anter = target[$sourceKey]
          const type = ['assignSourceProperty', $sourceKey].join(':')
          $content.dispatchEvent(
            new ContentEvent(type, {
              path: contentEventPath,
              value: $sourceValue,
              change: changes.assignSourcePropertyKeyChange,
              detail: {
                key: $sourceKey,
                value: $sourceValue,
                source: $assignSource,
              }
            }, $content)
          )
        }
        if(events['assignSourceProperty']) {
          changes.assignSourcePropertyChange.anter = $sourceValue
          $content.dispatchEvent(
            new ContentEvent('assignSourceProperty', {
              path: contentEventPath,
              value: $sourceValue,
              change: changes.assignSourcePropertyChange,
              detail: {
                key: $sourceKey,
                value: $sourceValue,
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
          change: changes.assignSourceChange,
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
        change: changes.assignChange,
        detail: {
          sources: assignedSources
        },
      }, $content)
    )
  }
  return $content
}