import { Schema, Content, Coutil } from '/dependencies/mvc-framework.js'
import simplexObjectSchemaProperties from './coutil/simplexObjectSchemaProperties.js'
import * as ContentAssignments from './coutil/contentAssignments.js'
const {
  contentAssignmentsA, contentAssignmentsB, 
  contentAssignmentsC, contentAssignmentsD
} = ContentAssignments
const { expandTree } = Coutil
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
    [0, ``],
  ]),
  method: async function() {
    const quest = [
      ["contentA", []]
    ]
    const questContentA = quest[0][1]
    const solve = [
      ["contentA", [true, true, true, true, true]]
    ]
    const solveContentA = solve[0][1]
    const validations = [
      ["contentA", []]
    ]
    const validationContentA = validations[0][1]
    const contentA = new Content({}, null)
    for(const [$propertyKeyIndex, $propertyKey] of Object.entries([
      'propertyA', 'propertyB', 'propertyC', 'propertyD', 'propertyE'
    ])) {
      const { promise, resolve, reject} = Promise.withResolvers()
      questContentA[$propertyKeyIndex] = promise
      function assignSourceProperty($event) {
        const { type, path, value, detail } = $event
        const { source } = detail
        const detailSourceString = JSON.stringify(source)
        const contentSourceString = JSON.stringify(contentAssignmentsA[$propertyKeyIndex])
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
            statement: `${value} === ${contentAssignmentsA[$propertyKeyIndex][$propertyKey]}`,
            pass: (value === contentAssignmentsA[$propertyKeyIndex][$propertyKey]),
          }],
          ["source", {
            statement: `${detailSourceString} === ${contentSourceString}`,
            pass: (detailSourceString === contentSourceString),
          }]
        ])
        const assignSourcePropertyEventValidation = {
          verifications: Object.fromEntries(verifications),
          valid: (!verifications.values().find(
            ($verification) => $verification.pass === false
          )) ? true : false,
        }
        validationContentA[$propertyKeyIndex] = assignSourcePropertyEventValidation
        resolve(assignSourcePropertyEventValidation.valid)
        contentA.removeEventListener(`assignSourceProperty:${$propertyKey}`, assignSourceProperty)
      }
      contentA.addEventListener(`assignSourceProperty:${$propertyKey}`, assignSourceProperty)
    }
    contentA.assign(...contentAssignmentsA)
    questContentA.splice(0, 5, ...await Promise.all(questContentA))
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