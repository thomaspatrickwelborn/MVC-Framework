import { LocationRouter } from '/dependencies/mvc-framework.js'
const locationRouter = new LocationRouter({
  routes: {
    "/": {
      name: "Index"
    },
    "/static-cms": {
      name: "Static CMS"
    },
    "/static-cms/#/subpage": {
      name: "Static CMS Subpage"
    },
    "/static-cms/#/subpage/:subpageID": {
      name: "Static CMS Subpage"
    },
  }
})
/*
import { Control } from '/dependencies/mvc-framework.js'
import ControlParameters from './control.js'
document.addEventListener('DOMContentLoaded', ($event) => {
  const control = new Control(...ControlParameters)
  control.start()
}, { once: true })
*/