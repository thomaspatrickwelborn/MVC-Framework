import InspectorControl from './Inspector/control.js'
import HTTPSControl from './HTTPS/control.js'
import BrowserSyncControl from './BrowserSync/control.js'
import ExpressControl from './Express/control.js'
import RoutesControl from './Routes/control.js'
import DefaultTemplate from './template.js'
export default [{
  views: {
    default: {
      parent: document.querySelector('body > main'),
      templates: { default: DefaultTemplate },
      querySelectors: {
        querySelector: {
          'static-cms': ':scope > static-cms',
        },
      },
    },
  },
  models: {
    default: {}
  },
  controls: {
    inspector: InspectorControl,
    https: HTTPSControl,
    browserSync: BrowserSyncControl,
    express: ExpressControl,
    routes: RoutesControl,
  },
  start() {
    this.views.default.render({}, 'default')
  },
}, {
  validSettings: ['start']
}]