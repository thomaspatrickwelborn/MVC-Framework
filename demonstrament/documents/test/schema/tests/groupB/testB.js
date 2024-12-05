import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: "testB",
  groupID: "groupB",
  group: "Validation: Monodimensional Properties",
  name: "Validation Type: Primitive",
  descript: `When validation type is "primitive" only valid properties values assigned.`,
  method: function() {
    const schema = new Schema(/*expandTree(*/{
      propertyA: String,
      propertyB: Boolean,
      propertyC: Number,
      propertyD: null,
      propertyE: undefined,
    }/*, "type")*/, {
      validationType: "primitive"
    })
    const schemaA = new Schema(expandTree({
      propertyA: String,
      propertyB: Boolean,
      propertyC: Number,
      propertyD: null,
      propertyE: undefined,
    }, "type"), {
      validationType: "primitive"
    })
    // throw schemaB
    const contentA = {
      propertyA: "11111",
      propertyB: false,
      propertyC: 33333,
      propertyD: null,
      propertyE: "55555",
    } // true
    const contentB = {
      propertyA: 11111,
      propertyB: false,
      propertyC: "33333",
      propertyD: null,
      propertyE: 55555,
    } // true
    const contentC = {
      propertyA: "11111",
      propertyB: "false",
      propertyC: 33333,
      propertyD: "null",
      propertyE: "55555"
    } // true
    const contentD = {
      propertyA: false,
      propertyB: "true",
      propertyC: "33333",
      propertyD: 44444,
      propertyE: undefined,
    } // true
    const contentE = {
      propertyA: "111111",
      propertyB: "true",
      propertyC: "33333",
      propertyD: "44444",
      propertyE: undefined,
    } // true
    const solve = [
      true, true, true, true, true
    ]
    const quest = []
    const contents = [
      contentA, contentB, contentC, contentD, contentE
    ]
    const validations = []
    for(const $content of contents) {
      // const contentValidation = schema.validate($content)
      const contentValidation = schemaA.validate($content)
      validations.push(contentValidation)
      quest.push(contentValidation.valid)
    }
    this.pass = (JSON.stringify(quest) === JSON.stringify(solve))
    this.detail = {
      schema,
      contents,
      quest,
      solve,
      validations,
    }
    return this
  },
}