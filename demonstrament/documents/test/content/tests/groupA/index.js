import testA from './testA.js'
import testB from './testB.js'
import testC from './testC.js'
import testD from './testD.js'
import testE from './testE.js'
import testF from './testF.js'
import testG from './testG.js'
export default {
  id: "groupA",
  name: `<div><code>content.assign</code> Method</div>`,
  descript: ``,
  type: 'test-group',
  collectName: 'tests',
  collect: new Map([
    ['testA', testA],
    // ['testB', testB],
    // ['testC', testC],
    // ['testD', testD],
    // ['testE', testE],
    // ['testF', testF],
    // ['testG', testG],
  ]),
}