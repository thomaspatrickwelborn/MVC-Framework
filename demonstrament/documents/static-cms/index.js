import { LocationRouter } from '/dependencies/mvc-framework.js'
const locationRouter = new LocationRouter({
  hashpath: false,
  routes: {
    "/": {
      name: "Index",
      enable: true,
    },
    "/static-cms": {
      name: "Static CMS",
      enable: true,
    },
    "/static-cms/subpage": {
      name: "Static CMS Subpage",
      enable: true,
    },
    "/static-cms/subpage/:subpageID": {
      name: "Static CMS Subpage",
      enable: true,
    },
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