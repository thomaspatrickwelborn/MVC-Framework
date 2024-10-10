import { Model, Schema } from '/dependencies/mvc-framework.js'
const contentEventLog = ($event) => {
  const { type, basename, path, detail } = $event
  console.log('-----')
  console.log('type', type)
  console.log('basename', basename)
  console.log('path', path)
  console.log('detail', detail)
}

const { schema, content } = new Model({
  schema: {
    "aaa": { type: {
      "bbb": { type: String },
      "ccc": { type: String },
    } },
    "addEventListener": { type: String },
  },
  content: {
    "aaa": {
      "bbb": "222",
      "ccc": "333",
    }
  },
  events: {
    // 'content delete': contentEventLog,
    'content set': contentEventLog,
    // 'content validateProperty': contentEventLog,
  },
})
// console.log(content)
// content.set('aaa.bbb', "222222")
// content.set('aaa.ccc', "333333")
// console.log(content.parse({ type: 'json' }))
content.set('aaa', {
  "bbb": "222222222",
  "ccc": "333333333",
})
// console.log(content.parse({ type: 'json' }))
// content.delete('aaa.bbb')
// console.log(content.get('aaa.bbb'))
// console.log(content.get('aaa.bbb'))
// console.log(content.get('aaa').get('bbb'))
// content.aaa.bbb = "BBB"
// content['addEventListener'] = "meh"
// console.log(Object.getOwnPropertyDescriptors(content))
// console.log(content.root)
// console.log(content.object)

// console.log(content.parse())
/*
const model = new Model({
  schema: {
    aaa: { type: String },
    bbb: { type: {
      ccc: { type: String },
    } }
  },
  content: {},
  events: {
    // 'content defineProperty': ($event) => { console.log($event.type, $event.detail) },
    'content validate': ($event) => {
      console.log('-----')
      const { basename, path, detail } = $event
      console.log($event)
    },
  },
})
model.content.defineProperty('aaa', { value: "AAA" })
model.content.defineProperty('aaa', { value: 111 })
model.content.defineProperty('bbb', { value: {
  ccc: { value: "CCC" }
} } )
model.content.defineProperty('bbb', { value: {
  ccc: { value: 333 }
} } )
const { content, schema } = model
console.log('content', content)
*/
/*
const model = new Model({
  // Schema
  schema: new Schema([{ type: {
    aaa: { type: {
      bbb: { type: String },
      ccc: { type: Number },
      ddd: { type: Boolean },
    } },
    eee: { type: [{
      type: {
        fff: { type: String },
        ggg: { type: Number },
        hhh: { type: Boolean },
      }
    }] },
  } }], { validationType: 'primitive' }),
  // Content
  content: [],
  events: {
    'content validateProperty': ($event) => {
      const { valid, key, val } = $event.detail
      // console.log(valid, key, val)
    }
  }
})
const { schema, content } = model
content.assign({
  0: {
    aaa: {
      bbb: 222, // "BBB",
      ccc: "333",
      ddd: "true",
    },
    eee: [{
      fff: "FFF",
      ggg: "777",
      hhh: false,
    }],
    // iii: 999
  }
})
console.log('content', content)
// console.log(content)
// console.log('schema.validate(content)', schema.validate(content))
*/

/*
const schemaA = new Schema([{ type: {
  aaa: { type: {
    bbb: { type: {
      ccc: { type: Number },
      ddd: { type: String },
      eee: { type: Boolean },
    } },
  } }
}}], { validationType: 'primitive' })

const content = [{
  aaa: {
    bbb: {
      ccc: 333,
      ddd: '444',
      eee: 'false',
    }
  }
}]
// console.log('schemaA', schemaA)
*/
/*
const schemaB = new Schema([{ type: String }], { validationType: 'primitive' })
const contentB = ["AAA", "BBB", "CCC"]
// console.log('schemaB', schemaB)
// console.log('contentB', contentB)
console.log('schemaB.validate(contentB)', schemaB.validate(contentB))
// console.log(schema.validate(content))
// {
//   aaa:
// }
*/



/*
import { Control, Model, Schema } from '/dependencies/mvc-framework.js'
import DefaultTemplate from './template.js'
const index = new Control({
  models: {
    default: [{
      schema: [{
        'data-href': String, 
        'textContent': String,
      }],
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
          'button': ':scope > nav > button',
        },
      },
      events: {
        'querySelectors.button click': ($event) => {
          window.location = $event.currentTarget.getAttribute('data-href')
        }
      },
    }, {}],
  },
  start() {
    this.views.default.render(
      this.models.default.parse()
    )
    return this
  }
}, {
  validSettings: ['start'],
})
index.start()
index.start()
*/