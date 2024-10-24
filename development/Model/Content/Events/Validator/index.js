export default class ValidatorEvent extends Event {
  #settings
  #content
  #_basename
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
                basename: $event.basename,
                path: $event.path,
                detail: $event.detail,
                results: $event.results,
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
  get basename() {
    if(this.#_basename !== undefined) { return this.#_basename }
    if(this.path) { this.#_basename = this.path.split('.').pop() }
    else { this.#_basename = null }
    return this.#_basename
  }
  get path() { return this.#settings.path }
  get detail() { return this.#settings.detail }
  get results() { return this.#settings.results }
}