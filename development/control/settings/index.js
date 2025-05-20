export default ($settings) => {
  const settings = Object.assign({
    models: {},
    views: {},
    controls: {},
    fetchRouters: {},
    locationRouters: {},
  }, $settings)
  return settings
}
