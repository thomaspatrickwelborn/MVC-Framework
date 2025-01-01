import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: 'testH',
  name: `
    <div style="display: flex; flex-direction: column;">
      <div><code>$schema.context[0].type.value</code>: <code>[undefined|null|Number|String|Boolean]</code></div>
      <div><code>$schema.required</code>: <code>true</code></div>
    </div>
  `,
  type: 'test-result',
  collectName: 'detail',
  collect: new Map([
    [0, `
      <div>
        When <code>Schema.type</code> is <code>array</code> and <code>Schema.required</code> is <code>true</code> 
        all added array elements must pass <code>type</code> verification.
      </div>
      `]
  ]),
  method: function() {
    // Schemata
    const schemaA = new Schema([{ type: undefined }], { required: true })
    const schemaB = new Schema([{ type: null }], { required: true })
    const schemaC = new Schema([{ type: Number }], { required: true })
    const schemaD = new Schema([{ type: String }], { required: true })
    const schemaE = new Schema([{ type: Boolean }], { required: true })
    // Contents
    const contentA = [undefined, null, 333, "DDD", true]
    const contentB = [null, null, null, null, null]
    const contentC = [111, 222, 333, 444, 555]
    const contentD = ["AAA", "BBB", "CCC", "DDD", "EEE"]
    const contentE = [true, false, true, false, true]
    // Solve
    const solve = [
      // [contentA, contentB, contentC, contentD, contentE]
      // schemaA: 
      [false, true, true, true, true], 
      // schemaB: 
      [false, true, false, false, false], 
      // schemaC: 
      [false, false, true, false, false], 
      // schemaD: 
      [false, false, false, true, false], 
      // schemaE: 
      [false, false, false, false, true], 
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