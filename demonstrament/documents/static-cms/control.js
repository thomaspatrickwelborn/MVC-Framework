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
    inspector: InspectorControl,
    // https: HTTPSControl,
    // browserSync: BrowserSyncControl,
    // express: ExpressControl,
    // routes: RoutesControl,
  },
  routers: {
    location: {
      default: {
        "base": "/static-cms/",
        "hashpath": true,
        "routes": {
          "/": {
            "pathname": "/",
            "name": "index",
            "class": "Index",
          },
          "/:subpageID": {
            "pathname": "/:subpageID",
            "name": "subpage",
            "class": "Subpage",
          },
        } 
      }
    }
  },
  events: {
    "routers.location.default.window load": function route($event) {
      console.log($event.type, $event)
      this.routers.location.default.navigate()
    },
    // "routers.location.default route:index-alias": function route($event) {
    //   console.log($event.type, $event)
    //   this.routers.location.default.navigate("#/", "assign")
    // },
    "routers.location.default route:index": function route($event) {
      console.log($event.type, $event)
    },
    "routers.location.default route:subpage": function route($event) {
      console.log($event.type, $event)
    },
    "routers.location.default nonroute": function route($event) {
      console.log($event.type, $event)
    },
    // "routers.location.default error": ($event) => {
    //   console.log($event.type, $event.path)
    // }
  },
}, {
  defineProperties: {
    start: { value: function () {
      this.views.default.render(this.models.default.parse(), 'default')
      const controlViewParent = this.views.default.querySelectors['static-cms']
      // Inspector
      this.controls.inspector = new Control(...InspectorControl(controlViewParent)).start()
    //   // this.controls.https = HTTPSCo ntrol(controlViewParent)
    //   // this.controls.browserSync = BrowserSyncControl(controlViewParent)
    //   // this.controls.express = ExpressControl(controlViewParent)
    //   // this.controls.routes = RoutesControl(controlViewParent)
    //   return this
    } }
  }
}]
