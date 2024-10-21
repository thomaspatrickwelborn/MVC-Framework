# MVC Framework - Model Class

## `Settings` Property
```
{ content, schema }
```
### `schema` Setting
**Default**: `undefined`  
**Type**: `Object` Literal, `Array` Literal, `Schema` Instance, `undefined`  
**Descript**:  
 - `Object`, `Array` Literal becomes `Schema` Instance Settings.  
 - `Schema` Instances directly assigned to `schema`  
### `content` Setting
**Default**: `undefined`  
**Type**: `Object` Literal, `Array` Literal, `Content` Instance, `undefined`  
**Descript**:  
 - `Object`, `Array` Literal become `Content` Instance Settings.  
 - `Content` Instances directly assigned to `content`.  

## `Options` Property
```
{ schema, content, enableEvents, localStorage, autoLoad }
```
### `schema` Option
**Default**: `undefined`  
**Type**: `Object`, `Array`, `undefined`  
**Descript**:  
 - `Object`, `Array` Literals become `Schema` Instance Options.  
 - When `settings.schema` is `Schema` Instance `options.schema` ignored.  
### `content` Option
**Default**: `undefined`  
**Type**: `Object`, `Array`, `undefined`  
**Descript**:  
 - `Object`, `Array` Literals become `Content` Instance Options.  
 - When `settings.content` is `Content` Instance `options.content` ignored.  
### `localStorage` Option
**Default**: `undefined`  
**Type**: `String` Literal, `undefined`  
**Descript**:  
 - Period-separated path to `content` data.  
 - `undefined` value disables `localStorage`  
### `autoload` Option
**Default**: `false`  
**Type**: `Boolean` Literal  
**Descript**:  
 - When `options.localStorage` defined, `options.autoLoad` specifies `content` property instantiated with settings from `localStorage.get`.  
## Public Properties
### `schema` Property
**Type**: `get`  
**Return**: `#_schema`  
**Descript**:  
 - Invokes new or existing `Schema` instance parametered by `settings.schema`, `options.schema`.  

### `content` Property
**Type**: `get`  
**Return**: `#_content`  
**Descript**:  
 - Invokes new or existing `Content` instance parametered by `settings.content`, `options.content`, and`schema`.  

### `localStorage` Property
**Type**: `get`  
**Return**: `#_localStorage`  
**Descript**:  
 - Invokes new or existing `LocalStorage` instance parametered by `options.localStorage`  

## Public Methods
### `parse` Method

## Private Properties
### `#_schema` Property
**Type**: `Schema` instance  
### `#_content` Property
**Type**: `Content` instance  
### `#_localStorage` Property
**Type**: `LocalStorage` instance  

