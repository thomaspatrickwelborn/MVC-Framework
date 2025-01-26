import testA from './testA/index.js'
import testB from './testB/index.js'
import testC from './testC/index.js'
import testD from './testD/index.js'
import testE from './testE/index.js'
import testF from './testF/index.js'
import testG from './testG/index.js'
import testH from './testH/index.js'
import testI from './testI/index.js'
export default {
  id: "groupB",
  name: `<div>
    <code>content.assign</code> | Complex Objects
  </div>`,
  descript: `
    <ul>
      <li>2 Content Assignment Source Sequences</li>
      <ul>
        <li><em>3</em> Sources With <em>Separate</em> Properties</li>
        <li><em>1</em> Source With <em>Corporate</em> Properties</li>
      </ul>
      <li>6 Content Assignment Objects</li>
      <ul>
        <li>2 <em>All</em> Properties Valid</li>
        <li>2 <em>Some</em> Properties Valid</li>
        <li>2 <em>None</em> Properties Valid</li>
      </ul>
    </ul>
  `,
  type: 'test-group',
  collectName: 'tests',
  collect: new Map([
    ['testA', testA],
    ['testB', testB],
    ['testC', testC],
    ['testD', testD],
    ['testE', testE],
    ['testF', testF],
    ['testG', testG],
    ['testH', testH],
    ['testI', testI],
  ]),
}