export default (...$settings) => { Object.assign({
  models: {},
  views: {},
  controls: {},
  fetchRouters: {},
  locationRouters: {},
}, ...$settings) }
