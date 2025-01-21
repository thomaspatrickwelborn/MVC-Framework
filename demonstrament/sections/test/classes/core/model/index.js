export default class Model extends EventTarget {
  #_settings
  #_path
  #_content = new Map()
  constructor($settings) {
    super()
    this.#_settings = $settings
    this.set(this.settings.content)
  }
  get settings() { return this.#_settings }
  get location() { return window.location.pathname }
  get content() { return Object.fromEntries(this.#_content) }
  get path() {
    if(this.#_path !== undefined) return this.#_path
    let { pathname } = window.location
    this.#_path = this.#_settings.path
    return this.#_path
  }
  parse($content) {
    $content = $content || this.content
    let content
    let contentEntries
    if($content instanceof Map) {
      content = []
      contentEntries = Array.from($content.entries($content))
      for(const $contentEntry of contentEntries) {
        content.push($contentEntry)
      }
    }
    else if(typeof $content === 'object') {
      contentEntries = Object.entries($content)
      const isArray = contentEntries.every(([$key, $value]) => !Number.isNaN(Number($key)) )
      if(isArray) { content = [] }
      else { content = {} }
      for(const [$key, $value] of contentEntries) {
        if($value && typeof $value === 'object') { content[$key] = this.parse($value) }
        else { content[$key] = $value }
      }
    }
    else { content[$key] = $value }
    console.log("content", content)
    return content
  }
  get() {
    const $arguments = Array.from(arguments)
    if($arguments.length === 1) { return this.#_content.get($arguments[0]) }
    else if($arguments.length === 0) { return this.#_content }
  }
  set() {
    const $arguments = Array.from(arguments)
    if($arguments.length === 1) {
      for(const [$key, $value] of Object.entries($arguments[0])) {
        this.#_content.set($key, $value)
      }
    }
    else if($arguments.length === 2) {
      const [$key, $value] = $arguments
      this.#_content.set($key, $value)
    }
    if(this.autosave) this.save()
    return this
  }
  delete() {
    const $arguments = Array.from(arguments)
    if($arguments.length === 1) {
      const [$key] = $arguments
      this.#_content.delete($key)
    }
    return this
  }
  clear() {
    this.#_content.clear()
    return this
  }
}
