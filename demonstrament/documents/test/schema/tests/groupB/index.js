import testA from './testA.js'
import testB from './testB.js'
import testC from './testC.js'
import testD from './testD.js'
import testE from './testE.js'
import testF from './testF.js'
export default {
  id: "groupB",
  name: "<div><code>Schema.context[$property].required</code></div>",
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
  ]),
}