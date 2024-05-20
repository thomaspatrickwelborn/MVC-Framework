import mongoose from 'mongoose'
import express from 'express'
import DocumentRoutes from './documents/index.js'
import DatabaseRoutes from './database/index.js'

async function Application($settings = {}) {
	const { documents, database } = $settings
	const documentRoutes = await DocumentRoutes({ documents })
	const databaseRoutes = await DatabaseRoutes({ database })
	const application = express()
	application.use(documentRoutes)
	application.use(databaseRoutes)
	application.listen(3000, () => {
		console.log('Listen To The Sound Of Silence')
	})
	return application
}

export default Application