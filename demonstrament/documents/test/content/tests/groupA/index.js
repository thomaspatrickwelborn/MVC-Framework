import testA from './testA.js'
import testB from './testB.js'
import testC from './testC.js'
import testD from './testD.js'
import testE from './testE.js'
import testF from './testF.js'
import testG from './testG.js'
export default {
  id: "groupA",
  name: `<div><code>content.assign</code> Method</div>`,
  descript: `
    <ul>
      <li><Simplex Content Assignments/li>
      <ul>
        <li>2 Content Assignment Source Sequences</li>
        <ul>
          <li><em>5</em> Sources With <em>1</em> Property</li>
          <li><em>1</em> Source With <em>5</em> Properties</li>
        </ul>
        <li>6 Content Assignment Objects</li>
        <ul>
          <li>2 <em>All</em> Properties Valid</li>
          <li>2 <em>Some</em> Properties Valid</li>
          <li>2 <em>None</em> Properties Valid</li>
        </ul>
      </ul>
    </ul>
  `,
  type: 'test-group',
  collectName: 'tests',
  collect: new Map([
    // ['testA', testA],
    // ['testB', testB],
    // ['testC', testC],
    // ['testD', testD],
    ['testE', testE],
    // ['testF', testF],
    // ['testG', testG],
  ]),
}