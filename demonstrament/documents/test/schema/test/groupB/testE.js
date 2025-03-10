import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: "testE",
  name: `
    <div style="display: flex; flex-direction: column;">
      <div><code>$schema.context[$property].required</code>: <code>false</code></div>
      <div><code>$schema.required</code>: <code>true</code></div>
    </div>
  `,
  descript: ``, 
  type: 'test-result',
  collectName: 'detail',
  collect: new Map([
    [0, `<div>When Schema context property definitions are not <code>required</code> no valid complementary content property values must be present on target or source object to pass.</div>`],
    [1, `<div>When Schema <code>required</code> option is <code>true</code> all complementary content property values must validate on target or source to pass.</div>`],
  ]),
  method: function() {
    // 0 Required Properties
    // 5 Nonrequired Properties
    const schema = new Schema({
      propertyA: {
        required: false,
        type: String,
      },
      propertyB: {
        required: false,
        type: Boolean,
      },
      propertyC: {
        required: false,
        type: Number,
      },
      propertyD: {
        required: false,
        type: null,
      },
      propertyE: {
        required: false,
        type: undefined,
      },
    }, {
      required: true
    })
    // 5 Nonrequired Properties Valid (A, B, C, D, E)
    const contentA = {
      propertyA: "11111",
      propertyB: false,
      propertyC: 33333,
      propertyD: null,
      propertyE: "55555",
    } // true
    // 4 Nonrequired Properties Valid (B, C, D, E)
    const contentB = {
      propertyB: false,
      propertyC: 33333,
      propertyD: null,
      propertyE: "55555",
    } // false
    // 2 Nonrequired Properties Nonvalid (A, B)
    // 3 Nonrequired Properties Valid (C, D, E)
    const contentC = {
      propertyA: 11111,
      propertyB: "false",
      propertyC: 33333,
      propertyD: null,
      propertyE: "55555",
    } // false
    const solve = [
      true,
      false,
      false,
    ]
    const quest = []
    const contents = [
      ['contentA', contentA],
      ['contentB', contentB],
      ['contentC', contentC]
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