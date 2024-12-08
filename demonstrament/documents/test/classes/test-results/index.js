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
      <test-result>
        <id>${$model.id}</id>
        <group-id>${$model.groupID}</group-id>
        <group>${$model.group}</group>
        <descript>${$model.descript}</descript>
        <name>${$model.name}</name>
        <pass>${$model.pass}</pass>
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
    console.log("-----")
    console.log("model", model)
    console.log("view", view)
    // console.log("model", JSON.stringify(model, null, 2))
    console.log("innerHTML", innerHTML)
    view.template.innerHTML = innerHTML
    view.element = view.template.content.childNodes
    view.parent.append(...view.element)
  }
}