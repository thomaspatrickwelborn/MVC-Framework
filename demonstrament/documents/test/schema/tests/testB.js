import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: "testB",
  group: "Validate Property: Literals",
  name: "Property Value Type: Number",
  descript: `When schema property type is number validate only content property values that are numbers.`,
  method: function() {
    const schema = new Schema({
      propertyA: {
        type: Number,
        min: -1000,
        max: 1000,
      }
    })
    const contentA = { propertyA: 500 } // true
    const contentB = { propertyA: -500 } // true
    const contentC = { propertyA: "500" } // false
    const contentD = { propertyA: false } // false
    const contentE = { propertyA: undefined } // false
    const contentF = { propertyA: -999 } // true
    const contentG = { propertyA: -1000 } // true
    const contentH = { propertyA: -1001 } // false
    const contentI = { propertyA: 999 } // true
    const contentJ = { propertyA: 1000 } // true
    const contentK = { propertyA: 1001 } // false
    const contentL = { propertyA: null } // false
    const solve = [
      true, true, false, false, false, true, true, false, true, true, false, false
    ]
    const quest = []
    const contents = [
      contentA, contentB, contentC, contentD, contentE, contentF, contentG, contentH, contentI, contentJ, contentK, contentL
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