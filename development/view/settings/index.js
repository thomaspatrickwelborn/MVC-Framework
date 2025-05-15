import { recursiveAssign } from '../../coutil/index.js'
export default ($settings) => recursiveAssign({
  scope: 'template', // 'parent',
  templates: {},
  querySelectors: {},
}, $settings)