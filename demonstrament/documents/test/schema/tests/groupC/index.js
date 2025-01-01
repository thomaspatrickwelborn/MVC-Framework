import testA from './testA.js'
export default {
  id: "groupC",
  name: "<div>Complex Schemata</div>",
  // descript: "",
  type: 'test-group',
  collectName: 'tests',
  collect: new Map([
    ['testA', testA],
  ]),
}