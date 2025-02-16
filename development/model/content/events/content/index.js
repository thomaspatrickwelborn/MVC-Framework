export default class ContentEvent extends Event {
  #settings
  #content
  #key
  constructor($type, $settings, $content) {
    super($type, $settings)
    this.#settings = $settings
    this.#content = $content
    this.#content.addEventListener(
      $type, 
      ($event) => {
        if(this.#content.parent !== null) {
          const { path, value, detail, change } = $event
          this.#content.parent.dispatchEvent(
            new ContentEvent(
              this.type, 
              { path, value, detail, change },
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
    if(this.#key !== undefined) { return this.#key }
    if(this.path) { this.#key = this.path.split('.').pop() }
    else { this.#key = null }
    return this.#key
  }
  get change() { return this.#settings.change }
  get value() { return this.#settings.value }
  get path() { return this.#settings.path }
  get detail() { return this.#settings.detail }
}