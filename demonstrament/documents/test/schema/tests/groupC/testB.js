import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: 'testA',
  name: `Schemata Properties Are Arrays Of Schematized Objects`,
  type: 'test-result',
  collectName: 'detail',
  collect: new Map([
    [0, `
      <ul style="display: flex; flex-direction: column; margin: 0 0 0 1em; padding: 0;">
        <li><code>$schema.type</code>: <code>object</code></li>
        <li><code>$schema.required</code>: <code>[true|false]</code>
        <li><code>$schema[$property].type</code>: <code>array</code></li>
        <li><code>$schema[$property][$index].type</code>: <code>object</code></li>
        <li><code>$schema[$property][$index][$property].type</code>: <code>[Number|String|Boolean]</code></li>
      </ul>
    `]
  ]),
  method: function() {
    const solve = [
      // [#contentA, #contentB, #contentC, #contentD]
      [true, false, true, true],
      [true, false, false, false],
    ]
    const quest = []
    const schemaA = new Schema({
      propertyA: [{
        propertyB: Number,
        propertyC: String,
        propertyD: Boolean,
      }],
    }, { required: false })
    // contentA: true
    // contentB: false
    // contentC: true
    // contentD: true
    const schemaB = new Schema({
      propertyA: [{
        propertyB: Number,
        propertyC: String,
        propertyD: Boolean,
      }],
    }, { required: true })
    // contentA: true
    // contentB: false
    // contentC: false
    // contentD: false
    const contentA = {
      propertyA: [{
        propertyB: 0,
        propertyC: "00000",
        propertyD: true,
      }, {  // valid
        propertyB: 11111,
        propertyC: "11111",
        propertyD: true,
      }, {  // valid
        propertyB: 22222,
        propertyC: "22222",
        propertyD: false,
      }]  // valid
    }
    const contentB = {
      propertyA: [{
        propertyB: true,
        propertyC: 0,
        propertyD: "00000",
      }, {  // nonvalid
        propertyB: false,
        propertyC: 11111,
        propertyD: "11111",
      }, {  // nonvalid
        propertyB: true,
        propertyC: 22222,
        propertyD: "22222",
      }]  // nonvalid
    }
    const contentC = {
      propertyA: [{
        propertyB: true,
        propertyC: 0,
        propertyD: "00000",
      }, {  // nonvalid
        propertyB: 11111,
        propertyC: "11111",
        propertyD: true,
      }, {  // valid
        propertyB: true,
        propertyC: 22222,
        propertyD: "22222",
      }]  // nonvalid
    }
    const contentD = {
      propertyA: [{
        propertyB: 0,
        propertyC: "00000",
        propertyD: true,
      }, {  // valid
        propertyB: false,
        propertyC: 11111,
        propertyD: "11111",
      }, {  // nonvalid
        propertyB: 22222,
        propertyC: "22222",
        propertyD: false,
      }]  // valid
    }
    const schemata = [
      ['schemaA', schemaA],
      ['schemaB', schemaB],
    ]
    const contents = [
      ['contentA', contentA],
      ['contentB', contentB],
      ['contentC', contentC],
      ['contentD', contentD],
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