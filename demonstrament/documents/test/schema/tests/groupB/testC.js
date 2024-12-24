import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: "testC",
  name: `<div style="display: flex; flex-wrap: wrap;">
    <div><code>Schema.options.validationType</code> | <code>\"primitive\"</code></div>
    <div><code>Schema.context[$property].required</code> | <code>true</code></div>
  </div>
  `,
  type: 'test-result',
  collectName: 'detail',
  collect: new Map([
    [0, `<div>When Schema context property definitions are <code>required</code> valid complementary content property values must be present on target or source object to pass.</div>`],
  ]),
  method: function() {
    const schema = new Schema({
      propertyA: {
        required: true,
        type: String,
      },
      propertyB: {
        required: true,
        type: Boolean,
      },
      propertyC: {
        required: true,
        type: Number,
      },
      propertyD: {
        required: true,
        type: null,
      },
      propertyE: {
        required: true,
        type: undefined,
      },
    }, {
      validationType: "primitive"
    })
    const contentA = {
      propertyA: "11111",
      propertyB: false,
      propertyC: 33333,
      propertyD: null,
      propertyE: "55555",
    } // true
    const solve = [
      true
    ]
    const quest = []
    const contents = [
      contentA
    ]
    const validations = []
    for(const $content of contents) {
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