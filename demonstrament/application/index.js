import path from 'node:path'
import mongoose from 'mongoose'
import express from 'express'
import DocumentRoutes from './documents/index.js'
import DatabaseRoutes from './database/index.js'
import livereload from "livereload"
import connectLiveReload from "connect-livereload"
async function Application($settings = {}) {
	const { documents, database } = $settings
	const documentRoutes = await DocumentRoutes({ documents })
	const databaseRoutes = await DatabaseRoutes({ database })
	const application = express()
	const liveReloadServer = livereload.createServer({
		wait: 0,
	})
	liveReloadServer.server.once("connection", () => {
	  setTimeout(() => {
	    liveReloadServer.refresh("/")
	  }, 100)
	})
  liveReloadServer.watch([
    path.join(process.env.PWD, 'localhost/tests'),
    path.join(process.env.PWD, 'temporary/mvc-framework'),
    path.join(process.env.PWD, 'application'),
  ])
	application.use(databaseRoutes)
	application.use(documentRoutes)
  application.use(connectLiveReload())
	application.listen(3000, () => {
		console.log('Listen To The Sound Of Silence')
	})
	return application
}

export default Application