import './coutil/persist/index.js'
import path from 'node:path'
import watch from 'glob-watcher'
import inspector from 'node:inspector'
import https from 'node:https'
import express from 'express'
import browserSync from 'browser-sync'
import * as Pilers from './pilers/index.js'
import routes from './routes.js'
import Settings from './settings.js'
export default class Demonstrament extends EventTarget {
  #settings
  #_inspector
  #_server
  #_https
  #_browserSync
  #_watchers
  constructor() {
    super()
    this.#settings = Settings
    this.inspector
    this.server
    this.https
    this.watchers
    this.browserSync
  }
  // Node Inspector
  get inspector() {
    if(this.#_inspector !== undefined) {
      return this.#_inspector
    }
    this.#_inspector = inspector.open(
      this.#settings.inspector.port,
      this.#settings.inspector.host
    )
    return this.#_inspector
  }
  // Express
  get server() {
    if(this.#_server !== undefined) return this.#_server
    this.#_server = express()
    const router = {}
    for(const $static of this.#settings.express.static) {
      this.#_server.use(
        express.static($static)
      )
    }
    return this.#_server
  }
  // Node HTTPS Server
  get https() {
    if(this.#_https !== undefined) {
      return this.#_https
    }
    this.#_https = https.createServer(
      {
        key: this.#settings.https.key,
        cert: this.#settings.https.cert,
      },
      this.server
    )
    this.#_https.listen(
      this.#settings.https.port, 
      this.#settings.https.host,
      ($request, $response) => {
        // 
      } 
    )
    return this.#_https
  }
  // BrowserSync
  get browserSync() {
    if(this.#_browserSync !== undefined) {
      return this.#_browserSync
    }
    const browserSyncServerOptions = {
      ui: false, 
      open: false, 
      https: this.#settings.browserSync.https,
      host: this.#settings.browserSync.host,
      port: this.#settings.browserSync.port,
      files: this.#settings.browserSync.files,
      proxy: {
        target: [
          "https://",
          this.#settings.https.host, ":",
          this.#settings.https.port,
        ].join(''),
        ws: false,
      },
    }
    this.#_browserSync = browserSync.create()
    this.#_browserSync.init(browserSyncServerOptions)
    this.dispatchEvent(new CustomEvent('ready', { detail: this }))
    return this.#_browserSync
  }
  get watchers() {
    if(this.#_watchers !== undefined) {
      return this.#_watchers
    }
    this.#_watchers = {
      scripts: [],
      simules: [],
      structs: [],
      styles: [],
    }
    const sources = []
    for(const $route of routes) {
      for(const $routeDocument of $route.documents) {
        for(const [
          $routeDocumentFileType, $routeDocumentGroupFiles
        ] of Object.entries($routeDocument)) {
          for(const $routeDocumentGroupFile of $routeDocumentGroupFiles) {
            for(const [
              $routeDocumentGroupFilePathType, $routeDocumentGroupFilePath
            ] of Object.entries($routeDocumentGroupFile)) {
              switchRouteDocumentGroupFilePathType: 
              switch($routeDocumentGroupFilePathType) {
                // Watch File Path
                case 'watch':
                  // Watch File Path Is String
                  if(typeof $routeDocumentGroupFilePath === 'string') {
                    $routeDocumentGroupFile[$routeDocumentGroupFilePath] = path.join(
                      $route.source, $routeDocumentGroupFilePath
                    )
                  }
                  // Watch File Path Is Array
                  else if(Array.isArray($routeDocumentGroupFilePath)) {
                    for(let [
                      $watchPathIndex, $watchPath
                    ] of Object.entries($routeDocumentGroupFilePath)) {
                      let watchPath
                      if($watchPath.charAt(0) === '!') {
                        watchPath = '!'.concat(
                          path.join(
                            $route.source, $watchPath.replace(new RegExp(/^\!/), '')
                          )
                        )
                      } else {
                        watchPath = path.join(
                          $route.source, $watchPath
                        )
                      }
                      $routeDocumentGroupFilePath[$watchPathIndex] = watchPath
                    }
                  }
                  const watcher = watch($routeDocumentGroupFilePath, {
                    ignoreInitial: false,
                  })
                  switchRouteDocumentFileType: 
                  switch($routeDocumentFileType) {
                    case 'scripts':
                      watcher.on('add', ($path, $stats) => {
                        // console.log('RollupPiler', 'add', $path, $stats)
                        Pilers.RollupPiler($routeDocumentGroupFile)
                      })
                      watcher.on('change', ($path, $stats) => {
                        // console.log('RollupPiler', 'change', $path, $stats)
                        Pilers.RollupPiler($routeDocumentGroupFile)
                      })
                      break switchRouteDocumentFileType
                    case 'simules':
                      watcher.on('add', ($path, $stats) => {
                        // console.log('SimulePiler', 'add', $routeDocumentGroupFile)
                        Pilers.SimulePiler($routeDocumentGroupFile, $route, $path)
                      })
                      watcher.on('change', ($path, $stats) => {
                        // console.log('SimulePiler', 'change', $routeDocumentGroupFile)
                        Pilers.SimulePiler($routeDocumentGroupFile, $route, $path)
                      })
                      break switchRouteDocumentFileType
                    case 'structs':
                      watcher.on('add', ($path, $stats) => {
                        // console.log('EJSPiler', 'add', $path, $stats)
                        Pilers.EJSPiler($routeDocumentGroupFile)
                      })
                      watcher.on('change', ($path, $stats) => {
                        // console.log('EJSPiler', 'change', $path, $stats)
                        Pilers.EJSPiler($routeDocumentGroupFile)
                      })
                      break switchRouteDocumentFileType
                    case 'styles':
                      watcher.on('add', ($path, $stats) => {
                        console.log('SASSPiler', 'add', $path, $stats)
                        Pilers.SASSPiler($routeDocumentGroupFile)
                      })
                      watcher.on('change', ($path, $stats) => {
                        console.log('SASSPiler', 'change', $path, $stats)
                        Pilers.SASSPiler($routeDocumentGroupFile)
                      })
                      break switchRouteDocumentFileType
                  }
                  this.#_watchers[$routeDocumentFileType].push(watcher)
                  break switchRouteDocumentGroupFilePathType
                // Output File Path
                case 'output':
                  // Output File Path Is String
                  if(typeof $routeDocumentGroupFilePath === 'string') {
                    $routeDocumentGroupFile[$routeDocumentGroupFilePathType] = path.join(
                      $route.target, $routeDocumentGroupFilePath
                    )
                  }
                  // Output File Path Is Array
                  else if(Array.isArray($routeDocumentGroupFilePath)) {
                    for(let [
                      $outputPathIndex, $outputPath
                    ] of Object.entries($routeDocumentGroupFilePath)) {
                      $routeDocumentGroupFilePath[$outputPathIndex] = path.join(
                        $route.target, $outputPath
                      )
                    }
                  }
                  break switchRouteDocumentGroupFilePathType
                // Input File Path
                case 'input': 
                  // Input File Path Is String
                  if(typeof $routeDocumentGroupFilePath === 'string') {
                    $routeDocumentGroupFile[$routeDocumentGroupFilePathType] = path.join(
                      $route.source, $routeDocumentGroupFilePath
                    )
                  }
                  // Input File Path Is Array
                  else if(Array.isArray($routeDocumentGroupFilePath)) {
                    for(let [
                      $inputPathIndex, $inputPath
                    ] of Object.entries($routeDocumentGroupFilePath)) {
                      $routeDocumentGroupFilePath[$inputPathIndex] = path.join(
                        $route.source, $inputPath
                      )
                    }
                  }
                  break switchRouteDocumentGroupFilePathType
                // Template File Path
                case 'template':
                  $routeDocumentGroupFile[$routeDocumentGroupFilePathType] = path.join(
                    $route.source, $routeDocumentGroupFilePath
                  )
                  break switchRouteDocumentGroupFilePathType
              }
            }
          }
        }
      }
    }
    return this.#_watchers
  }
}