# MVC Framework - Core Class
[**Core Class Guide**](../../Guide/Core/index.md)  

**Content**  
 - [Constructor Arguments]()
   - [`$settings` Object]()
   - [`$options` Object]()
 - [Public Properties]()
   - [`settings` Property]()
   - [`options` Property]()
   - [`events` Property]()
 - [Public Methods]()
   - [`addEvents` Method]()
   - [`removeEvents` Method]()
   - [`disableEvents` Method]()
 - [Private Methods]()
   - [`#assign` Method]()
   - [`#defineProperties` Method]()
   - [`#toggleEventAbility` Method]()
 - [Private Properties]()
   - [`#_settings` Property]()
   - [`#_options` Property]()
   - [`#_events` Property]()

## Settings Property
```
{ events: [] }
```
## Options Property
```
{
  assign: [],
  defineProperties: {},
}
```

## Constructor
 - Sets `settings`, `options` properties. 
 - Evokes `addEvents` method. 
 - Evokes `assign`, `defineProperties` methods. 
### `$settings` Argument
**Type**: `object`  
**Descript**: `$settings` assigned to `settings`.  
### `$options` Argument
**Type**: `object`  
**Descript**: `$options` assigned to `options`.  

## Public Properties
### `settings` Property
**Type**: `get`, `set`  
**Inturn**: `$settings` (from `constructor`)  
**Return**: `#_settings`  
**Descript**:  
 - Properties referenced by or set to Core Class instance properties and methods. 
 - Call `expandEvents` with `events` property.  
 - Recursively assign default `Settings`, `$settings` properties to `#_settings`.  
### `options` Property
**Type**: `get`, `set`  
**Inturn**: `$options` (from `constructor`)  
**Return**:  `#_options`  
**Descript**:  
 - Properties that modulate Core Class instance properties or methods. 
 - Recursively assign default `Options`, `$options` properties to `#_options`.  
### `events` Property
**Type**: `get`  
**Return**: `#_events` Property  
**Descript**:  
 - Stored Core Event Class instances.  

## Public Methods
### `addEvents` Method
**Type**: `function`  
**Descript**:  
 - Create new Core Event Class instances. 
 - Add Core Event Class instances to `events` property.  
### `removeEvents` Method
**Type**: `function`  
**Descript**:  
 - Disable, remove Core Event Class instances from `events` property
### `enableEvents` Method
**Type**: `function`  
**Descript**:  
 - Enable Core Event Class instances contained by `events` property. 
### `disableEvents` Method
**Type**: `function`  
**Descript**:  
 - Disable Core Event Class instances contained by `events` property. 

## Private Methods
### `#assign` Method
**Type**: `function`  
**Descript**:  
 - Assign properties from `settings` to Core Class instance when `options.assign` value matches `settings` property key.  
### `#defineProperties` Method
**Type**: `function`  
**Descript**:  
 - Define properties from `settings` to Core Class instance when `options.defineProperties` property key matches `settings` property key.  
### `#toggleEventAbility` Method
**Type**: `function`  
**Descript**:  
 - Add or remove event listeners from argued Core Event instances by toggling their `enabled` property.  

## Private Properties
### `#_settings` Property
**Type**: `object`  
**Descript**:  
 - Stores `settings` Property value.  
### `#_options` Property
**Type**: `object`  
**Descript**:  
 - Stores `options` Property value.  
### `#_events` Property
**Type**: `array`  
**Descript**:  
 - Stores `events` Property value.  

## References
**Class Extensions**:  
 - [Model](../Model/index.md)
 - [View](../View/index.md)
 - [Control](../Control/index.md)
 - [FetchRouter](../Router/Fetch/index.md)
 - [LocationRouter](../Router/Location/index.md)
