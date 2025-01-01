import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: "testA",
  name: `
    <div style="display: flex; flex-direction: column;">
      <div><code>$schema.required</code>: <code>false</code></div>
      <div><code>$schema.context[$property].required</code>: <code>true</code></div>
    </div>
  `,
  descript: ``, 
  type: 'test-result',
  collectName: 'detail',
  collect: new Map([
    [0, `<div>When Schema context property definitions are <code>required</code> valid complementary content property values must be present on target or source object to pass.</div>`],
    [1, `<div>When Schema required option is <code>false</code> no complementary content property values must validate on target or source to pass.</div>`],
  ]),
  method: function() {
    // All Properties Required
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
      required: false
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
    // All Properties Present
    // Some Properties Valid
    const contentC = {
      propertyA: 11111,
      propertyB: false,
      propertyC: "33333",
      propertyD: null,
      propertyE: "55555",
    } // false
    // Some Properties Present
    // Some Properties Valid
    const contentD = {
      propertyC: 33333,
      propertyD: false,
      propertyE: 555555,
    } // false
    const solve = [
      true,
      // false,
      // false,
      // false,
    ]
    const quest = []
    const contents = [
      ['contentA', contentA],
      // ['contentB', contentB],
      // ['contentC', contentC],
      // ['contentD', contentD],
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