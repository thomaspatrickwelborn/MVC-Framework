import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: "testC",
  name: "Type: String: Length Validator",
  type: "test-result",
  collectName: 'detail',
  collect: new Map([
    [0, ` - When schema property type is string validate only content property values that are strings. `],
    [1, ` - When schema property minimum and/or maximum length (minLength, maxLength) defined validate only content property values with length inside range.`],
  ]),
  method: function() {
    const schema = new Schema({
      propertyA: {
        type: String,
        minLength: 3,
        maxLength: 24,
      }
    })
    const contentA = { propertyA: "That's some content." } // true
    const contentB = { propertyA: "$5,000,000,000,000,000.55" } // false
    const contentC = { propertyA: "$500,000,000,000,000,000" } // true
    const contentD = { propertyA: "$50,000,000,000,000,000" } // true
    const contentE = { propertyA: "$5" } // false
    const contentF = { propertyA: "$55" } // true
    const contentG = { propertyA: "$555" } // true
    const contentH = { propertyA: false } // false
    const contentI = { propertyA: 50000 } // false
    const contentJ = { propertyA: undefined } // false
    const contentK = { propertyA: null } // false

    const solve = [
      true, false, true, true, false, true, true, false, false, false, false
    ]
    const quest = []
    const contents = [
      contentA, contentB, contentC, contentD, contentE, contentF, contentG, contentH, contentI, contentJ, contentK, 
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