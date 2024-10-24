export default class ContentEvent extends Event {
  #settings
  #content
  constructor($type, $settings, $content) {
    super($type)
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
                basename: $event.basename,
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
  get basename() {
    const { path } = this.#settings
    if(!path) { return null }
    return path.split('.').pop()
  }
  get path() { return this.#settings.path }
  get detail() { return this.#settings.detail }
}