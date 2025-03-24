import testA from './testA.js'
export default {
  id: "groupA",
  name: `<div></div>`,
  descript: `
    <ul></ul>
  `,
  type: 'test-group',
  collectName: 'tests',
  collect: new Map([
    ['testA', testA],
  ]),
}