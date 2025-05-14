export default ($settings) => {
  return Object.assign({
    models: {},
    views: {},
    controls: {},
    fetchRouters: {},
    locationRouters: {},
  }, $settings)
}
