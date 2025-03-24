export default (...$options) => Object.assign({
  enableEvents: true,
  enableQuerySelectors: true,
  // propertyDirectory: {}
}, ...$options)
