import express from 'express'
import mongoose from 'mongoose'
import Routes from './routes/index.js'
// import Schemata from './schemata/index.js'

function Database($settings = {}) {
  const { database } = $settings
  const databaseConnection = mongoose.createConnection(
    'mongodb://127.0.0.1:27017'
  )
  const routes = Routes({ database, databaseConnection })
  const router = express.Router({})
  router.use(routes)
  return router
}

export default Database