import testA from './testA.js'
import testB from './testB.js'
export default {
  id: "groupB",
  name: "Validation: Monodimensional Properties",
  type: 'test-group',
  collectName: 'tests',
  collect: new Map([
    ['testA', testA],
    ['testB', testB],
  ]),
}