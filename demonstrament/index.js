import Application from './application/index.js'
import ApplicationConfig from './application.config/index.js'
const application = await new Promise(($resolve, $reject) => {
  const _application = new Application(ApplicationConfig)
  _application.on('ready', $resolve(_application))
})
