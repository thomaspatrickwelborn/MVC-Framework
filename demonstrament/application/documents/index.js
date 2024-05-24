import path from 'node:path'
import express from 'express'
import Routes from './routes/index.js'
import livereload from "livereload"
import connectLiveReload from "connect-livereload"
async function Documents($settings = {}) {
  const liveReloadServer = livereload.createServer()
  liveReloadServer.watch([
    path.join(process.env.PWD, 'localhost/tests'),
    path.join(process.env.PWD, 'temporary/mvc-framework'),
  ])
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/")
    }, 100)
  })
  const { documents } = $settings
  const routes = await Routes({ documents })
  // Static Local Host Directory
  routes.use(connectLiveReload())
  routes.use(express.static('localhost'))
  // Static Temporary Directory (Hosts MVC Framework)
  routes.use(express.static('temporary'))
  return routes
}

export default Documents