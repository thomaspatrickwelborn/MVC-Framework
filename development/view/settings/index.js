export default (...$settings) => Object.assign({
  parentElement: undefined, // HTML Element
  scope: 'template', // 'parent',
  templates: { default: () => `` },
  querySelectors: {},
}, ...$settings)