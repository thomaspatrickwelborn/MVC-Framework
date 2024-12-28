import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: "testF",
  name: `
    <div style="display: flex; flex-direction: column;">
      <div>Schema Properties Required: Some</div>
      <div>Schema Required: <code>true</code></div>
    </div>
  `,
  type: 'test-result',
  collectName: 'detail',
  collect: new Map([
    [0, `<div>When Schema context property definitions are not <code>required</code> no valid complementary content property values must be present on target or source object to pass.</div>`],
    [1, `<div>When Schema validation type is <code>object</code> all complementary content property values must validate on target or source to pass.</div>`],
  ]),
  method: function() {
    // 3 Required Properties (A, C, E)
    // 2 Nonrequired Properties (B, D)
    const schema = new Schema({
      propertyA: {
        required: true,
        type: String,
      },
      propertyB: {
        required: false,
        type: Boolean,
      },
      propertyC: {
        required: true,
        type: Number,
      },
      propertyD: {
        required: false,
        type: null,
      },
      propertyE: {
        required: true,
        type: undefined,
      },
    }, {
      required: true
    })
    // 3 Required Properties Valid (A, C, E)
    // 2 Nonrequired Properties Valid (B, D)
    const contentA = {
      propertyA: "11111",
      propertyB: false,
      propertyC: 33333,
      propertyD: null,
      propertyE: "55555",
    } // true
    // 2 Required Properties Valid (C, E)
    // 2 Nonrequired Properties Valid (B, D)
    const contentB = {
      propertyB: false,
      propertyC: 33333,
      propertyD: null,
      propertyE: "55555",
    } // false
    // 2 Required Properties Valid (A, E)
    // 2 Nonrequired Properties Valid (B, D)
    const contentC = {
      propertyA: "11111",
      propertyB: false,
      propertyD: null,
      propertyE: "55555",
    } // false
    // 2 Required Properties Valid (A, C)
    // 2 Nonrequired Properties Valid (B, D)
    const contentD = {
      propertyA: "11111",
      propertyB: false,
      propertyC: 33333,
      propertyD: null,
    } // false
    // 1 Required Property Valid (E)
    // 2 Nonrequired Properties Valid (B, D)
    const contentE = {
      propertyB: false,
      propertyD: null,
      propertyE: "55555",
    } // false
    // 1 Required Property Valid (C)
    // 2 Nonrequired Properties Valid (B, D)
    const contentF = {
      propertyB: false,
      propertyC: 33333,
      propertyD: null,
    } // false
    // 1 Required Property Valid (A)
    // 2 Nonrequired Properties Valid (B, D)
    const contentG = {
      propertyA: "11111",
      propertyB: false,
      propertyD: null,
    } // false
    // 0 Required Properties
    // 2 Nonrequired Properties Valid (B, D)
    const contentH = {
      propertyB: false,
      propertyD: null,
    } // false
    // 3 Required Properties Valid (A, C, E)
    // 1 Nonrequired Property Valid (D)
    const contentI = {
      propertyA: "11111",
      propertyC: 33333,
      propertyD: null,
      propertyE: "55555",
    } // true
    // 3 Required Properties Valid (A, C, E)
    // 1 Nonrequired Property Valid  (B)
    const contentJ = {
      propertyA: "11111",
      propertyB: false,
      propertyC: 33333,
      propertyE: "55555",
    } // true
    // 3 Required Properties Valid (A, C, E)
    // 0 Unrequired Properties
    const contentK = {
      propertyA: "11111",
      propertyC: 33333,
      propertyE: "55555",
    } // true
    const solve = [
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
    ]
    const quest = []
    const contents = [
      ['contentA', contentA],
      ['contentB', contentB],
      ['contentC', contentC],
      ['contentD', contentD],
      ['contentE', contentE],
      ['contentF', contentF],
      ['contentG', contentG],
      ['contentH', contentH],
      ['contentI', contentI],
      ['contentJ', contentJ],
      ['contentK', contentK],
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