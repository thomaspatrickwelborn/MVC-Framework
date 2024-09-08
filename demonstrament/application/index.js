import './coutil/persist/index.js'
import path from 'node:path'
import chokidar from 'chokidar'
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
    this.browserSync
    this.watchers
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
    for(const $route of routes) {
      this.#_server.use(
        $route.url, ($request, $response) => {
          console.log(path.join($route.target, $route.url, $route.main))
          $response.sendFile(
            path.join(
              $route.target, $route.url, $route.main
            ),
            {
              root: path.join(
                process.env.PWD
              )
            }
          )
        }
      )
    }
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
      styles: [],
      structs: [],
    }
    iterateRoutes: 
    for(const $route of routes) {
      iterateRouteDocuments: 
      for(const $routeDocument of $route.documents) {
        iterateRouteDocumentGroupNames: 
        for(const $routeDocumentGroupName of ['styles', 'scripts', 'structs']) {
          const routeDocumentGroup = $routeDocument[$routeDocumentGroupName]
          iterateRouteDocumentGroupFiles: 
          for(const $routeDocumentGroupFile of routeDocumentGroup) {
            iterateRouteDocumentGroupFilePaths: 
            for(const $pathType of ['input', 'output', 'watch', 'template']) {
              if($routeDocumentGroupFile[$pathType] !== undefined) {
                switch($pathType) {
                  case 'input':
                  case 'watch':
                  case 'template':
                    $routeDocumentGroupFile[$pathType] = path.join(
                      process.env.PWD, $route.source, $routeDocumentGroupFile[$pathType]
                    )
                    break
                  case 'output':
                    $routeDocumentGroupFile[$pathType] = path.join(
                      process.env.PWD, $route.target, $routeDocumentGroupFile[$pathType]
                    )
                    break
                }
              }
            }
            const watcher = chokidar.watch($routeDocumentGroupFile.watch)
            switchRouteDocumentGroupName: 
            switch($routeDocumentGroupName) {
              case 'styles':
                watcher.on('add', ($path) => {
                  Pilers.SASSPiler($routeDocumentGroupFile)
                })
                watcher.on('change', ($path) => {
                  Pilers.SASSPiler($routeDocumentGroupFile)
                })
                break
              case 'scripts':
                watcher.on('add', ($path) => {
                  Pilers.RollupPiler($routeDocumentGroupFile)
                })
                watcher.on('change', ($path) => {
                  Pilers.RollupPiler($routeDocumentGroupFile)
                })
                break
              case 'structs':
                watcher.on('add', ($path) => {
                  Pilers.EJSPiler($routeDocumentGroupFile)
                })
                watcher.on('change', ($path) => {
                  Pilers.EJSPiler($routeDocumentGroupFile)
                })
                break
            }
            this.#_watchers[$routeDocumentGroupName].push(watcher)
          }
        }
      }
    }
    return this.#_watchers
  }
}