const Messages = {
  'true': ($verification) => `${$verification.pass}`,
  'false': ($verification) => `${$verification.pass}`,
}
export default class Validator extends EventTarget {
  #_definition
  #_schema
  constructor($definition = {}, $schema) {
    super()
    this.definition = Object.freeze(
      Object.assign({ messages: Messages }, $definition)
    )
    this.schema = $schema
  }
  get definition() { return this.#_definition }
  set definition($definition) { this.#_definition = $definition }
  get schema() { return this.#_schema }
  set schema($schema) {
    if(this.#_schema !== undefined) { return this.#_schema }
    this.#_schema = $schema
    return this.#_schema
  }
  get type() { return this.definition.type }
  get messages() { return this.definition.messages }
  get validate() { return this.definition.validate }
}