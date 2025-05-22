import { recursiveAssign } from 'recourse'
export default ($settings) => recursiveAssign({
  scope: 'template', // 'parent',
  templates: {},
  querySelectors: {},
}, $settings)