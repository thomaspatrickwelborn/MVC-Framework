import { Control } from '/dependencies/mvc-framework.js'
import ApplicationParameters from './application/index.js'
document.addEventListener('DOMContentLoaded', ($event) => {
  const application = new Control(...ApplicationParameters)
}, { once: true })