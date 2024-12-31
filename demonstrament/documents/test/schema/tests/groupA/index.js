import testA from './testA.js'
import testB from './testB.js'
import testC from './testC.js'
import testD from './testD.js'
import testE from './testE.js'
export default {
  id: "groupA",
  name: `
    <div style="display: flex; flex-direction: column;">
      <code>$schema.type</code>
      <code>$schema.context[$property].type</code>
    </div>
  `,
  descript: "Validate literal property values",
  type: 'test-group',
  collectName: 'tests',
  collect: new Map([
    ['testA', testA],
    ['testB', testB],
    ['testC', testC],
    ['testD', testD],
    ['testE', testE],
  ]),
}