import { Schema, Content, Coutil } from '/dependencies/mvc-framework.js'
import simplexObjectSchemaProperties from './coutil/simplexObjectSchemaProperties.js'
import {
  contentAssignmentsA, contentAssignmentsB, 
  contentAssignmentsC, contentAssignmentsD
} from './coutil/contentAssignments.js'
const { expandTree } = Coutil
export default {
  id: "testC", name: `Simplex Objects - Valid Schema Properties Required`,
  type: "test-result", collectName: 'detail',
  descript: `
    <ul>
      <li><code>schema.required</code>: <code>true</code></li>
    </ul>
  `, 
  collect: new Map([
    [0, ``],
  ]),
  method: function() {
    const solve = []
    const quest = []
    const validations = []
    const schema = new Schema(simplexObjectSchemaProperties, { required: true} )
    const contentA = new Content({}, null)
    contentA.assign(...contentAssignmentsA)
    const contentB = new Content({}, null)
    contentB.assign(...contentAssignmentsB)
    const contentC = new Content({}, null)
    contentC.assign(...contentAssignmentsC)
    const contentD = new Content({}, null)
    contentD.assign(...contentAssignmentsD)
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