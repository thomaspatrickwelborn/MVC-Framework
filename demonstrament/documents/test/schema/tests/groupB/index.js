import testA from './testA.js'
import testB from './testB.js'
import testC from './testC.js'
export default {
  id: "groupB",
  name: "<div><code>Schema.validate</code> | LiteralsTypes</div>",
  descript: "",
  type: 'test-group',
  collectName: 'tests',
  collect: new Map([
    ['testA', testA],
    ['testB', testB],
    ['testC', testC],
  ]),
}