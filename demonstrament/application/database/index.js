import express from 'express'
import mongoose from 'mongoose'
import Routes from './routes/index.js'

async function Database($settings = {}) {
  const { database } = $settings
  const databaseConnection = await mongoose.createConnection(
    'mongodb://127.0.0.1:27017/mvc-framework-test-server'
  )
  const routes = await Routes({ database, databaseConnection })
  return routes
}

export default Database