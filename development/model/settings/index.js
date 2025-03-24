export default (...$settings) => Object.assign({
  schema: undefined, // Schema Settings
  content: undefined, // Content Settings
  localStorage: false, // Boolean, String,
}, ...$settings)