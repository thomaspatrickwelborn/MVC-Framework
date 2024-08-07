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
  httpsServer.listen(
    3335,
    function httpsServerListen(){
      console.log('Listen To The Sound Of Silence')
    }
  )
  // BrowserSync Server
  fs.cp(
    path.join(process.env.PWD, 'node_modules/browser-sync-client/index.js'),
    path.join(process.env.PWD, 'static/dependencies/browser-sync-client.js'), 
    {
      errorOnExist: false,
      force: false,
      recursive: false,
    }
  )
  const browserSyncServerOptions = {
    ui: false,
    https: httpsServer,
    files: [
      path.join(process.env.PWD, 'localhost/**/*')
    ]
  }
  const browserSyncServer = browserSync.create()
  browserSyncServer.init(browserSyncServerOptions)
  return application
}

export default Application