export default (...$options) => {
  const options = Object.assign({}, ...$options)
  return options
}