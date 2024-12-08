import testA from './testA.js'
import testB from './testB.js'
export default {
  id: "groupB",
  name: "Validation: Monodimensional Properties",
  tests: new Map([
    ['testA', testA],
    ['testB', testB],
  ]),
}