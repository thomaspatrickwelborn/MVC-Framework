import { ServerRouter } from '/mvc-framework/index.js'

function DOMContentLoaded() {
  console.log('ServerRouter', ServerRouter)
}

document.addEventListener(
  'DOMContentLoaded', DOMContentLoaded
)