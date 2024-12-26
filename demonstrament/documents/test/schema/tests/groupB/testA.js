import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: "testA",
  name: `<div style="display: flex; flex-wrap: wrap;">
    <div>Required: All Properties</div>
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
    // All Properties Present
    // All Properties Valid
    const contentA = {
      propertyA: "11111",
      propertyB: false,
      propertyC: 33333,
      propertyD: null,
      propertyE: "55555",
    } // true
    // Some Properties Present
    // All Properties Valid
    const contentB = {
      propertyB: false,
      propertyC: 33333,
      propertyD: null,
      propertyE: "55555",
    } // false
    // All Properties Presetn
    // Some Properties Valid
    const contentC = {
      propertyA: 11111,
      propertyB: false,
      propertyC: "33333",
      propertyD: null,
      propertyE: "55555",
    } // true
    const solve = [
      true,
      false,
      true,
    ]
    const quest = []
    const contents = [
      contentA,
      contentB,
      contentC,
    ]
    const validations = []
    for(const $content of contents) {
      const contentValidation = schema.validate($content)
      console.log(contentValidation)
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