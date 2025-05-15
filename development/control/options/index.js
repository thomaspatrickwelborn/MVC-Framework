export default ($options) => {
  const options = Object.assign({
    events: false,
    enableEvents: false,
  }, $options)
  return options
}