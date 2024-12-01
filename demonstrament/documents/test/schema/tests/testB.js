import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: "testB",
  group: "Validate Property: Literals",
  name: "Property Value Type: Boolean",
  descript: `When schema property type is boolean validate only content property values that are boolean.`,
  method: function() {
    return this
  },
}