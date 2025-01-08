import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: "testC",
  name: `
    <div style="display: flex; flex-direction: column;">
      <div><code>$schema.context[$property].required</code>: <code>[true|false]</code></div>
      <div><code>$schema.required</code>: <code>false</code></div>
    </div>
  `,
  descript: ``, 
  type: 'test-result',
  collectName: 'detail',
  collect: new Map([
    [0, `<div>When Schema context property definitions are not <code>required</code> no valid complementary content property values must be present on target or source object to pass.</div>`],
    [1, `<div>When Schema required option is <code>false</code> no complementary content property values must validate on target or source to pass.</div>`],
  ]),
  method: function() {
    // 3 Required Properties (A, C, E)
    // 2 Nonrequired Properties (B, D)
    const schema = new Schema({
      propertyA: { required: true, type: String },
      propertyB: { required: false, type: Boolean },
      propertyC: { required: true, type: Number },
      propertyD: { required: false, type: null },
      propertyE: { required: true, type: undefined },
    }, { required: false })
    const contentA = { // 0
      propertyA: "11111",
      propertyB: false,
      propertyC: 33333,
      propertyD: null,
      propertyE: "55555",
    } // true
    const contentB = { // 1
      propertyB: false,
      propertyC: 33333,
      propertyD: null,
      propertyE: "55555",
    } // false
    const contentC = { // 2
      propertyA: "11111",
      propertyB: false,
      propertyD: null,
      propertyE: "55555",
    } // false
    const contentD = { // 3
      propertyA: "11111",
      propertyB: false,
      propertyC: 33333,
      propertyD: null,
    } // false
    const contentE = { // 4
      propertyB: false,
      propertyD: null,
      propertyE: "55555",
    } // false
    const contentF = { // 5
      propertyB: false,
      propertyC: 33333,
      propertyD: null,
    } // false
    const contentG = { // 6
      propertyA: "11111",
      propertyB: false,
      propertyD: null,
    } // false
    const contentH = { // 7
      propertyB: false,
      propertyD: null,
    } // false
    const contentI = { // 8
      propertyA: "11111",
      propertyC: 33333,
      propertyD: null,
      propertyE: "55555",
    } // true
    const contentJ = { // 9
      propertyA: "11111",
      propertyB: false,
      propertyC: 33333,
      propertyE: "55555",
    } // true
    const contentK = { // 10
      propertyA: "11111",
      propertyC: 33333,
      propertyE: "55555",
    } // true
    const solve = [
      true, // A 0
      false, // B 1
      false, // C 2
      false, // D 3
      false, // E 4
      false, // F 5
      false, // G 6
      false, // H 7
      true, // I 8
      true, // J 9
      true, // K 10
    ]
    const quest = []
    const contents = [
      ['contentA', contentA], // A 0
      ['contentB', contentB], // B 1
      ['contentC', contentC], // C 2
      ['contentD', contentD], // D 3
      ['contentE', contentE], // E 4
      ['contentF', contentF], // F 5
      ['contentG', contentG], // G 6
      ['contentH', contentH], // H 7
      ['contentI', contentI], // I 8
      ['contentJ', contentJ], // J 9
      ['contentK', contentK], // K 10
    ]
    const validations = []
    for(const [$contentName, $content] of contents) {
      const contentValidation = schema.validate($content)
      validations.push(contentValidation)
      quest.push(contentValidation.valid)
    }
    this.pass = (JSON.stringify(quest) === JSON.stringify(solve))
    this.detail = {
      method: this.method.toString(),
      schema,
      contents,
      quest,
      solve,
      validations,
    }
    return this
  },
}