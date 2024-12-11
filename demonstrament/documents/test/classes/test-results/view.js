import TestResultsTemplate from './$template.js'
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
    templates: { writable: true, value: { TestResultsTemplate }},
    querySelectors: {
      testResults: ':scope > test-results',
      testGroup: ':scope > test-results test-group',
    },
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