import testA from './testA.js'
import testB from './testB.js'
import testC from './testC.js'
import testD from './testD.js'
import testE from './testE.js'
import testF from './testF.js'
import testG from './testG.js'
import testH from './testH.js'
export default {
  id: "groupB",
  name: 'Required Validator',
  descript: `
    <div>
      <p>Validate literal property values with Required Validator</p>
      <div><code>Schema.required</code></div>
      <div><code>Schema.context[$property].required</code></div>
    </div>
  `,
  // descript: "",
  type: 'test-group',
  collectName: 'tests',
  collect: new Map([
    ['testA', testA],
    ['testB', testB],
    ['testC', testC],
    ['testD', testD],
    ['testE', testE],
    ['testF', testF],
    ['testG', testG],
    ['testH', testH],
  ]),
}