import testA from './testA.js'
import testB from './testB.js'
import testC from './testC.js'
import testD from './testD.js'
import testE from './testE.js'
export default {
  id: "groupA",
  name: "Validate Property: Literals",
  tests: new Map([
    ['testA', testA],
    ['testB', testB],
    ['testC', testC],
    ['testD', testD],
    ['testE', testE],
  ]),
}