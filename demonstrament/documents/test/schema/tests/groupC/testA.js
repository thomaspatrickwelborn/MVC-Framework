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
    const solve = [
      //
    ]
    const quest = []
    const contents = [
      // 
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