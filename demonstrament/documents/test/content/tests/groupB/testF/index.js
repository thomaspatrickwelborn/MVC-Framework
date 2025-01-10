import { Schema, Content, Coutil } from '/dependencies/mvc-framework.js'
import * as AssignmentKeys from '../coutil/assignmentKeys.js'
import * as Assignments from '../coutil/assignments/index.js'
import * as Assigned from './assigned/index.js'
import SchemaProperties from '../coutil/schemaProperties.js'
const SchemaOptions = {
  required: true
}
const ContentOptions = {
  traps: { object: { assign: {
    sourceTree: false,
  } } },
}
export default {
  id: "testF", name: `Complex Objects - With Schema (Required), No Source Tree`,
  type: "test-result", collectName: 'detail',
  descript: `
    <ul>
      <li><code>content.schema</code></li>
      <ul>
        <li><code>required</code>: <code>true</code></li>
      </ul>
      <li><code>content.options</code></li>
      <ul>
        <li><code>sourceTree</code>: <code>false</code></li>
      </ul>
    </ul>
  `, 
  collect: new Map([[0, ``]]),
  method: async function() {
    const schema = new Schema(SchemaProperties, SchemaOptions)
    const solve = [
      ["assignmentsA", [
        ["assignmentSourcesA", [true]],
        ["assignmentSourcesB", [true]],
        ["assignmentSourcesC", [true]],
        ["assignmentSourcesD", [true]],
        ["assignmentSourcesE", [true]],
        ["assignmentSourcesF", [true]],
      ]],
      ["assignmentsB", [
        ["assignmentSourcesA", [true]],
        ["assignmentSourcesB", [true]],
        ["assignmentSourcesC", [true]],
        ["assignmentSourcesD", [true]],
        ["assignmentSourcesE", [true]],
        ["assignmentSourcesF", [true]],
      ]],
    ]
    const quest = []
    const validations = []
    const targets = []
    iterateAssignments: 
    for(const [$assignmentIndex, $assignmentName] of Object.entries(AssignmentKeys.Assignments)) {
      quest[$assignmentIndex] = quest[$assignmentIndex] = [$assignmentName, []]
      validations[$assignmentIndex] = validations[$assignmentIndex] = [$assignmentName, []]
      iterateAssignmentSources: 
      for(const [$sourceIndex, $sourceName] of Object.entries(AssignmentKeys.AssignmentSources)) {
        quest[$assignmentIndex][1][$sourceIndex] = quest[$assignmentIndex][1][$sourceIndex] || [$sourceName, []]
        validations[$assignmentIndex][1][$sourceIndex] = validations[$assignmentIndex][1][$sourceIndex] || [$sourceName, []]
        // targets[$assignmentIndex][1][$sourceIndex] = targets[$assignmentIndex][1][$sourceIndex] || [$sourceName, []]
        targets[$sourceName] = targets[$sourceName] || {
          content: undefined,
          object: undefined,
        }
        const [$questName, $quest] = quest[$assignmentIndex][1][$sourceIndex]
        const [$validationName, $validation] = validations[$assignmentIndex][1][$sourceIndex]
        const assignmentSources = Assignments[$assignmentName][$sourceName]
        const $assigned = Assigned[$assignmentName][$sourceName]
        const assignedContent = $assigned.content
        const target = targets[$sourceName]
        target.content = target.content || new Content({}, schema, ContentOptions)
        const targetContent = target.content
        // -----
        targetContent.assign(...assignmentSources)
        // -----
        const targetContentString = targetContent.string
        const assignedContentString = JSON.stringify(assignedContent)
        const targetContentValidation = {
          assignmentName: $assignmentName,
          sourceName: $sourceName,
          code: `(targetContentString === assignedContentString)`,
          statement: `(${targetContentString} === ${assignedContentString})`,
          evaluation: (targetContentString === assignedContentString),
        }
        $validation.push(targetContentValidation)
        $quest.push(targetContentValidation.evaluation)
      }
    }
    this.pass = (JSON.stringify(quest) === JSON.stringify(solve))
    this.detail = {
      method: this.method.toString(),
      quest,
      solve,
      validations,
    }
    return this
  },
}