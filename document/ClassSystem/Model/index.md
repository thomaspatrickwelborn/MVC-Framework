# Model Class
**MVC Framework \| Class System \| *Model***  

## `Settings` Property
```
{ content, schema, localStorage }
```
### `schema` Setting
**Default**: `undefined`  
**Type**: `object`, `array`, `Schema`, `undefined`  
**Descript**:  
 - [Schema settings](./Schema/index.md#settings-property).  
### `content` Setting
**Default**: `undefined`  
**Type**: `object`, `array`, `Content`, `undefined`  
**Descript**:  
 - [Content Settings](./Content/index.md#settings-property).  
### `localStorage` Setting
**Default**: `undefined`  
**Type**: `string`, `undefined`  
**Descript**:  
 - [`LocalStorage` Settings](./LocalStorage/index.md#settings-property).  

## `Options` Property
```
{ schema, content, enableEvents, localStorage, autoLoad }
```
### `schema` Option
**Default**: `undefined`  
**Type**: `object`, `array`, `undefined`  
**Descript**:  
 - [`Schema` Options](./Schema/index.md/#options-property).  
### `content` Option
**Default**: `undefined`  
**Type**: `object`, `array`, `undefined`  
**Descript**:  
 - [`Content` Options](./Content/index.md/#options-property).  
### `autoload` Option
**Default**: `false`  
**Type**: `boolean`  
**Descript**:  
 - Specifies `content` property instantiated with parametered `localStorage` item.  

## Public Properties
### `schema` Property
**Type**: `get`  
**Return**: `#_schema`  
**Descript**:  
 - Invokes new or existing `Schema`.  
 - When `settings.schema` `undefined`, `#_schema` assigned `null`.  
 - When `settings.schema` instance of `Schema`, `#_schema` assigned `settings.schema`.  
 - When `settings.schema` type of `object`, `#_schema` assigned new `Schema` instance parametered with `settings.schema` and `options.schema`. 
### `content` Property
**Type**: `get`  
**Return**: `#_content`  
**Descript**:  
 - Invokes new or existing `Content`.  
 - When `settings.content` is `undefined`, `#_content` is `undefined`.  
 - When `settings.localStorage` and `options.autoLoad` are `true`, new `Content` instance constructed with `localStorage.get` invocation (locally stored model content).  
### `localStorage` Property
**Type**: `get`  
**Return**: `#_localStorage`  
**Descript**:  
 - Invokes new or existing `LocalStorage` parametered by `settings.localStorage`.  
 
## Public Methods
### `parse` Method

## Private Properties
### `#_schema` Property
**Type**: `Schema`  
### `#_content` Property
**Type**: `Content`  
### `#_localStorage` property
**Type**: `LocalStorage`  

