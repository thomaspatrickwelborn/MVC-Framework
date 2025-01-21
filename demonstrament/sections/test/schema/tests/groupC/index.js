import testA from './testA.js'
import testB from './testB.js'
export default {
  id: "groupC",
  name: "Complex Schemata",
  descript: `
    <p>Array, Object Schema Types with Array, Object Subproperties</p>
  `,
  type: 'test-group',
  collectName: 'tests',
  collect: new Map([
    ['testA', testA],
    ['testB', testB],
  ]),
}