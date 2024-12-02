import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: "testA",
  group: "Validate Property: Literals",
  name: "Property Value Type: Boolean",
  descript: `When schema property type is boolean validate only content property values that are booleans.`,
  method: function() {
    const schema = new Schema(expandTree({
      propertyA: Boolean
    }, "type"))
    const contentA = { propertyA: true }
    const contentB = { propertyA: false }
    const contentC = { propertyA: undefined }
    const contentD = { propertyA: 0 }
    const contentE = { propertyA: "1" }
    const contentF = { propertyA: null }
    const solve = [true, true, false, false, false, false]
    const quest = []
    const contents = [contentA, contentB, contentC, contentD, contentE, contentF]
    const validations = []
    for(const $content of contents) {
      const contentValidation = schema.validateProperty("propertyA", $content.propertyA)
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