import { Schema, Content, Coutil } from '/dependencies/mvc-framework.js'
import simplexObjectSchemaProperties from './coutil/simplexObjectSchemaProperties.js'
import * as ContentAssignments from './coutil/contentAssignments.js'
import {
  contentAssignmentsA, contentAssignmentsB, 
  contentAssignmentsC, contentAssignmentsD,
  contentAssignmentsE, contentAssignmentsF,
} from './coutil/contentAssignments.js'
const { expandTree } = Coutil
export default {
  id: "testB", name: `Simplex Objects - Valid Schema Properties Not Required`,
  type: "test-result", collectName: 'detail',
  descript: `
    <ul>
      <li><code>schema.required</code>: <code>false</code></li>
    </ul>
  `, 
  collect: new Map([
    [0, `
      <p>
        When <code>schema.required</code> is <code>false</code> and <code>schema.validate</code> or 
        <code>schema.validateProperty</code> are invoked then any valid property may be set.  
      </p>
    `],
  ]),
  method: function() {
    const solve = [
      ['validationA', true],
      ['validationB', true],
      ['validationC', true],
      ['validationD', true],
      ['validationE', true],
      ['validationF', true],
    ]
    const quest = []
    const validations = []
    const schema = new Schema(simplexObjectSchemaProperties, { required: false } )
    // A
    const contentA = new Content({}, schema)
    contentA.assign(...contentAssignmentsA)
    const objectA = {
      propertyA: true,
      propertyB: 1,
      propertyC: "true",
      propertyD: null,
      propertyE: false,
    }
    const validationA = {
      content: ['contentA', contentA],
      contentString: contentA.string,
      object: ['objectA', objectA],
      objectString: JSON.stringify(objectA),
      statement: `${contentA.string} === ${JSON.stringify(objectA)}`,
      pass: (contentA.string === JSON.stringify(objectA)),
    }
    validations.push(['validationA', validationA])
    // B
    const contentB = new Content({}, schema)
    contentB.assign(...contentAssignmentsB)
    const objectB = {
      propertyA: false,
      propertyB: 0,
      propertyC: "false",
      propertyD: null,
      propertyE: true,
    }
    const validationB = {
      content: ['contentB', contentB],
      contentString: contentB.string,
      object: ['objectB', objectB],
      objectString: JSON.stringify(objectB),
      statement: `${contentB.string} === ${JSON.stringify(objectB)}`,
      pass: (contentB.string === JSON.stringify(objectB)),
    }
    validations.push(['validationB', validationB])

    // C
    const contentC = new Content({}, schema)
    contentC.assign(...contentAssignmentsC)
    const objectC = {}
    const validationC = {
      content: ['contentC', contentC],
      contentString: contentC.string,
      object: ['objectC', objectC],
      objectString: JSON.stringify(objectC),
      statement: `${contentC.string} === ${JSON.stringify(objectC)}`,
      pass: (contentC.string === JSON.stringify(objectC)),
    }
    validations.push(['validationC', validationC])

    // D
    const contentD = new Content({}, schema)
    contentD.assign(...contentAssignmentsD)
    const objectD = {}
    const validationD = {
      content: ['contentD', contentD],
      contentString: contentD.string,
      object: ['objectD', objectD],
      objectString: JSON.stringify(objectD),
      statement: `${contentD.string} === ${JSON.stringify(objectD)}`,
      pass: (contentD.string === JSON.stringify(objectD)),
    }
    validations.push(['validationD', validationD])

    // E
    const contentE = new Content({}, schema)
    contentE.assign(...contentAssignmentsE)
    const objectE = {
      propertyA: true,
      propertyC: "true",
      propertyE: false,
    }
    const validationE = {
      content: ['contentE', contentE],
      contentString: contentE.string,
      object: ['objectE', objectE],
      objectString: JSON.stringify(objectE),
      statement: `${contentE.string} === ${JSON.stringify(objectE)}`,
      pass: (contentE.string === JSON.stringify(objectE)),
    }
    validations.push(['validationE', validationE])
    
    // F
    const contentF = new Content({}, schema)
    contentF.assign(...contentAssignmentsF)
    const objectF = {
      propertyA: false,
      propertyC: "false",
      propertyE: true,
    }
    const validationF = {
      content: ['contentF', contentF],
      contentString: contentF.string,
      object: ['objectF', objectF],
      objectString: JSON.stringify(objectF),
      statement: `${contentF.string} === ${JSON.stringify(objectF)}`,
      pass: (contentF.string === JSON.stringify(objectF)),
    }
    validations.push(['validationF', validationF])

    for(const [$validationName, $validation] of validations) {
      quest.push([$validationName, $validation.pass])
    }
    this.pass = (JSON.stringify(quest) === JSON.stringify(solve))
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