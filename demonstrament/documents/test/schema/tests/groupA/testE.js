import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: "testE",
  name: "Type: Undefined",
  type: 'test-result', 
  collectName: 'detail',
  collect: new Map([
    [0, `When schema property type is undefined validate content property values that are numbers, strings, booleans.`,]
  ]),
  method: function() {
    const schema = new Schema({
      propertyA: {
        type: undefined,
      }
    })
    const contentA = { propertyA: true } // true
    const contentB = { propertyA: false } // true
    const contentC = { propertyA: -1 } // true
    const contentD = { propertyA: 0 } // true
    const contentE = { propertyA: 1 } // true
    const contentF = { propertyA: "true" } // true
    const contentG = { propertyA: null } // true
    const contentH = { propertyA: undefined } // false
    const solve = [
      true, true, true, true, true, true, true, false
    ]
    const quest = []
    const contents = [
      contentA, contentB, contentC, contentD, contentE, contentF, contentG, contentH
    ]
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