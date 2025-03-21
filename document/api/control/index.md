# MVC Framework - Control Class
 - [Core Class Extension](../core/index.md)
## Constructor Arguments
### `$settings` Argument
**Type**: `Object` Literal  
**Descript**: Control Class Instance Settings.  
**Inturn**:  
```
{
  models: { [$modelName]: $model },
  views: { [$viewName]: $view },
  controls: { [$controlName]: $control },
  routers: {
    fetch: { [$routerName]: $router },
    location: { [$routerName]: $router },
  },
}
```
### `$options` Argument
**Type**: `Object` Literal  
**Descript**: Control Class Instance Options.  
**Inturn**:  
```
{
  
}
```
## Public Properties
### `set models` Property
**Type**: `Object` literal  
**Descript**: Propriated Model Instance Parameters: Settings Object, Default Instance, Settings/Options Array, and Custom Instance.  
**Inturn**:  
```
{
  // Settings Object
  [$modelName]: $modelSettings,
  // Default Instance
  [$modelName]: new Model($modelSettings),
  // Settings/Options Array
  [$modelName]: [$modelSettings, $modelOptions],
  // Custom Instance
  [$modelName]: new Model($modelSettings, $modelOptions),
}
```
### `get models` Property
**Type**: `Object` Literal  
**Descript**: Propriated Model Instances.  
**Return**:  
```
{
  [$modelName]: $model
}
```

### `set views` Property
**Type**: `Object` literal  
**Descript**: Propriated View Instance Parameters: Settings Object, Default Instance, Settings/Options Array, and Custom Instance.  
**Inturn**:  
```
{
  // Settings Object
  [$viewName]: $viewSettings,
  // Default Instance
  [$viewName]: new View($viewSettings),
  // Settings/Options Array
  [$viewName]: [$viewSettings, $viewOptions],
  // Custom Instance
  [$viewName]: new View($viewSettings, $viewOptions),
}
```
### `get views` Property
**Type**: `Object` Literal  
**Descript**: Propriated View Instances.  
**Return**:  
```
{
  [$viewName]: $view
}
```

### `set controls` Property
**Type**: `Object` literal  
**Descript**: Propriated Control Instance Parameters: Settings Object, Default Instance, Settings/Options Array, and Custom Instance.  
**Inturn**:  
```
{
  // Settings Object
  [$controlName]: $controlSettings,
  // Default Instance
  [$controlName]: new Control($controlSettings),
  // Settings/Options Array
  [$controlName]: [$controlSettings, $controlOptions],
  // Custom Instance
  [$controlName]: new Control($controlSettings, $controlOptions),
}
```
### `get controls` Property
**Type**: `Object` Literal  
**Descript**: Propriated Control Instances.  
**Return**:  
```
{
  [$controlName]: $control
}
```

### `routers` Property
**Type**: `get`, `set`  
**Inturn**:  
 - `Object` literal propriates router classes with subpropriate key/value defining router name with router. 
   - Router configuration may be Router Class Settings Object, Default Instance, Settings/Options Array, or Custom Instance.  

**Example**:  
```
{
  routers: {
    fetch: {
      // Settings Object
      [$routerName]: $routerSettings,
      // Default Instance
      [$routerName]: new Router($routerSettings),
      // Settings/Options Array
      [$routerName]: [$routerSettings, routerOptions],
      // Custom Instance
      [$routerName]: new Router($routerSettings, routerOptions),
    },
    location: {
      // Settings Object
      [$routerName]: $routerSettings,
      // Default Instance
      [$routerName]: new Router($routerSettings),
      // Settings/Options Array
      [$routerName]: [$routerSettings, routerOptions],
      // Custom Instance
      [$routerName]: new Router($routerSettings, routerOptions),
    },
  }
}
```
**Return**: `Object` Literal  
**Descript**: 

## Public Methods
### `addClassInstances` Method
### `removeClassInstances` Method

## Private Properties
### `#_models` Property
### `#_views` Property
### `#_controls` Property
### `#_routers` Property