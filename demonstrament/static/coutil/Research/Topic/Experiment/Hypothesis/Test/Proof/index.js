import Precondition from './Precondition/index.js'
import Argument from './Argument/index.js'
import Conclusion from './Conclusion/index.js'
export default class Proof extends EventTarget {
  #model
  #view
  #_parent
  #_template
  #_querySelectors
  #_title
  #_id
  #type = "proof"
  #_description
  #_preconditions
  #_arguments
  #_conclusions
  constructor($model = {}, $view = {}) {
    super()
    this.#model = $model
    this.#view = $view
    this.render()
  }
  get parent() {
    if(this.#_parent !== undefined) return this.#_parent
    this.#_parent = this.#view.parent
    return this.#_parent
  }
  get template() {
    if(this.#_template !== undefined) return this.#_template
    this.#_template = document.createElement('template')
    this.#_template.innerHTML = `<proof>
      <h6>${this.title}</h6>
      <description>${this.description}</description>
      <preconditions></preconditions>
      <arguments></arguments>
      <conclusions></conclusions>
    </proof>`
    return this.#_template
  }
  get querySelectors() {
    if(this.#_querySelectors !== undefined) return this.#_querySelectors
    this.#_querySelectors = {
      proof: this.parent.querySelector(':scope > proof'),
      title: this.parent.querySelector(':scope > proof > h6'),
      preconditions: this.parent.querySelector(':scope > proof > preconditions'),
      arguments: this.parent.querySelector(':scope > proof > arguments'),
      conclusions: this.parent.querySelector(':scope > proof > conclusions'),
    }
    return this.#_querySelectors
  }
  get id() {
    if(this.#_id !== undefined) return this.#_id
    this.#_id = this.#model.id
    return this.#_id
  }
  get title() {
    if(this.#_title !== undefined) return this.#_title
    this.#_title = this.#model.title
    return this.#_title
  }
  get description() {
    if(this.#_description !== undefined) return this.#_description
    this.#_description = this.#model.description
    return this.#_description
  }
  get preconditions() {
    if(this.#_preconditions !== undefined) return this.#_preconditions
    this.#_preconditions = []
    let preconditionIndex = 0
    for(const $precondition of this.#model.preconditions) {
      this.#_preconditions.push(
        new Precondition(
          Object.assign($precondition, { id: preconditionIndex }),
          { parent: this.querySelectors.preconditions },
        )
      )
      preconditionIndex++
    }
    return this.#_preconditions
  }
  get arguments() {
    if(this.#_arguments !== undefined) return this.#_arguments
    this.#_arguments = []
    let argumentIndex = 0
    for(const $argument of this.#model.arguments) {
      this.#_arguments.push(
        new Argument(
          Object.assign($argument, { id: argumentIndex }),
          { parent: this.querySelectors.arguments },
        )
      )
      argumentIndex++
    }
    return this.#_arguments
  }
  get conclusions() {
    if(this.#_conclusions !== undefined) return this.#_conclusions
    this.#_conclusions = []
    let conclusionIndex = 0
    for(const $conclusion of this.#model.conclusions) {
      this.#_conclusions.push(
        new Conclusion(
          Object.assign($conclusion, {
            id: conclusionIndex,
            arguments: this.arguments,
          }),
          { parent: this.querySelectors.conclusions },
        )
      )
      conclusionIndex++
    }
    return this.#_conclusions
  }
  render() {
    this.parent.appendChild(
      this.template.content
    )
    /*
    for(const $precondition of this.preconditions) {
      console.log($precondition)
      // $precondition.render()
    }
    for(const $argument of this.arguments) {
      console.log($argument)
      // $argument.render()
    }
    for(const $conclusion of this.conclusions) {
      console.log($conclusion)
      // $conclusion.render()
    }
    */
    return this
  }
}