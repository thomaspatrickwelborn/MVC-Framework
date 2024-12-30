import testA from './testA.js'
import testB from './testB.js'
export default {
  id: "groupC",
  name: "<div><code>Schema.context[$property].required</code></div>",
  // descript: "",
  type: 'test-group',
  collectName: 'tests',
  collect: new Map([
    ['testA', testA],
    ['testB', testB],
  ]),
}