import path from 'node:path'
import { rm, mkdir, readFile } from 'node:fs'
import { globSync } from 'glob'
import watch from 'glob-watcher'
import Section from './section/index.js'
export default class Sections extends EventTarget {
  length = 0
  #_settings
  #target
  #handler
  #proxy
  constructor($settings) {
    super()
    this.#settings = $settings
  }
  get #settings() { return this.#settings }
  set #settings($settings) {
    if(this.#_settings !== undefined) return
    this.#_settings = $settings
    const { name, source, target } = $settings
    const settings = []
    for(const $watchPath of $settings.watch) {
      const watcher = watch($watchPath, {
        ignoreInitial: false,
        awaitWriteFinish: true,
      })
      watcher.on('add', async ($addPath) => {
      })
      watcher.on('change', this.#change)
      watcher.on('unlink', this.#unlink)
    }
  }
  get($filter) {
    const sections = []
    for(const $section of Array.from(this)) {
      
    }
    return sections
  }
  #add($path) {
    const sectionPath = path.join(process.env.PWD, $addPath)
    const sectionImport = await import(sectionPath).then(($sectionImport) => {
      return $sectionImport.default
    })
    if(sectionImport.active) {
      Array.prototype.push.call(this, new Section(sectionImport))
    }
    return this
  }
  #change($path) { return this }
  #unlink($path) { return this }
}