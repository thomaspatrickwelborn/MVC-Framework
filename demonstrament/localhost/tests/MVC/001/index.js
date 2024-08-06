import App from './app/index.js'
function DOMContentLoaded() {
  const app = new App()
  app.start()
}

document.addEventListener(
  'DOMContentLoaded', DOMContentLoaded
)