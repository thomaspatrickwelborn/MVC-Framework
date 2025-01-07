import { Schema, Content, Coutil } from '/dependencies/mvc-framework.js'
import simplexObjectSchemaProperties from './coutil/simplexObjectSchemaProperties.js'
import {
  contentAssignmentsA, contentAssignmentsB, 
  contentAssignmentsC, contentAssignmentsD,
  contentAssignmentsE, contentAssignmentsF,
} from './coutil/contentAssignments.js'
const { expandTree } = Coutil
export default {
  id: "testF", name: `Simplex Objects - Validator Events`,
  type: "test-result", collectName: 'detail',
  descript: `
    <ul>
      <li><code>schema.required</code>: <code>false</code></li>
      <li><code>content.validationEvents</code>: <code>true</code></li>
      <ul>
        <li><code>"validProperty"</code></li>
        <li><code>"nonvalidProperty"</code></li>
      </ul>
    </ul>
  `, 
  collect: new Map([
    [0, ``],
  ]),
  method: function() {
    const solve = []
    const quest = []
    const validations = []
    const schema = new Schema(simplexObjectSchemaProperties, { required: false } )
    const contentA = new Content({}, schema)
    contentA.assign(...contentAssignmentsA)
    const contentB = new Content({}, schema)
    contentB.assign(...contentAssignmentsB)
    const contentC = new Content({}, schema)
    contentC.assign(...contentAssignmentsC)
    const contentD = new Content({}, schema)
    contentD.assign(...contentAssignmentsD)
    const contentE = new Content({}, schema)
    contentE.assign(...contentAssignmentsE)
    const contentF = new Content({}, schema)
    contentF.assign(...contentAssignmentsF)
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