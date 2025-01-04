import { Content, Coutil } from '/dependencies/mvc-framework.js'
import * as ContentAssignments from './coutil/contentAssignments.js'
const {
  contentAssignmentsA, contentAssignmentsB, 
  contentAssignmentsC, contentAssignmentsD
} = ContentAssignments
const { expandTree } = Coutil
export default {
  id: "testA", name: `Simplex Objects - No Schema`,
  type: "test-result", collectName: 'detail',
  descript: `
    <ul>
      <li><code>content.type</code>: <code>"object"</code></li>
      <li><code>content.schema</code>: <code>null</code></li>
    </ul>
  `, 
  collect: new Map([
    [0, `
      <p>
        When schema is <code>null</code> any source properties may be assigned to content instances using 
        <code>content.assign</code> and are same as complementary plain <code>object</code> when comparing 
        their stringified JSON. 
      </p>
    `],
  ]),
  method: function() {
    const solve = [
      ['validationA', true],
      ['validationB', true],
      ['validationC', true],
      ['validationD', true],
    ]
    const quest = []
    const validations = []
    // A
    const contentA = new Content({}, null)
    const objectA = {}
    contentA.assign(...contentAssignmentsA)
    Object.assign(objectA, ...contentAssignmentsA)
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
    const contentB = new Content({}, null)
    const objectB = {}
    contentB.assign(...contentAssignmentsB)
    Object.assign(objectB, ...contentAssignmentsB)
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
    const contentC = new Content({}, null)
    const objectC = {}
    contentC.assign(...contentAssignmentsC)
    Object.assign(objectC, ...contentAssignmentsC)
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
    const contentD = new Content({}, null)
    const objectD = {}
    contentD.assign(...contentAssignmentsD)
    Object.assign(objectD, ...contentAssignmentsD)
    const validationD = {
      content: ['contentD', contentD],
      contentString: contentD.string,
      object: ['objectD', objectD],
      objectString: JSON.stringify(objectD),
      statement: `${contentD.string} === ${JSON.stringify(objectD)}`,
      pass: (contentD.string === JSON.stringify(objectD)),
    }
    validations.push(['validationD', validationD])
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