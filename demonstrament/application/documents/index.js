import path from 'node:path'
import { rm, mkdir, readFile } from 'node:fs'
import { globSync } from 'glob'
import watch from 'glob-watcher'
import Section from './section/index.js'
export default class Documents extends EventTarget {
  #settings
  #_sections
  constructor($settings) {
    super()
    this.#settings = $settings
    this.sections
  }
  get sections() {
    if(this.#_sections !== undefined) return this.#_sections
    const { name, source, target } = this.#settings
    const sections = []
    for(const $watchPath of this.#settings.watch) {
      const watcher = watch($watchPath, {
        ignoreInitial: false,
        awaitWriteFinish: true,
      })
      watcher.on('add', async ($path) => {
        const sectionPath = path.join(process.env.PWD, $path)
        const sectionImport = await import(sectionPath).then(($sectionImport) => {
          return $sectionImport.default
        })
        if(sectionImport.active) {
          sections.push(new Section(sectionImport))
        }
      })
      // watcher.on('change', ($path) => {
      //   console.log("change", $path)
      // })
      // watcher.on('unlink', ($path) => {
      //   console.log("unlink", $path)
      // })
    }
    this.#_sections = sections
    return this.#_sections
  }
}