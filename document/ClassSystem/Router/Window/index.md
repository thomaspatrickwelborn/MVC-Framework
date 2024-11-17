# Window Router
```
{
  hashpath: false,
  routes: {
    "/": { 
      name: "Index",
      class: "Index"
    },
    "/path": { 
      name: "Path",
      class: "Path"
    },
    "/path/:subpath": { 
      name: "Subpath",
      class: "Subpath"
    },
  },
}
```

```
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
```