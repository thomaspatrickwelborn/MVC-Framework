import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: 'testB',
  name: `
    <div style="display: flex; flex-direction: column;">
      <div><code>$schema.type</code>: <code>"array"</code></div>
      <div><code>$schema.context[0].type.value</code>: <code>[undefined|null|Number|String|Boolean]</code>
      <div><code>$schema.required</code>: <code>true</code>
    </div>
  `,
  type: 'test-result',
  collectName: 'detail',
  collect: new Map([
    [0, "Content Values"]
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
        false, // contentA
        true, // contentB
        false, // contentC
        false, // contentD
        false, // contentE
      ], 
      // schemaC: 
      [
        false, // contentA
        false, // contentB
        true, // contentC
        false, // contentD
        false, // contentE
      ], 
      // schemaD: 
      [
        false, // contentA
        false, // contentB
        false, // contentC
        true, // contentD
        false, // contentE
      ], 
      // schemaE: 
      [
        false, // contentA
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
    console.log(
      "\n", "quest", JSON.stringify(quest), 
      "\n", "solve", JSON.stringify(solve), 
    )
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