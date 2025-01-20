import * as Paths from './paths/index.js'
import * as Pilers from '../../pilers/index.js'
import path from 'node:path'
import { rm, mkdir, readFile } from 'node:fs'
import { globSync } from 'glob'
import watch from 'glob-watcher'
export default class Section extends EventTarget {
  #settings
  #_scripts
  #_simules
  #_structs
  #_styles
  constructor($settings) {
    super()
    this.#settings = $settings
    console.log(this.#settings)
    // this.#clear()
    // .then(() => {
    //   this.structs
    //   this.styles
    //   this.scripts
    //   this.simules
    // })
  }
  #clear() {
    const { source, target } = this.#settings
    const clear = []
    const clearSource = this.#settings.clear.source
    const clearTarget = this.#settings.clear.target
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
    if(this.#_scripts !== undefined) return this.#_scripts
    const { documents, source, target } = this.#settings
    this.#_scripts = []
    for(const $document of this.#settings.documents.scripts) {
      const watchSource = $document.watch.map(
        ($watchSourcePath) => path.join(source, $watchSourcePath)
      )
      const ignoreSource = Array.prototype.concat(
        $document.ignore.map(
          ($ignoreSourcePath) => path.join(source, $ignoreSourcePath)
        ),
        this.#settings.ignore.map(
          ($ignoreRoutePath) => path.join(source, $ignoreRoutePath)
        )
      )
      const watcher = watch(watchSource, {
        ignored: ignoreSource,
        ignoreInitial: false,
        awaitWriteFinish: true,
      })
      watcher.on('add', ($path, $stats) => {
        Pilers.RollupPiler($document, this.#settings, $path)
      })
      watcher.on('change', ($path, $stats) => {
        Pilers.RollupPiler($document, this.#settings, $path)
      })
      this.#_scripts.push(watcher)
    }
    return this.#_scripts
  }
  get simules() {
    if(this.#_simules !== undefined) return this.#_simules
    const { documents, source, target } = this.#settings
    this.#_simules = []
    for(const $document of documents.simules) {
      const watchSource = $document.watch.map(
        ($watchSourcePath) => path.join(source, $watchSourcePath)
      )
      const ignoreSource = Array.prototype.concat(
        $document.ignore.map(
          ($ignoreSourcePath) => path.join(source, $ignoreSourcePath)
        ),
        this.#settings.ignore.map(
          ($ignoreRoutePath) => path.join(source, $ignoreRoutePath)
        )
      )
      const watcher = watch(watchSource, {
        ignored: ignoreSource,
        ignoreInitial: false,
        awaitWriteFinish: true,
      })
      watcher.on('add', ($path, $stats) => {
        Pilers.SimulePiler($document, this.#settings, $path)
      })
      watcher.on('change', ($path, $stats) => {
        Pilers.SimulePiler($document, this.#settings, $path)
      })
      this.#_simules.push(watcher)
    }
    return this.#_simules
  }
  get structs() {
    if(this.#_structs !== undefined) return this.#_structs
    const { documents, source, target } = this.#settings
    const structs = []
    for(const $document of documents.structs) {
      const watchSource = $document.watch.map(
        ($watchSourcePath) => path.join(source, $watchSourcePath)
      )
      const ignoreSource = Array.prototype.concat(
        $document.ignore.map(
          ($ignoreSourcePath) => path.join(source, $ignoreSourcePath)
        ),
        this.#settings.ignore.map(
          ($ignoreRoutePath) => path.join(source, $ignoreRoutePath)
        )
      )
      const watcher = watch(watchSource, {
        ignored: ignoreSource,
        ignoreInitial: false,
        awaitWriteFinish: true,
      })
      watcher.on('add', ($path, $stats) => {
        Pilers.EJSPiler($document, this.#settings, $path)
      })
      watcher.on('change', ($path, $stats) => {
        Pilers.EJSPiler($document, this.#settings, $path)
      })
      structs.push(watcher)
    }
    this.#_structs = structs
    return this.#_structs
  }
  get styles() {
    if(this.#_styles !== undefined) return this.#_styles
    const { documents, source, target } = this.#settings
    this.#_styles = []
    for(const $document of this.#settings.documents.styles) {
      const watchSource = $document.watch.map(
        ($watchSourcePath) => path.join(source, $watchSourcePath)
      )
      const ignoreSource = Array.prototype.concat(
        $document.ignore.map(
          ($ignoreSourcePath) => path.join(source, $ignoreSourcePath)
        ),
        this.#settings.ignore.map(
          ($ignoreRoutePath) => path.join(source, $ignoreRoutePath)
        )
      )
      const watcher = watch(watchSource, {
        ignored: ignoreSource,
        ignoreInitial: false,
        awaitWriteFinish: true,
      })
      watcher.on('add', ($path, $stats) => {
        Pilers.SASSPiler($document, this.#settings, $path)
      })
      watcher.on('change', ($path, $stats) => {
        Pilers.SASSPiler($document, this.#settings, $path)
      })
      this.#_styles.push(watcher)
    }
    return this.#_styles
  }
}