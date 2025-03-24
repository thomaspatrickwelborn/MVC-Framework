export default {
  id: "testID", name: `Test Name`,
  type: "test-result", collectName: 'detail',
  descript: `
    <ul>
      <li><code>content.schema</code>: <code>null</code></li>
    </ul>
  `, 
  collect: new Map([
    [0, ``],
  ]),
  method: function() {
    this.pass = (JSON.stringify(quest) === JSON.stringify(solve))
    this.detail = {
      method: this.method.toString(),
      quest,
      solve,
      validations,
      ContentAssignments,
    }
    return this
  },
}