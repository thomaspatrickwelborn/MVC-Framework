export default class ContentEvent extends Event {
  #settings
  #content
  #_key
  constructor($type, $settings, $content) {
    super($type, $settings)
    this.#settings = $settings
    this.#content = $content
    this.#content.addEventListener(
      $type, 
      ($event) => {
        if(this.#content.parent !== null) {
          this.#content.parent.dispatchEvent(
            new ContentEvent(
              this.type, 
              {
                path: $event.path,
                value: $event.value,
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
  get change() { return this.#settings.change }
  get value() { return this.#settings.value }
  get path() { return this.#settings.path }
  get detail() { return this.#settings.detail }
}