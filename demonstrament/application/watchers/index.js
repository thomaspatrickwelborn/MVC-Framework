import * as Paths from './paths/index.js'
import * as Pilers from '../pilers/index.js'
import path from 'node:path'
import { rm, mkdir } from 'node:fs'
import { globSync } from 'glob'
import watch from 'glob-watcher'
export default class Watchers extends EventTarget {
  #_settings
  #_scripts
  #_simules
  #_structs
  #_styles
  constructor($settings) {
    super()
    this.#settings = $settings
    this.#clear()
    .then(() => {
      this.structs
      this.styles
      this.scripts
      this.simules
    })
  }
  get #settings() { return this.#_settings }
  set #settings($settings) {
    this.#_settings = $settings
    for(const $route of this.#_settings) {
      // Ignore
      for(const [
        $ignorePathIndex, $ignorePath
      ] of Object.entries($route.ignore)) {
        $route.ignore[$ignorePathIndex] = path.join(
          '!'.concat($route.source), $ignorePath.replace(/^\!/, '')
        )
      }
      // Clear Target
      for(const [
        $clearTargetIndex, $clearTarget
      ] of Object.entries($route.clear.target)) {
        if($clearTarget.charAt(0) === '!') {
          $route.clear.target[$clearTargetIndex] = path.join(
            '!'.concat($route.target), $clearTarget.replace(/^\!/, '')
          )
        } else {
          $route.clear.target[$clearTargetIndex] = path.join(
            $route.target, $clearTarget
          )
        }
        $route.clear.target.unshift(...$route.ignore)
      }
      // Clear Source
      for(const [
        $clearSourceIndex, $clearSource
      ] of Object.entries($route.clear.source)) {
        if($clearSource.charAt(0) === '!') {
          $route.clear.target[$clearSourceIndex] = path.join(
            '!'.concat($route.source.replace), $clearSource.replace(/^\!/, '')
          )
        } else {
          $route.clear.target[$clearSourceIndex] = path.join(
            $route.source, $clearSource
          )
        }
      }
      // Documents
      for(const [
        $documentGroupType, $documentGroup
      ] of Object.entries($route.documents)) {
        for(const $document of $documentGroup) {
          for(const [
            $documentPathType, $documentPath
          ] of Object.entries($document)) {
            const pathArguments = [$route, $document, $documentPath, $documentPathType]
            if($documentPathType === 'watch') { Paths.watchPath(...pathArguments) }
            else if($documentPathType === 'output') { Paths.outputPath(...pathArguments) }
            else if($documentPathType === 'input') { Paths.inputPath(...pathArguments) }
            else if($documentPathType === 'model') { Paths.modelPath(...pathArguments) }
          }
        }
      }
    }
  }
  #clear() {
    const clear = []
    for(const $route of this.#settings) {
      const paths = globSync(Array.prototype.concat(
        $route.clear.target,
        $route.clear.source,
      ))
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
          })
        )
      }
    }
    return Promise.all(clear)
  }
  get scripts() {
    if(this.#_scripts !== undefined) return this.#_scripts
    this.#_scripts = []
    for(const $route of this.#settings) {
      for(const $document of $route.documents.scripts) {
        const watcher = watch($document.watch, {
          // ignore: this.#settings.ignore,
          ignoreInitial: false,
          awaitWriteFinish: true,
        })
        watcher.on('add', ($path, $stats) => {
          Pilers.RollupPiler($document)
        })
        watcher.on('change', ($path, $stats) => {
          Pilers.RollupPiler($document)
        })
        this.#_scripts.push(watcher)
      }
    }
    return this.#_scripts
  }
  get simules() {
    if(this.#_simules !== undefined) return this.#_simules
    this.#_simules = []
    for(const $route of this.#settings) {
      for(const $document of $route.documents.simules) {
        const watcher = watch($document.watch, {
          // ignore: this.#settings.ignore,
          ignoreInitial: false,
          awaitWriteFinish: true,
        })
        watcher.on('add', ($path, $stats) => {
          Pilers.SimulePiler($document, $route, $path)
        })
        watcher.on('change', ($path, $stats) => {
          Pilers.SimulePiler($document, $route, $path)
        })
        this.#_simules.push(watcher)
      }
    }
    return this.#_simules
  }
  get structs() {
    if(this.#_structs !== undefined) return this.#_structs
    this.#_structs = []
    for(const $route of this.#settings) {
      for(const $document of $route.documents.structs) {
        const watcher = watch($document.watch, {
          // ignore: this.#settings.ignore,
          ignoreInitial: false,
          awaitWriteFinish: true,
        })
        watcher.on('add', ($path, $stats) => {
          Pilers.EJSPiler($document, $route, $path)
        })
        watcher.on('change', ($path, $stats) => {
          Pilers.EJSPiler($document, $route, $path)
        })
        this.#_structs.push(watcher)
      }
    }
    return this.#_structs
  }
  get styles() {
    if(this.#_styles !== undefined) return this.#_styles
    this.#_styles = []
    for(const $route of this.#settings) {
      for(const $document of $route.documents.styles) {
        const watcher = watch($document.watch, {
          // ignore: this.#settings.ignore,
          ignoreInitial: false,
          awaitWriteFinish: true,
        })
        watcher.on('add', ($path, $stats) => {
          Pilers.SASSPiler($document)
        })
        watcher.on('change', ($path, $stats) => {
          Pilers.SASSPiler($document)
        })
        this.#_styles.push(watcher)
      }
    }
    return this.#_styles
  }
}