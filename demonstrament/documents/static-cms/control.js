import DefaultTemplate from './template.js'
export default [{
  views: {
    default: {
      parent: document.querySelector('body > main'),
      templates: { default: DefaultTemplate },
      querySelectors: {
        querySelector: {
          'static-cms': ':scope > static-cms'
        }
      },
    },
  },
  models: {
    default: {}
  },
  controls: {},
  start() {
    this.views.default.render({}, 'default')
  },
}, {
  validSettings: ['start']
}]