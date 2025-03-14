export default (...$settings) => Object.assign({
  schema: undefined, // Schema Settings
  content: undefined, // Content Settings
}, ...$settings)