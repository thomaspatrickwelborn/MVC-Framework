import groupA from './groupA/index.js'
import groupB from './groupB/index.js'
import groupC from './groupC/index.js'

/*
Validation Multidimensional Properties
  Schema Required
  Schema Not Required
*/

/*
Validation: Property Validity
  Defined Properties: Valid
  Defined Properties: Nonvalid
  Defined Properties: Unvalid
  Defined Properties: Valid/Nonvalid/Unvalid
  Defined Properties: Complete Properties
  Defined Properties: Incomplete Properties
*/

export default {
  id: "schema",
  name: "<div>MVC Framework | <code>Schema</code></div>",
  descript: `
    <p>Schema Methods with different Schema Property Definitions.</p>
    <ul>
      <li><code>Schema.validate</code></li>
      <li><code>Schema.validateProperty</code></li>
    </ul>
  `,
  type: 'test-results', 
  collectName: 'test-groups',
  collect: new Map([
    ['groupA', groupA],
    ['groupB', groupB],
    ['groupC', groupC],
  ]),
}