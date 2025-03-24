import { recursiveAssign } from '../../coutil/index.js'
export default (...$settings) => recursiveAssign({
  // parentElement: undefined, // HTML Element
  scope: 'template', // 'parent',
  templates: {},
  querySelectors: {},
}, ...$settings)