import Application from './application/index.js'

function DOMContentLoaded() {
  // Photos Editor
  const application = new Application().start()
}
document.addEventListener(
  'DOMContentLoaded', DOMContentLoaded
)
