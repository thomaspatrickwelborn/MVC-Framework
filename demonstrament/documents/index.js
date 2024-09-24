import { View, Model } from '/dependencies/mvc-framework.js'
const model = new Model({
  content: { aaa: 111 },
  events: {
    'content assign': ($event) => {
      viewA.render(model.parse())
    },
    'content set': ($event) => {
      console.log($event.type, $event.detail)
      viewA.render(model.parse())
    },
    'content delete': ($event) => {
      console.log($event.type, $event.detail)
      viewA.autoremove()
    },
  },
})
model.enableEvents()
const viewA = new View({
  insertSelf: {
    target: document.querySelector('body > header'),
    position: 'afterend',
  },
  parent: document.createElement('views'),
  templates: {
    default: ($content) => `
      <view-element class="view-a">${$content.aaa}</view-element>
      <views></views>
    `,
  },
  querySelectors: {
    querySelectorAll: {
      viewElement: ':scope > view-element'
    },
    querySelector: {
      viewElementA: ':scope > view-element.view-a',
      views: ':scope > views',
    },
  },
  events: {
    'querySelectors.viewElementA click': ($event) => {
      console.log($event)
    },
    'querySelectors.viewElement click': ($event) => {
      console.log($event)
    },
  },
})
.render(model.parse())
.autoinsert()
model.content.assign({ aaa: 111111 })
model.content.aaa = 222222
delete model.content.aaa
console.log
// const viewB = new View({
//   // parent: viewA.querySelectors.viewElementA,
//   parent: viewA.querySelectors.views,
//   templates: {
//     default: ($content) => `<view-element class="view-b">${$content.view}</view-element>`,
//   },
//   querySelectors: {
//     querySelectorAll: {
//       viewElement: 'view-element'
//     },
//     querySelector: {
//       viewElementB: 'view-element.view-b'
//     },
//   },
//   events: {
//     'querySelectors.viewElementB click': ($event) => {
//       console.log($event)
//     },
//     'querySelectors.viewElement click': ($event) => {
//       console.log($event)
//     },
//   },
// })
// viewB.render({ view: "VIEW_B"}, 'default')
