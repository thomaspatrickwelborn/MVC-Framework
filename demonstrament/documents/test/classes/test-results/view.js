export default function View($view) {
  const View = Object.defineProperties({}, {
    _parent: { writable: true, enumerable: false, value: undefined },
    parent: { get () {
      if(!this._parent) {
        this._parent = document.querySelector('index')
      }
      return this._parent
    } },
    element: { writable: true, value: undefined },
    template: { writable: true, value: document.createElement('template') },
    templates: { writable: true, value: {
      // Test Results
      TestResultsTemplate: function ($model) { return `
        <test-results data-pass="${$model.pass}">
          <pass data-pass="${$model.pass}"></pass>
          <id>___</id>
          <name>${$model.name}</name>
          <test-groups>
            ${Array.from($model.groups.entries()).map(([
              $groupName, $group
            ]) => {
              return this.TestGroupTemplate($group)
            }).join("\n")}
          </test-groups>
        </test-results>
      ` },
      // Test Group
      TestGroupTemplate: function ($model) { return `
        <test-group data-pass="${$model.pass}">
          <pass data-pass="${$model.pass}"></pass>
          <id>${$model.id}</id>
          <name>${$model.name}</name>
          <tests>
            ${Array.from($model.tests.entries()).map(([
              $testName, $test
              ]) => {
              return this.TestResultTemplate($test)
            }).join("\n")}
          </tests>
        </test-group>
      ` },
      // Test Result
      TestResultTemplate: function ($model) { return `
        <test-result data-pass="${$model.pass}">
          <pass data-pass="${$model.pass}"></pass>
          <id>${$model.id}</id>
          <name>${$model.name}</name>
          <detail>
            <descript>${$model.descript}</descript>
          </detail>
        </test-result>
      ` },
    }},
    // Render
    render: { writable: false, value: function ($model) {
      const innerHTML = this.templates.TestResultsTemplate($model)
      this.template.innerHTML = innerHTML
      this.element = this.template.content.childNodes
      this.parent.append(...this.element)
    }}
  })
  return View
}