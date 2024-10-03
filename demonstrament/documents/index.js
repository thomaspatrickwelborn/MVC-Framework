import { Control, Model, Schema } from '/dependencies/mvc-framework.js'

let { schema, content } = new Model({
  schema: new Schema([{
    type: {
      aaa: { type: Number },
    },
  }], { validationType: 'object' }),
  content: [],
  events: {
    'content concatValue': ($event) => { console.log($event.type, $event.detail) }
  },
})

let _content
_content = content.concat([{ aaa: 111 }, { aaa: 222 }, { aaa: 333 }])
_content = content.concat([{ aaa: 444 }, { aaa: 555 }, { aaa: 666 }])
_content = content.concat({ aaa: "666" }, { aaa: "777" }, { aaa: "888" })
console.log('_content', _content)
console.log('content', content)

/*
const { schema, content } = new Model({
  schema: new Schema([{
    type: {
      aaa: { type: Number },
    },
  }], { validationType: 'property' }),
  content: [],
})
content.length = 5
content.fill({ aaa: 111 }, 0, 5)
content.splice(2, 1, { aaa: 111111 })
console.log(content)
/*
// content.push({
//   aaa: 111
// })
// content.push({
//   aaa: "111"
// })
/*
const { schema, content } = new Model({
  schema: new Schema([{
    type: {
      aaa: { type: Number },
    },
  }], { validationType: 'property' })
  context: [],
})
content.length = 5
content.fill({
  aaa: 111
}, 0, 5)
content.length = 10
content.fill({
  aaa: "111"
})
console.log(content)
*/
/*
const { schema, content } = new Model({
  schema: new Schema([{
    type: {
      aaa: { type: String }
    }
  }], { validationType: 'object' }),
  content: [],
})
content.unshift({
  aaa: "AAA",
})
content.unshift({
  aaa: 111,
})
content.unshift({
  aaa: "111",
})
console.log('schema', schema)
console.log('content', content)
*/
/*
const { schema, content } = new Model({
  schema: new Schema({
    aaa: { type: {
      bbb: { type: String },
      ccc: { type: Number },
      ddd: { type: Boolean },
    } },
    eee: { type: String },
    fff: { type: Number },
    ggg: { type: Boolean },
  }),
  content: {},
})

content.defineProperty('aaa', {
  value: {
    bbb: { value: "BBB" },
    ccc: { value: 333 },
    ddd: { value: false },
  },
})

content.defineProperty('aaa', {
  value: {
    bbb: { value: "BBB" },
    ccc: { value: 333 },
    ddd: { value: false },
  },
})

console.log(content)
console.log(content.parse())
*/


// const { schema, content } = new Model({
//   schema: new Schema({
//     aaa: { type: String },
//     bbb: { type: Number },
//     ccc: { type: Boolean },
//   }, { validationType: 'object' }),
//   content: {},
// })
// content.defineProperties({
//   aaa: { value: "AAA" },
//   bbb: { value: 222 },
//   ccc: { value: false },
// })

// console.log(content.parse())
// console.log('content', content)



/*
import DefaultTemplate from './template.js'
const index = new Control({
  models: {
    default: [{
      schema: [{ type: {
        'data-href': { type: String }, 
        'textContent': { type: String },
      } }],
      content: [{
        'data-href': "./static-cms",
        'textContent': "Static CMS"
      }],
    }, {}],
  },
  views: {
    default: [{
      parent: document.querySelector('body > main'),
      templates: {
        default: DefaultTemplate
      },
      querySelectors: {
        querySelectorAll: {
          'button': ':scope > ul > li > button',
        },
      },
      events: {
        'querySelectors.button click': ($event) => { console.log($event.type, $event) }
      },
    }, {}],
  },
  start() {
    this.views.default.render(
      this.models.default.parse()
    )
    console.log(this.views.default)
    return this
  }
}, {
  validSettings: ['start'],
})
index.start()
index.start()
*/