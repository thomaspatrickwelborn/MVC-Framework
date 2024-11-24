# LocalStorage Class
**MVC Framework \| Class System \| Model \| *LocalStorage***
Manages single `localStorage` item at given path.  

## `constructor` Method
**Type**: `function`  
**Return**: `LocalStorage` instance.  
**Detail**:  
 - Set `$path` to `path`  
### `$path` Argument
**Type**: `string`  
**Detail**:  
 - Path to storage location. 

## `path` Property
**Type**:  `get/set`  
**Return**: `#_path`  
**Detail**:  
 - Set `$path` to `#_`
### `$path` Argument
**Type**: `string`

## `get` Method
**Type**: `function`  
**Return**: Invoked `#db.getItem`.  

## `set` Method
**Type**: `function`  
**Return**: Invoked `#db.setItem`.  
### `$content` Argument

## `remove` Method
**Type**: `function`  
**Return**: Invoked `#db.removeItem`.  


## Private Properties
### `#db` Property
**Type**: `localStorage`  
### `#_path` Property
**Type**: `string`  
