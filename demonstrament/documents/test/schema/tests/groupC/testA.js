import { Schema, Coutil } from '/dependencies/mvc-framework.js'
const { expandTree } = Coutil
export default {
  id: 'testC',
  name: `
    <div style="display: flex; flex-direction: column;">
      <div><code>$schema.type</code>: <code>"object"</code></div>
      <div><code>$schema.context[$contextKey].type.value</code>: <code>[undefined|null|Number|String|Boolean]</code></div>
      <div><code>$schema.required</code>: <code>true</code></div>
    </div>
  `,
  type: 'test-result',
  collectName: 'detail',
  collect: new Map([
    [0, ``]
  ]),
  method: function() {
    const solve = []
    const quest = []
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