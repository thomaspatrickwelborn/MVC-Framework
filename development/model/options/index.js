export default (...$options) => Object.assign({
  schema: undefined, // Schema Options
  content: undefined, // Content Options
  enableEvents: true, // Boolean
  autoload: false, // Boolean
  autosave: false, // Boolean
  changeEvents: true, // Boolean
}, ...$options)