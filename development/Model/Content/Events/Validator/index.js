export default class ValidatorEvent extends Event {
  #settings
  #eventTarget
  constructor($type, $settings, $eventTarget) {
    super($type)
    this.#settings = $settings
    this.#eventTarget = $eventTarget
    this.#eventTarget.addEventListener(
      $type, 
      ($event) => {
        if(this.#eventTarget.parent !== null) {
          this.#eventTarget.parent.dispatchEvent(
            new ValidatorEvent(
              this.type, 
              {
                basename: $event.basename,
                path: $event.path,
                detail: $event.detail,
                results: $event.results,
              },
              this.#eventTarget.parent
            )
          )
        }
      }, 
      {
        once: true
      }
    )
  }
  get basename() { return this.#settings.basename }
  get path() { return this.#settings.path }
  get detail() { return this.#settings.detail }
  get results() { return this.#settings.results }
}