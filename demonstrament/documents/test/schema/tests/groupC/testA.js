import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: 'testC',
  name: `Complex Schemata 1`,
  type: 'test-result',
  collectName: 'detail',
  collect: new Map([
    [0, ``]
  ]),
  method: function() {
    const solve = []
    const quest = []
    const schemaA = new Schema({
      propertyA: {
        propertyB: Number
      },
      propertyC: {
        propertyD: String,
      }
    })
    // console.log(schemaA)
    console.log(schemaA.validate({
      propertyA: {
        propertyB: 333
      },
      propertyC: {
        propertyD: "333"
      }
    }))
    console.log(schemaA.validate({
      propertyA: {
        propertyB: "333"
      },
      propertyC: {
        propertyD: 333
      }
    }))
    const schemata = []
    const contents = []
    const validations = []
    for(const [$schemaName, $schema] of schemata) {
      const subvalidations = []
      const subquest = []
      for(const [$contentName, $content] of contents) {
        const contentValidation = $schema.validate($content)
        subvalidations.push(contentValidation)
        subquest.push(contentValidation.valid)
      }
      validations.push(subvalidations)
      quest.push(subquest)
    }
    console.log(
      "\n", "quest", JSON.stringify(quest), 
      "\n", "solve", JSON.stringify(solve), 
    )
    this.pass = (JSON.stringify(quest) === JSON.stringify(solve))
    this.detail = {
      method: this.method.toString(),
      schemata,
      contents,
      quest,
      solve,
      validations,
    }
    return this
  },
}