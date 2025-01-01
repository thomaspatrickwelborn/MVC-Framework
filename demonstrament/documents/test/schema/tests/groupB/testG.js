import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: 'testG',
  name: `
    <div style="display: flex; flex-direction: column;">
      <div><code>$schema.context[0].type.value</code>: <code>[undefined|null|Number|String|Boolean]</code></div>
      <div><code>$schema.required</code>: <code>false</code></div>
    </div>
  `,
  type: 'test-result',
  collectName: 'detail',
  collect: new Map([
    [0, `
      <div>
        When <code>Schema.type</code> is <code>array</code> and <code>Schema.required</code> is <code>false</code>
        added array elements must pass <code>type</code> verification.
      </div>
    `]
  ]),
  method: function() {
    // Schemata
    const schemaA = new Schema([{ type: undefined }], { required: false })
    const schemaB = new Schema([{ type: null }], { required: false })
    const schemaC = new Schema([{ type: Number }], { required: false })
    const schemaD = new Schema([{ type: String }], { required: false })
    const schemaE = new Schema([{ type: Boolean }], { required: false })
    // Contents
    const contentA = [undefined, null, 333, "DDD", true]
    const contentB = [null, null, null, null, null]
    const contentC = [111, 222, 333, 444, 555]
    const contentD = ["AAA", "BBB", "CCC", "DDD", "EEE"]
    const contentE = [true, false, true, false, true]
    // Solve
    const solve = [
      // schemaA: 
      [
        true, // contentA
        true, // contentB
        true, // contentC
        true, // contentD
        true, // contentE
      ], 
      // schemaB: 
      [
        true, // contentA
        true, // contentB
        false, // contentC
        false, // contentD
        false, // contentE
      ], 
      // schemaC: 
      [
        true, // contentA
        false, // contentB
        true, // contentC
        false, // contentD
        false, // contentE
      ], 
      // schemaD: 
      [
        true, // contentA
        false, // contentB
        false, // contentC
        true, // contentD
        false, // contentE
      ], 
      // schemaE: 
      [
        true, // contentA
        false, // contentB
        false, // contentC
        false, // contentD
        true, // contentE
      ], 
    ]
    const quest = []
    const schemata = [
      ['schemaA', schemaA],
      ['schemaB', schemaB],
      ['schemaC', schemaC],
      ['schemaD', schemaD],
      ['schemaE', schemaE],
    ]
    const contents = [
      ['contentA', contentA], 
      ['contentB', contentB],
      ['contentC', contentC],
      ['contentD', contentD],
      ['contentE', contentE],
    ]
    const validations = []
    for(const [$schemaName, $schema] of schemata) {
      const subvalidations = []
      const subquest = []
      for(const [$contentName, $content] of contents) {
        const contentValidation = $schema.validate($content)
        subvalidations.push(contentValidation)
        subquest.push(contentValidation.valid)
      }
      validations.push(subvalidations)
      quest.push(subquest)
    }
    this.pass = (JSON.stringify(quest) === JSON.stringify(solve))
    this.detail = {
      method: this.method.toString(),
      schemata,
      contents,
      quest,
      solve,
      validations,
    }
    return this
  },
}