import testA from './testA.js'
import testB from './testB.js'
import testC from './testC.js'
import testD from './testD.js'
import testE from './testE.js'
export default {
  id: "groupA",
  name: "<div><code>Schema.context[$property].type</code></div>",
  descript: "Validate literal property values",
  type: 'test-group',
  collectName: 'tests',
  collect: new Map([
    ['testA', testA],
    ['testB', testB],
    ['testC', testC],
    ['testD', testD],
    ['testE', testE],
  ]),
}