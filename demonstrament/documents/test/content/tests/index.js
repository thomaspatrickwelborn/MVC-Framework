import groupA from './groupA/index.js'
export default {
  id: "content",
  name: "<div>MVC Framework | <code>Content</code></div>",
  descript: `
    <ul>
      <li>Object/Array Methods</li>
      <ul>
        <li>Method Events</li>
        <li>Schema Validation</li>
      </ul>
    </ul>
  `,
  type: 'test-results', 
  collectName: 'test-groups',
  collect: new Map([
    ['groupA', groupA],
  ]),
}