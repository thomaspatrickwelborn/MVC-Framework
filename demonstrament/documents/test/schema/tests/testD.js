import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: "testD",
  group: "Validate Property: Literals",
  name: "Property Value Type: Enum Validator",
  descript: `When schema property enum defined validate any boolean, number, or string value against array of enumerated values.`,
  method: function() {
    const schemaA = new Schema({
      propertyA: {
        type: Boolean,
        enum: [true],
      }
    })
    const schemaB = new Schema({
      propertyA: {
        type: Number,
        enum: [20, -300],
      }
    })
    const schemaC = new Schema({
      propertyA: {
        type: String,
        enum: ["GGG"],
      }
    })
    const schemata = [
      schemaA, schemaB, schemaC
    ]
    const contentA1 = { propertyA: true } // true
    const contentA2 = { propertyA: false } // false
    const contentB1 = { propertyA: 20 } // true
    const contentB2 = { propertyA: 2020 } // false
    const contentB3 = { propertyA: -300 } // true
    const contentC1 = { propertyA: "GGG" } // true
    const contentC2 = { propertyA: "GGGGGG" } // false
    const solve = [
      true, false, true, false, true, true, false, 
    ]
    const quest = []
    const contents = [
      [schemaA, contentA1],
      [schemaA, contentA2],
      [schemaB, contentB1],
      [schemaB, contentB2],
      [schemaB, contentB3],
      [schemaC, contentC1],
      [schemaC, contentC2],
    ]
    const validations = []
    for(const [$schema, $content] of contents) {
      const contentValidation = $schema.validateProperty("propertyA", $content.propertyA)
      validations.push(contentValidation)
      quest.push(contentValidation.valid)
    }
    this.pass = (JSON.stringify(quest) === JSON.stringify(solve))
    this.detail = {
      schemata,
      contents,
      quest,
      solve,
      validations,
    }
    return this
  },
}