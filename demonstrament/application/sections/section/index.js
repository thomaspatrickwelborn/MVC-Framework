import Route from './route/index.js'
import * as Pilers from '../../pilers/index.js'
import path from 'node:path'
import { rm, mkdir, readFile } from 'node:fs'
import { globSync } from 'glob'
import watch from 'glob-watcher'
export default class Section extends EventTarget {
  #settings
  #active
  #source
  #target
  #ignore
  #scripts
  #simules
  #structs
  #styles
  constructor($settings, $sections) {
    super()
    console.log($settings)
    this.#settings = $settings
    // this.#clear()
    // .then(() => {
    //   this.structs
    //   this.styles
    //   this.scripts
    //   this.simules
    // })
  }
  get active() { return this.#active }
  set active($active) {
    if(this.#active === $active) { return }
    if($active === true) {}
    else if($active === false) {}
  }
  get name() { return this.#settings.name }
  get url() { return this.#settings.url }
  get source() {}
  get target() {}
  get main() { return this.#settings.main }
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
  #clear() {
    const { source, target } = this.settings
    const clear = []
    const clearSource = this.settings.clear.source
    const clearTarget = this.settings.clear.target
    const clearPaths = Array.prototype.concat(
      clearSource.path.map(
        ($clearSourcePath) => path.join(source, $clearSourcePath)
      ),
      clearTarget.path.map(
        ($clearTargetPath) => path.join(target, $clearTargetPath)
      ),
    )
    const ignorePaths = Array.prototype.concat(
      clearSource.ignore.map(
        ($clearSourceIgnore) => path.join(source, $clearSourceIgnore)
      ),
      clearTarget.ignore.map(
        ($clearTargetIgnore) => path.join(target, $clearTargetIgnore)
      ),
    )
    const paths = globSync(clearPaths, {
      ignore: ignorePaths
    })
    for(const $path of paths) {
      clear.push(
        new Promise(($resolve, $reject) => {
          rm($path, {
            recursive: true,
            force: true,
          }, ($err) => {
            if($err) { $reject($err) }
            else { $resolve(true) }
          })
          $resolve(true)
        })
      )
    }
    return Promise.all(clear)
  }
  get scripts() {
    if(this.#scripts !== undefined) return this.#scripts
    const { documents, source, target } = this.settings
    this.#scripts = []
    for(const $document of this.settings.documents.scripts) {
      const piler = new PilersRollupPiler()
      // const watchSource = $document.watch.map(
      //   ($watchSourcePath) => path.join(source, $watchSourcePath)
      // )
      // const ignoreSource = Array.prototype.concat(
      //   $document.ignore.map(
      //     ($ignoreSourcePath) => path.join(source, $ignoreSourcePath)
      //   ),
      //   this.settings.ignore.map(
      //     ($ignoreRoutePath) => path.join(source, $ignoreRoutePath)
      //   )
      // )
      // const watcher = watch(watchSource, {
      //   ignored: ignoreSource,
      //   ignoreInitial: false,
      //   awaitWriteFinish: true,
      // })
      // watcher.on('add', ($path, $stats) => {
      //   Pilers.RollupPiler($document, this.settings, $path)
      // })
      // watcher.on('change', ($path, $stats) => {
      //   Pilers.RollupPiler($document, this.settings, $path)
      // })
      // this.#scripts.push(watcher)
    }
    return this.#scripts
  }
  get simules() {
    if(this.#simules !== undefined) return this.#simules
    const { documents, source, target } = this.settings
    this.#simules = []
    for(const $document of documents.simules) {
      const watchSource = $document.watch.map(
        ($watchSourcePath) => path.join(source, $watchSourcePath)
      )
      const ignoreSource = Array.prototype.concat(
        $document.ignore.map(
          ($ignoreSourcePath) => path.join(source, $ignoreSourcePath)
        ),
        this.settings.ignore.map(
          ($ignoreRoutePath) => path.join(source, $ignoreRoutePath)
        )
      )
      const watcher = watch(watchSource, {
        ignored: ignoreSource,
        ignoreInitial: false,
        awaitWriteFinish: true,
      })
      watcher.on('add', ($path, $stats) => {
        Pilers.SimulePiler($document, this.settings, $path)
      })
      watcher.on('change', ($path, $stats) => {
        Pilers.SimulePiler($document, this.settings, $path)
      })
      this.#simules.push(watcher)
    }
    return this.#simules
  }
  get structs() {
    if(this.#structs !== undefined) return this.#structs
    const { documents, source, target } = this.settings
    const structs = []
    for(const $document of documents.structs) {
      const watchSource = $document.watch.map(
        ($watchSourcePath) => path.join(source, $watchSourcePath)
      )
      const ignoreSource = Array.prototype.concat(
        $document.ignore.map(
          ($ignoreSourcePath) => path.join(source, $ignoreSourcePath)
        ),
        this.settings.ignore.map(
          ($ignoreRoutePath) => path.join(source, $ignoreRoutePath)
        )
      )
      const watcher = watch(watchSource, {
        ignored: ignoreSource,
        ignoreInitial: false,
        awaitWriteFinish: true,
      })
      watcher.on('add', ($path, $stats) => {
        Pilers.EJSPiler($document, this.settings, $path)
      })
      watcher.on('change', ($path, $stats) => {
        Pilers.EJSPiler($document, this.settings, $path)
      })
      structs.push(watcher)
    }
    this.#structs = structs
    return this.#structs
  }
  get styles() {
    if(this.#styles !== undefined) return this.#styles
    const { documents, source, target } = this.settings
    this.#styles = []
    for(const $document of this.settings.documents.styles) {
      const watchSource = $document.watch.map(
        ($watchSourcePath) => path.join(source, $watchSourcePath)
      )
      const ignoreSource = Array.prototype.concat(
        $document.ignore.map(
          ($ignoreSourcePath) => path.join(source, $ignoreSourcePath)
        ),
        this.settings.ignore.map(
          ($ignoreRoutePath) => path.join(source, $ignoreRoutePath)
        )
      )
      const watcher = watch(watchSource, {
        ignored: ignoreSource,
        ignoreInitial: false,
        awaitWriteFinish: true,
      })
      watcher.on('add', ($path, $stats) => {
        Pilers.SASSPiler($document, this.settings, $path)
      })
      watcher.on('change', ($path, $stats) => {
        Pilers.SASSPiler($document, this.settings, $path)
      })
      this.#styles.push(watcher)
    }
    return this.#styles
  }
}