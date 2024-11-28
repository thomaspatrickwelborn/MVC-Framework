export default class ValidatorEvent extends Event {
  #settings
  #content
  #_key
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
    if(this.path) { this.#_key = this.path.split('.').pop() }
    else { this.#_key = null }
    return this.#_key
  }
  get path() { return this.#settings.path }
  get detail() { return this.#settings.detail }
}