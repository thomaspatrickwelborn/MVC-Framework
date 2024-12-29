import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: 'testA',
  name: `
    <div style="display: flex; flex-direction: column;">
      <div><code>$schema.type</code>: <code>"array"</code></div>
      <div><code>$schema.context[0].type.value</code>: <code>[undefined|null|Number|String|Boolean]</code>
      <div><code>$schema.required</code>: <code>false</code>
    </div>
  `,
  type: 'test-result',
  collectName: 'detail',
  collect: new Map([
    [0, "Content Values"]
  ]),
  method: function() {
    const schemaA = new Schema([{
      type: undefined
    }], {
      required: false
    })
    const schemaB = new Schema([{
      type: null
    }], {
      required: false
    })
    const schemaC = new Schema([{
      type: Number
    }], {
      required: false
    })
    const schemaD = new Schema([{
      type: String
    }], {
      required: false
    })
    const schemaE = new Schema([{
      type: Boolean
    }], {
      required: false
    })
    // Content A
    // Schema A: true 
    // Schema B: true
    // Schema C: true
    // Schema D: true
    // Schema E: true
    const contentA = [undefined, null, 333, "DDD", true]
    // Content B
    // Schema A: true 
    // Schema B: true
    // Schema C: true
    // Schema D: true
    // Schema E: true
    const contentB = [null, null, null, null, null]
    // Content C
    // Schema A: true 
    // Schema B: true
    // Schema C: true
    // Schema D: true
    // Schema E: true
    const contentC = [111, 222, 333, 444, 555]
    // Content D
    // Schema A: true 
    // Schema B: true
    // Schema C: true
    // Schema D: true
    // Schema E: true
    const contentD = ["AAA", "BBB", "CCC", "DDD", "EEE"]
    // Content E
    // Schema A: true 
    // Schema B: true
    // Schema C: true
    // Schema D: true
    // Schema E: true
    const contentE = [true, false, true, false, true]
    const solve = [
      // contentA: 
      [true, true, true, true, true], 
      // contentB: 
      [true, true, true, true, true], 
      // contentC: 
      [true, true, true, true, true], 
      // contentD: 
      [true, true, true, true, true], 
      // contentE: 
      [true, true, true, true, true], 
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
      "\n", JSON.stringify(quest), 
      "\n", JSON.stringify(solve), 
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