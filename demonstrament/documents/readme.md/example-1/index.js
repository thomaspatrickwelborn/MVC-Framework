import { Control } from '/dependencies/mvc-framework.js'
const control = new Control({
  models: {
    ui: [{
      application: { active: false }
    }],
    content: [[{}]],
  },
  views: {
    ui: [{
      parentElement: document.querySelector('body'),
      scope: 'template',
      templates: { default: function DefaultTemplate($models) {
        return `<application></application>`
      } }
    }, { autorender: true }],
    querySelectors: {
      querySelector: {
        'application': ':scope > application'
      }
    },
  },
  assign: {
    listeners: {
      uiModelSetProperty: function($event) {
        console.log($event.type, $event.detail)
      }
    }
  }
}, {
  bindListener: true,
  events: {
    'models.ui setProperty': 'listeners.uiModelSetProperty',
    'models.ui.** setProperty': 'listeners.uiModelSetProperty',
  },
  enableEvents: true,
  // assign: {
  // },
})
control.models.ui.set({
  application: {
    active: true
  }
})
