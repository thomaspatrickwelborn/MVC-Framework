import path from 'node:path'
export default class Piler extends EventTarget {
  settings
  section
  #input
  #output
  #watch
  #ignore
  constructor($settings, $section) {
    super()
    this.settings = $settings
    this.section = $section
  }
  get input() {
    if(this.#input !== undefined) { return this.#input }
    this.#input = path.join(this.section.source, this.settings.input)
    return this.#input
  }
  get output() {
    if(this.#output !== undefined) { return this.#output }
    this.#output = path.join(this.section.target, this.settings.output)
    return this.#output
  }
  get watch() {
    if(this.#watch !== undefined) { return this.#watch }
    this.#watch = this.settings.watch.map(
      ($watchPath) => path.join(this.sections.source, $watchPath)
    )
    return this.#watch
  }
  get ignore() {
    if(this.#ignore !== undefined) { return this.#ignore }
    this.#ignore = Array.prototype.concat(
      this.settings.ignore.map(
        ($ignorePath) => path.join(this.section.source, $ignorePath)
      )
      this.section.ignore.map(
        ($ignorePath) => path.join(this.section.source, $ignorePath)
      )
    )
    return this.#ignore
  }
  get watcher() {
    if(this.#watcher !== undefined) { return this.#watcher }
    const watcher = watch(this.watch, {
      ignored: this.ignore,
      ignoreInitial: false,
      awaitWriteFinish: true,
    })
    watcher.on('add', ($path, $stats) => this.pile($path))
    watcher.on('change', ($path, $stats) => this.pile($path))
    this.#_watcher = watcher
    return this.#_watcher
  }
}