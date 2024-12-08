const View = Object.defineProperties({}, {
  _parent: { writable: true, enumerable: false, value: undefined },
  parent: { get () {
    if(!this._parent) {
      this._parent = document.querySelector('index > main')
    }
    return this._parent
  } },
  element: { writable: true, value: undefined },
  template: { writable: true, value: document.createElement('template') },
  templates: { writable: true, value: {
    TestResultsTemplate: function ($model) { return `
      <test-results>
        ${Object.entries($model).map(([$groupName, $group]) => {
          return this.TestGroupTemplate($group)
        }).join("\n")}
      </test-results>
    ` },
    TestGroupTemplate: function ($model) { return `
      <test-group>
        ${Object.entries($model).map(([$testName, $test]) => {
          return this.TestResultTemplate($test)
        }).join("\n")}
      </test-group>
    ` },
    TestResultTemplate: function ($model) { return `
      <test-result
        data-pass="${$model.pass}"
      >
        <pass data-pass="${$model.pass}"></pass>
        <test-result-group>
          <name>${$model.group}</name>
          <id>${$model.groupID}</id>
        </test-result-group>
        <test-result-name>
          <name>${$model.name}</name>
          <id>${$model.id}</id>
        </test-result-name>
        <test-result-detail>
          <descript>${$model.descript}</descript>
        </test-result-detail>
      </test-result>
    ` },
  },
}})
export default class TestResults extends EventTarget {
  #model
  #view
  constructor($model = {}, $view = {}) {
    super()
    this.#model = $model
    this.#view = View
    this.#render()
  }
  #render() {
    const model = this.#model
    const view = this.#view
    const innerHTML = view.templates.TestResultsTemplate(model)
    view.template.innerHTML = innerHTML
    view.element = view.template.content.childNodes
    view.parent.append(...view.element)
  }
}