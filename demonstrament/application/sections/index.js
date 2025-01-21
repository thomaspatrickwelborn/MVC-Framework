import path from 'node:path'
import { rm, mkdir, readFile } from 'node:fs'
import { globSync } from 'glob'
import watch from 'glob-watcher'
import Section from './section/index.js'
export default class Sections extends EventTarget {
  #sections
  constructor($sections) {
    super()
    this.sections = $sections
  }
  set sections($sections) {
    if(this.#sections !== undefined) return
    const { name, source, target } = $sections
    const sections = []
    for(const $watchPath of $sections.watch) {
      const watcher = watch($watchPath, {
        ignoreInitial: false,
        awaitWriteFinish: true,
      })
      watcher.on('add', async ($addPath) => {
        const sectionPath = path.join(process.env.PWD, $addPath)
        const sectionImport = await import(sectionPath).then(($sectionImport) => {
          return $sectionImport.default
        })
        if(sectionImport.active) {
          sections.push(new Section(sectionImport))
        }
      })
      watcher.on('change', ($path) => {
        console.log("change", $path)
      })
      // watcher.on('unlink', ($path) => {
      //   console.log("unlink", $path)
      // })
    }
    this.#sections = sections
    return this.#sections
  }
}