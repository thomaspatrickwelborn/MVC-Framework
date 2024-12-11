import View from '../view/index.js'
import Template from './$template.js'
// 
export default class PandTree extends View {
  constructor($settings) {
    super({
      // templates
      querySelectors: {
        pandTree: ':scope > .pand-tree',
        id: ':scope > .pand-tree > id',
        name: ':scope > .pand-tree > name',
      },
      events: {
        'id click': function idClick() {}
      },
    })
  } 
}