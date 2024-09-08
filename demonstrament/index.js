import Application from './application/index.js'

const application = await new Promise(($resolve, $reject) => {
  const _application = new Application()
  _application.on('ready', $resolve(_application))
})
