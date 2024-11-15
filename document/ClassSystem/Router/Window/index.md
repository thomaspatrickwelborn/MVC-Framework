# Window Router
```
{
  routes: {
    "/": function index($route) {},
    "/path": function path($route) {},
    "/path/#alter-path": function alterpath($route) {},
    "/path/:subpath": function subpath($route) {},
    "/path/:subpath/#alter-subpath": function subalterpath($route) {},
  },
}
```

Window Router should allow route definitions for both a path and a hash, instead of either/or. 
Window Router should listen for hash change events and render matching route name. 
Window Router should match Window Location either immediately after instantiation or after enablement. 