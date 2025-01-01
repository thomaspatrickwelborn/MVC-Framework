import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: "testA",
  name: "Type: Boolean",
  descript: ``, 
  type: "test-result",
  collectName: 'detail',
  collect: new Map([
    [0, `When schema property type is boolean validate only content property values that are booleans.`],
  ]),
  method: function() {
    const schema = new Schema({
      propertyA: Boolean
    })
    const contentA = { propertyA: true } // true
    const contentB = { propertyA: false } // true
    const contentC = { propertyA: undefined } // false
    const contentD = { propertyA: 0 } // false
    const contentE = { propertyA: "1" } // false
    const contentF = { propertyA: null } // false
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