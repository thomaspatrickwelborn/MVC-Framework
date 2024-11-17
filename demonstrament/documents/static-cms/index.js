import { LocationRouter } from '/dependencies/mvc-framework.js'
const locationRouter = new LocationRouter({
  hashpath: true,
  routes: {
    '/': {
      name: "Static CMS",
      enable: true,
    },
    "/subpage": {
      name: "Static CMS Subpage",
      enable: true,
    },
    "/subpage/:subpageID": {
      name: "Static CMS Subpage",
      enable: true,
    },
  },
  events: {
    'route': ($event) => { console.log($event.type, $event) }
  }
})
console.log(locationRouter)
/*
const locationRouter = new LocationRouter({
  routes: {
    "/": {
      name: "Index"
      routes: {
        "/static-cms": {
          name: "Static CMS",
          routes: {
            "/subpage": {
              name: "Static CMS Subpage",
              routes: {
                ":subpageID": {
                  name: "Static CMS Subpage"
                }
              }
            }
          }
        }
      }
    }
  }
})
*/

/*
$routeSettings {
  name: String
  basename: String
  enable: Boolean
}
$route {
  [$basename]: $routeSettings
}
$router {
  routes: { $route }
}
*/
/*
import { Control } from '/dependencies/mvc-framework.js'
import ControlParameters from './control.js'
document.addEventListener('DOMContentLoaded', ($event) => {
  const control = new Control(...ControlParameters)
  control.start()
}, { once: true })
*/