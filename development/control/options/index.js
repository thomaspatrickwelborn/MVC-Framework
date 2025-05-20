export default ($options) => {
  const options = Object.assign({
    events: false,
    enableEvents: true,
  }, $options)
  return options
}