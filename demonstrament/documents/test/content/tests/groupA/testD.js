import { Content } from '/dependencies/mvc-framework.js'
import * as ContentAssignments from './coutil/contentAssignments.js'
const {
  contentAssignmentsA, contentAssignmentsB, 
  contentAssignmentsC, contentAssignmentsD,
  contentAssignmentsE, contentAssignmentsF,
} = ContentAssignments
export default {
  id: "testD", name: `Simplex Objects - Content Events`,
  type: "test-result", collectName: 'detail',
  descript: `
    <ul>
      <li><code>content.schema</code>: <code>null</code></li>
      <li><code>content.contentEvents</code>: <code>true</code></li>
      <ul>
        <li><code>"assignSourceProperty:$key"</code></li>
        <li><code>"assignSourceProperty"</code></li>
        <li><code>"assignSource"</code></li>
        <li><code>"assign"</code></li>
      </ul>
    </ul>
  `, 
  collect: new Map([
    [0, `
      <p>There is no schema - any assigned property may emit an event.</p>
    `],
  ]),
  method: async function() {
    // Quest
    const quest = [
      ["contentA", []],
      ["contentB", []],
      ["contentC", []],
      ["contentD", []],
      ["contentE", []],
      ["contentF", []],
    ]
    // Solve
    const solve = [
      ["contentA", [true, true, true, true, true]],
      ["contentB", [true, true, true, true, true]],
      ["contentC", [true, true, true, true, true]],
      ["contentD", [true, true, true, true, true]],
      ["contentE", [true, true, true, true, true]],
      ["contentF", [true, true, true, true, true]],
    ]
    // Validations
    const validations = [
      ["contentA", []],
      ["contentB", []],
      ["contentC", []],
      ["contentD", []],
      ["contentE", []],
      ["contentF", []],
    ]
    const contents = []
    const contentAssignments = Object.entries(ContentAssignments)
    let solveIndex = 0
    iterateSolve: 
    for(const [$solveName, $solve] of solve) {
      const [$questName, $quest] = quest[solveIndex]
      const [$validationName, $validation] = validations[solveIndex]
      const [$contentAssignmentName, $contentAssignment] = contentAssignments[solveIndex]
      contents[solveIndex] = [$solveName, new Content({}, null)]
      const [$contentName, $content] = contents[solveIndex]
      const assignedObjectName = $contentName
      const assignedObject = Object.assign({}, ...$contentAssignment)
      iterateContentProperties: 
      for(const [$propertyKeyIndex, $propertyKey] of Object.entries([
        'propertyA', 'propertyB', 'propertyC', 'propertyD', 'propertyE'
      ])) {
        const { promise, resolve, reject} = Promise.withResolvers()
        $quest[$propertyKeyIndex] = promise
        function assignSourceProperty($event) {
          const { type, path, key, value, detail } = $event
          const { source } = detail
          const detailSourceString = JSON.stringify(source)
          const contentAssignmentSource = $contentAssignment.find(($source) => Object.keys(
            Object.getOwnPropertyDescriptors($source)
          ).includes($propertyKey))
          const contentAssignmentSourceString = JSON.stringify(contentAssignmentSource)
          const verifications = new Map([
            ["type", {
              statement: `${type} === "assignSourceProperty:${$propertyKey}"`,
              pass: (type === `assignSourceProperty:${$propertyKey}`),
            }],
            ["path", {
              statement: `${path} === ${$propertyKey}`,
              pass: (path === $propertyKey),
            }],
            ["value", {
              statement: `${value} === ${assignedObject[$propertyKey]}`,
              pass: (value === assignedObject[$propertyKey]),
            }],
            ["source", {
              statement: `${detailSourceString} === ${contentAssignmentSourceString}`,
              pass: (detailSourceString === contentAssignmentSourceString),
            }]
          ])
          const assignSourcePropertyEventValidation = {
            verifications: Object.fromEntries(verifications),
            valid: (!verifications.values().find(
              ($verification) => $verification.pass === false
            )),
          }
          $validation[$propertyKeyIndex] = assignSourcePropertyEventValidation
          resolve(assignSourcePropertyEventValidation.valid)
          $content.removeEventListener(`assignSourceProperty:${$propertyKey}`, assignSourceProperty)
        }
        $content.addEventListener(`assignSourceProperty:${$propertyKey}`, assignSourceProperty)
      }
      $content.assign(...$contentAssignment)
      $quest.splice(0, 5, ...await Promise.all($quest))
      solveIndex++
    }
    let pass = (JSON.stringify(quest) === JSON.stringify(solve))
    this.pass = pass
    this.detail = {
      method: this.method.toString(),
      quest,
      solve,
      validations,
      ContentAssignments,
    }
    return this
  },
}