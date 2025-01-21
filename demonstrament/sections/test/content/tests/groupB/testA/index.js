import { Schema, Content, Coutil } from '/dependencies/mvc-framework.js'
import * as AssignmentKeys from '../coutil/assignmentKeys.js'
import * as Assignments from '../coutil/assignments/index.js'
import * as Assigned from './assigned/index.js'
import SchemaProperties from '../coutil/schemaProperties.js'
const ContentOptions = {
  traps: { object: { assign: {
    sourceTree: true,
  } } },
}
export default {
  id: "testA", name: `Complex Objects - No Schema, With Source Tree`,
  type: "test-result", collectName: 'detail',
  descript: `
    <ul>
      <li><code>content.schema</code>: <code>null</code></li>
      <li><code>content.options</code></li>
      <ul>
        <li><code>sourceTree</code>: true</li>
      </ul>
    </ul>
  `, 
  collect: new Map([[0, ``]]),
  method: async function() {
    const solve = [
      ["assignmentsA", [
        ["assignmentSourcesA", [true, true]],
        ["assignmentSourcesB", [true, true]],
        ["assignmentSourcesC", [true, true]],
        ["assignmentSourcesD", [true, true]],
        ["assignmentSourcesE", [true, true]],
        ["assignmentSourcesF", [true, true]],
      ]],
      ["assignmentsB", [
        ["assignmentSourcesA", [true, true]],
        ["assignmentSourcesB", [true, true]],
        ["assignmentSourcesC", [true, true]],
        ["assignmentSourcesD", [true, true]],
        ["assignmentSourcesE", [true, true]],
        ["assignmentSourcesF", [true, true]],
      ]],
    ]
    const quest = []
    const validations = []
    const targets = []
    iterateAssignments: 
    for(const [$assignmentIndex, $assignmentName] of Object.entries(AssignmentKeys.Assignments)) {
      quest[$assignmentIndex] = quest[$assignmentIndex] = [$assignmentName, []]
      validations[$assignmentIndex] = validations[$assignmentIndex] = [$assignmentName, []]
      // targets[$assignmentIndex] = targets[$assignmentIndex] = [$assignmentName, []]

      // assignments[$assignmentIndex] = assignments[$assignmentIndex] = [$assignmentName, []]
      iterateAssignmentSources: 
      for(const [$sourceIndex, $sourceName] of Object.entries(AssignmentKeys.AssignmentSources)) {
        quest[$assignmentIndex][1][$sourceIndex] = quest[$assignmentIndex][1][$sourceIndex] || [$sourceName, []]
        validations[$assignmentIndex][1][$sourceIndex] = validations[$assignmentIndex][1][$sourceIndex] || [$sourceName, []]
        // targets[$assignmentIndex][1][$sourceIndex] = targets[$assignmentIndex][1][$sourceIndex] || [$sourceName, []]
        targets[$sourceName] = targets[$sourceName] || {
          content: undefined,
          object: undefined,
        }
        // assignments[$assignmentIndex][1][$sourceIndex] = assignments[$assignmentIndex][1][$sourceIndex] || [$sourceName, []]
        const [$questName, $quest] = quest[$assignmentIndex][1][$sourceIndex]
        const [$validationName, $validation] = validations[$assignmentIndex][1][$sourceIndex]
        const assignmentSources = Assignments[$assignmentName][$sourceName]
        const $assigned = Assigned[$assignmentName][$sourceName]
        const assignedContent = $assigned.content
        const assignedObject = $assigned.object
        const target = targets[$sourceName]
        target.content = target.content || new Content({}, null, ContentOptions)
        target.object = target.object || new Object()
        const targetContent = target.content
        const targetObject = target.object
        // -----
        targetContent.assign(...assignmentSources)
        Object.assign(targetObject, ...assignmentSources)
        // -----
        const targetContentString = targetContent.string
        const targetObjectString = JSON.stringify(targetObject)
        const assignedContentString = JSON.stringify(assignedContent)
        const assignedObjectString = JSON.stringify(assignedObject)
        const targetContentValidation = {
          assignmentName: $assignmentName,
          sourceName: $sourceName,
          code: `(targetContentString === assignedContentString)`,
          statement: `(${targetContentString} === ${assignedContentString})`,
          evaluation: (targetContentString === assignedContentString),
        }
        const targetObjectValidation = {
          assignmentName: $assignmentName,
          sourceName: $sourceName,
          code: `(targetObjectString === assignedObjectString)`,
          statement: `(${targetObjectString} === ${assignedObjectString})`,
          evaluation: (targetObjectString === assignedObjectString),
        }
        $validation.push(targetContentValidation, targetObjectValidation)
        $quest.push(targetContentValidation.evaluation, targetObjectValidation.evaluation)
      }
    }
    this.pass = (JSON.stringify(quest) === JSON.stringify(solve))
    // this.pass = (!false)
    this.detail = {
      method: this.method.toString(),
      quest,
      solve,
      validations,
    }
    return this
  },
}