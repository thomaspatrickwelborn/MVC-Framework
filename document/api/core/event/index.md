# MVC Framework - Core Event Class
[**Core Event Class Guide**](../../../guide/core/event/index.md)  

**Contents**  
 - [Public Properties]()
   - [`context` Property]()
   - [`type` Property]()
   - [`path` Property]()
   - [`target` Property]()
   - [`listener` Property]()
   - [`options` Property]()
   - [`enable` Property]()
 - [Private Properties]()
   - [`#settings`]()
   - [`#boundListener`]()
   - [`#_boundListener`]()
   - [`#_enable`]()

## Public Properties
### `context` Property
**Type**: `get`  
**Return**: Core Class instance  
**Descript**:  
 - `path` property scope.  
 - `listener` binding.  
### `type` Property
**Type**: `get`
**Return**:  `string`  
**Descript**:  
 - Event type, such as "click".  
### `path` Property
**Type**: `get`  
**Return**: `string`  
**Descript**:  
 - Period-separated property path to `target`.  
 - Root subpath `:scope` refers to `context`.  
### `target` Property
**Type**: `get`  
**Return**: Event Target Class instance or `undefined`.  
**Descript**:  
 - Accesses Event Target instance through `path`.  
 - Inaccessible paths or non-Event Target instances return undefined.  
### `listener` Property
**Type**: `get`  
**Return**: `settings.listener`  
**Descript**:  
 - Event listener function.  
### `options` Property
**Type**: `get`  
**Return**: `settings.options`  
**Descript**:  
 - Event options.  
### `enable` Property
**Type**: `get`, `set`  
**Inturn**: `boolean` literal  
**Descript**:  
 - Truthiness of `$enable` argument evokes either `addEventListener` or `removeEventListener` on `target` property.    


## Private Properties
### `#settings`
**Type**: `object` literal  
**Descript**:  
 - Stores `settings` Property value.  
### `#boundListener`
**Type**: `get`  
**Return**: `bound function`, `bound asyncFunction`  
**Descript**:  
 - Binds `context` Property to `listener` Property.  
### `#_boundListener`
**Type**: `function`, `asyncFunction`     
**Descript**:  
 - Stores `#boundListener` value.  
### `#_enable`
**Type**: `boolean` literal  
**Descript**:  
 - Stores `enable` Property value.  

