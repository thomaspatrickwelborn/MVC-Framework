import { Control } from '/dependencies/mvc-framework.js'
import InspectorControl from './Inspector/control.js'
// import HTTPSControl from './HTTPS/control.js'
// import BrowserSyncControl from './BrowserSync/control.js'
// import ExpressControl from './Express/control.js'
// import RoutesControl from './Routes/control.js'
import DefaultTemplate from './template.js'
// Static CMS
export default [{
  // Views
  views: {
    // Default View
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
  // Models
  models: {
    // Default Model
    default: {}
  },
  // Controls
  controls: {
    // inspector: InspectorControl,
    // https: HTTPSControl,
    // browserSync: BrowserSyncControl,
    // express: ExpressControl,
    // routes: RoutesControl,
  },
  start() {
    this.views.default.render(this.models.default.parse(), 'default')
    const controlViewParent = this.views.default.querySelectors['static-cms']
    // Inspector
    this.controls.inspector = new Control(...InspectorControl(controlViewParent)).start()
    // console.log(this.controls.inspector)
    // this.controls.https = HTTPSControl(controlViewParent)
    // this.controls.browserSync = BrowserSyncControl(controlViewParent)
    // this.controls.express = ExpressControl(controlViewParent)
    // this.controls.routes = RoutesControl(controlViewParent)
    return this
  },
}, {
  validSettings: ['start']
}]