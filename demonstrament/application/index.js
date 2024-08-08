import fs from 'node:fs/promises'
import https from 'node:https'
import path from 'node:path'
import mongoose from 'mongoose'
import browserSync from 'browser-sync'
import express from 'express'
import DocumentRoutes from './documents/index.js'
async function Application($settings = {}) {
  const { documents, database } = $settings
  const documentRoutes = await DocumentRoutes({ documents })
  const application = express()
  application.use(documentRoutes)
  application.use(
    express.static(
      path.join(process.env.PWD, 'static')
    )
  )
  // HTTPS Server
  const httpsServerConfig = {
    key: await fs.readFile(
      '/home/thomaspatrickwelborn/.certificates/demonstrament.mvc-framework.key',
    ),
    cert: await fs.readFile(
      '/home/thomaspatrickwelborn/.certificates/demonstrament.mvc-framework.crt',
    ),
  }
  const httpsServer =  await https.createServer(
    httpsServerConfig,
    application
  )
  // BrowserSync Server
  fs.cp(
    path.join(process.env.PWD, 'node_modules/browser-sync-client/dist/index.js'),
    path.join(process.env.PWD, 'static/dependencies/browser-sync-client.js'), 
    {
      errorOnExist: false,
      force: true,
      recursive: false,
    }
  )
  console.log(
    path.join(process.env.PWD, 'localhost/**/*'),
    path.join(process.env.PWD, 'dependencies/**/*'),
  )
  const browserSyncServerOptions = {
    ui: false,
    open: false, 
    https: {
      key: '/home/thomaspatrickwelborn/.certificates/demonstrament.mvc-framework.key',
      cert: '/home/thomaspatrickwelborn/.certificates/demonstrament.mvc-framework.crt',
    },
    host: 'demonstrament.mvc-framework',
    port: 3336,
    // proxy: {
    //   target: [
    //     'https://demonstrament.mvc-framework:3335', 
    //     'dependencies/browser-sync-client.js'
    //   ].join('/'),
    //   // ws: false,
    // },
    proxy: [
      'https://demonstrament.mvc-framework:3335', 
      'dependencies/browser-sync-client.js'
    ].join('/'),
    // scriptPath: function ($path, port, $options) {
    //   return [
    //     'https://demonstrament.mvc-framework:3335', 
    //     'dependencies/browser-sync-client.js'
    //   ].join('/')
    // },
    // script: {
    //   domain: 'https://demonstrament.mvc-framework:3335'
    // },
    files: [
      path.join(process.env.PWD, 'localhost/**/*'),
      path.join(process.env.PWD, 'static/dependencies/**/*'),
    ],
  }
  const browserSyncServer = browserSync.create()
  browserSyncServer.init(browserSyncServerOptions)
  // Server Listen
  httpsServer.listen(
    3335,
    function httpsServerListen(){
      console.log('Listen To The Sound Of Silence')
    }
  )
  return application
}

export default Application