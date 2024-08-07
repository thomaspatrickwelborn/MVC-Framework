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
  // HTTPS Server
  const httpsServerConfig = {
    key: await fs.readFile(
      '/home/thomaspatrickwelborn/.certificates/demonstrament.mvc-framework.key',
    ),
    cert: await fs.readFile(
      '/home/thomaspatrickwelborn/.certificates/demonstrament.mvc-framework.crt',
    ),
  }
  // const browserSyncServerConfig = {
  //   key:  //await fs.readFile(
  //     '/home/thomaspatrickwelborn/.certificates/demonstrament.mvc-framework.key',
  //   // ),
  //   cert:  //await fs.readFile(
  //     '/home/thomaspatrickwelborn/.certificates/demonstrament.mvc-framework.crt',
  //   // ),
  // }
  const httpsServer =  await https.createServer(
    httpsServerConfig,
    application
  )
  const browserSyncServerOptions = {
    // port: 3335,
    // host: 'demonstrament.mvc-framework',
    // proxy: true,
    ui: false,
    // https: httpsServerConfig,
    // https: true,
    https: httpsServer,
  }
  const browserSyncServer = browserSync.create()
  browserSyncServer.init(browserSyncServerOptions)
  httpsServer.listen(
    3335,
    function httpsServerListen(){
      console.log('Listen To The Sound Of Silence')
    }
  )
  return application
}

export default Application