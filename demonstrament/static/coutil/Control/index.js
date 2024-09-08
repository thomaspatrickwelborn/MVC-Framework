export default class Control extends EventTarget {
  #defaultPropertyNames = [
    "id", "type", "label", "name", "description"
  ]
  #_parent
  #_template
  #_element
  #_querySelectors
  constructor($model = {}, $view = {}) {
    super()
    this.model = $model
    this.view = $view
    Object.defineProperties(this, {
      render: {
        writable: false,
        enumerable: false,
        configurable: false, 
        value: function render() {
          this.parent
          this.element
          return this
        }
      },
      model: {
        writable: false,
        enumerable: false,
        configurable: false,
        value: $model,
      },
      view: {
        writable: false,
        enumerable: false,
        configurable: false,
        value: $view,
      }
    })
    for(const $defaultPropertyKey of this.#defaultPropertyKeys) {
      Object.defineProperties(this, {
        [$defaultPropertyKey]: {
          writable: false,
          enumerable: true,
          configurable: false,
          value: {
            get() {
              if(this[`_${$defaultPropertyKey}`] !== undefined) {
                return this[`_${$defaultPropertyKey}`]
              }
              this[`_${$defaultPropertyKey}`] = this.model.id
              return this[`_${$defaultPropertyKey}`]
            }
          }
        },
        [`_${$defaultPropertyKey}`]: {
          writable: true,
          enumerable: false,
          configurable: false,
          value: undefined,
        }
      })
    }
  }
  get element() {
    if(this.#_element !== undefined) return this.#_element
    this.#_element = this.parent.appendChild(
      this.template.content
    )
    return this.#_element
  }
  get template() {
    if(this.#_template !== undefined) return this.#_template
    this.#_template = document.createElement('template')
    this.#_template.innerHTML = this.view.template(this)
    return this.#_template
  }
  get querySelectors() {
    if(this.#_querySelectors !== undefined) return this.#_querySelectors
    this.#_querySelectors = {}
    for(const [
      $querySelectorName, $querySelectorString
    ] of Object.entries(this.view.querySelectors)) {
      this.#_querySelectors[
        $querySelectorName
      ] = this.parent.querySelector($querySelectorString)
    }
    return this.#_querySelectors
  }

}