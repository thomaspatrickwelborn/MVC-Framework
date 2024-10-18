# MVC Framework - Control Class

## Properties
### `models` Property
**Type**: `getter`, `setter`  
**Inturn**:  
 - `Object` literal propriates key/value defining model name with model. 
   - Model configuration may be Model Class Settings Object, Default Instance, Settings/Options Array, or Custom Instance.  

**Example**:  
```
{
  models: {
    // Settings Object
    [$modelName]: $modelSettings,
    // Default Instance
    [$modelName]: new Model($modelSettings),
    // Settings/Options Array
    [$modelName]: [$modelSettings, modelOptions],
    // Custom Instance
    [$modelName]: new Model($modelSettings, $modelOptions),
  }
}
```
**Return**: `Object` Literal  
**Descript**: 
### `views` Property
**Type**: `getter`, `setter`  
**Inturn**:  
 - `Object` literal propriates key/value defining view name with view. 
   - View configuration may be View Class Settings Object, Default Instance, Settings/Options Array, or Custom Instance.  

**Example**:  
```
{
  views: {
    // Settings Object
    [$viewName]: $viewSettings,
    // Default Instance
    [$viewName]: new View($viewSettings),
    // Settings/Options Array
    [$viewName]: [$viewSettings, viewOptions],
    // Custom Instance
    [$viewName]: new View($viewSettings, $viewOptions),
  }
}
```
**Return**: `Object` Literal  
**Descript**: 
### `controls` Property
**Type**: `getter`, `setter`  
**Inturn**:  
 - `Object` literal propriates key/value defining control name with control. 
   - Control configuration may be Control Class Settings Object, Default Instance, Settings/Options Array, or Custom Instance.  

**Example**:  
```
{
  controls: {
    // Settings Object
    [$controlName]: $controlSettings,
    // Default Instance
    [$controlName]: new Control($controlSettings),
    // Settings/Options Array
    [$controlName]: [$controlSettings, controlOptions],
    // Custom Instance
    [$controlName]: new Control($controlSettings, controlOptions),
  }
}
```
**Return**: `Object` Literal  
**Descript**: 
### `routers` Property
**Type**: `getter`, `setter`  
**Inturn**:  
 - `Object` literal propriates key/value defining router name with router. 
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

## Methods
### `addClassInstances` Method
