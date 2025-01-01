import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: 'testA',
  name: `Schemata Properties Are Schematized Objects`,
  type: 'test-result',
  collectName: 'detail',
  collect: new Map([
    [0, `
      <ul style="display: flex; flex-direction: column; margin: 0 0 0 1em; padding: 0;">
        <li><code>$schema.type</code>: <code>object</code></li>
        <li><code>$schema.required</code>: <code>[true|false]</code></li>
        <li><code>$schema[$property].type</code>: <code>object</code></li>
        <li><code>$schema[$property][$property].type</code>: <code>[Number|String]</code></li>
      </ul>
    `]
  ]),
  method: function() {
    const solve = [
      [true, true, false, true, false, false],
      [false, true, true, true, false, false],
      [true, false, false, false, false, false],
    ]
    const quest = []
    const schemaA = new Schema({
      propertyA: {
        propertyB: Number
      },
      propertyC: {
        propertyD: String,
      },
    }, { required: false })
    // contentA: true
    // contentB: true
    // contentC: false
    // contentD: true
    // contentE: false
    // contentF: false
    const schemaB = new Schema({
      propertyA: {
        propertyB: String
      },
      propertyC: {
        propertyD: Number,
      },
    }, { required: false })
    // contentA: false
    // contentB: true
    // contentC: true
    // contentD: true
    // contentE: false
    // contentE: false
    const schemaC = new Schema({
      propertyA: {
        propertyB: Number
      },
      propertyC: {
        propertyD: String,
      },
    }, { required: true })
    // contentA: true
    // contentB: false
    // contentC: false
    // contentD: false
    // contentE: false
    // contentF: false
    const contentA = {
      propertyA: {
        propertyB: 333
      },
      propertyC: {
        propertyD: "333"
      }
    }
    const contentB = {
      propertyA: {
        propertyB: "333"
      },
      propertyC: {
        propertyD: "333"
      }
    }
    const contentC = {
      propertyA: {
        propertyB: "333"
      },
      propertyC: {
        propertyD: 333
      }
    }
    const contentD = {
      propertyA: {
        propertyB: 333
      },
      propertyC: {
        propertyD: 333
      }
    }
    const contentE = {
      propertyA: {
        propertyB: false
      },
      propertyC: {
        propertyD: true
      }
    }
    const contentF = {
      propertyE: {
        propertyF: "false"
      },
      propertyG: {
        propertH: "true"
      }
    }
    const schemata = [
      ['schemaA', schemaA],
      ['schemaB', schemaB],
      ['schemaC', schemaC],
    ]
    const contents = [
      ['contentA', contentA],
      ['contentB', contentB],
      ['contentC', contentC],
      ['contentD', contentD],
      ['contentE', contentE],
      ['contentF', contentF],
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