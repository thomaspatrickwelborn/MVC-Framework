import express from 'express'
import Routes from './routes/index.js'

async function Documents($settings = {}) {
  const { documents } = $settings
  return await Routes({ documents })
}

export default Documents