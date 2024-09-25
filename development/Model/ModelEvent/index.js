export default class ModelEvent extends Event {
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
            new ModelEvent(
              this.type, 
              {
                basename: $event.basename,
                path: $event.path,
                detail: $event.detail,
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
}