import path from 'node:path'
import express from 'express'
import Routes from './routes/index.js'
async function Documents($settings = {}) {
  const { documents } = $settings
  const routes = await Routes({ documents })
  // Static Local Host Directory
  routes.use(express.static('localhost'))
  // Static Temporary Directory (Hosts MVC Framework)
  routes.use(express.static('temporary'))
  return routes
}

export default Documents