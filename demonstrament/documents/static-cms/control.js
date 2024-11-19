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
  routers: {
    location: {
      default: {
        hashpath: true,
        routes: {
          "": {
            "name": "Index Alias",
            "class": "Index",
          },
          "/": {
            "name": "Index",
            "class": "Index",
          },
          "/subfolder": {
            "name": "Subfolder",
            "class": "Subfolder",
          },
          "/subfolder/:fileID": {
            "name": "Subfolder File",
            "class": "SubfolderFile",
          }
        } 
      }
    }
  },
  events: {
    "routers.location.default route": function route($event) {
      console.log(this)
      // console.log($event)
      // this.start()
    },
    // "routers.location.default error": ($event) => {
    //   console.log($event.type, $event.path)
    // }
  },
}, {
  defineProperties: {
    start: { value: function () {
      console.log(this.models.default.parse())
      this.views.default.render(this.models.default.parse(), 'default')
    //   console.log(this.views.default.querySelectors)
    //   const controlViewParent = this.views.default.querySelectors['static-cms']
    //   // Inspector
    //   // console.log(InspectorControl(...InspectorControl(controlViewParent)))
    //   this.controls.inspector = new Control(...InspectorControl(controlViewParent)).start()
    //   // this.controls.https = HTTPSControl(controlViewParent)
    //   // this.controls.browserSync = BrowserSyncControl(controlViewParent)
    //   // this.controls.express = ExpressControl(controlViewParent)
    //   // this.controls.routes = RoutesControl(controlViewParent)
    //   return this
    } }
  }
}]