export default (...$options) => Object.assign({
  enableEvents: true,
  enableQuerySelectors: true,
  propertyDirectory: {
    maxDepth: 3,
  }
}, ...$options)
