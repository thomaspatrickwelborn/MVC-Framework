import testA from './testA.js'
import testB from './testB.js'
export default {
  id: "groupB",
  name: "<div><code>Schema.validate</code> | Required Validator</div>",
  // descript: "",
  type: 'test-group',
  collectName: 'tests',
  collect: new Map([
    ['testA', testA],
    ['testB', testB],
  ]),
}