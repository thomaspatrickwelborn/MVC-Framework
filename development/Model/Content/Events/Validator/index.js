export default class ValidatorEvent extends Event {
  #settings
  #content
  #_key
  #_value
  #_valid
  constructor($type, $settings, $content) {
    super($type)
    this.#settings = $settings
    this.#content = $content
    this.#content.addEventListener(
      $type, 
      ($event) => {
        if(this.#content.parent !== null) {
          this.#content.parent.dispatchEvent(
            new ValidatorEvent(
              this.type, 
              {
                key: $event.key,
                path: $event.path,
                detail: $event.detail,
              },
              this.#content.parent
            )
          )
        }
      }, 
      {
        once: true
      }
    )
  }
  get key() {
    if(this.#_key !== undefined) { return this.#_key }
    this.#_key = this.#settings.key
    return this.#_key
  }
  get value() {
    if(this.#_value !== undefined) { return this.#_value }
    this.#_value = this.#settings.value
    return this.#_value
  }
  get valid() {
    if(this.#_valid !== undefined) { return this.#_valid }
    this.#_valid = this.#settings.valid
    return this.#_valid
  }
}