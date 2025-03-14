export default (...$settings) => { console.log(...$settings); Object.assign({
  models: {},
  views: {},
  controls: {},
  fetchRouters: {},
  locationRouters: {},
}, ...$settings) }
