# Model Class
**MVC Framework \| Class System \| *Model***  

## `Settings` Property
```
{ content, schema, localStorage }
```
### `schema` Setting
**Default**: `undefined`  
**Required**: `false`  
**Type**: `object`, `array`, `Schema`, `undefined`  
**Descript**:  
 - [Schema settings](./Schema/index.md#settings-property).  
### `content` Setting
**Default**: `undefined`  
**Required**: `true`  
**Type**: `object`, `array`, `Content`, `undefined`  
**Descript**:  
 - [Content Settings](./Content/index.md#settings-property).  
 - Required to instantiate model, otherwise `constructor` returns `null`.  
### `localStorage` Setting
**Default**: `undefined`  
**Required**: `false`  
**Type**: `string`, `undefined`  
**Descript**:  
 - [`LocalStorage` Settings](./LocalStorage/index.md#settings-property).  

## `Options` Property
```
{ schema, content, enableEvents, localStorage, autoLoad }
```
### `schema` Option
**Default**: `undefined`  
**Required**: `false`  
**Type**: `object`, `array`, `undefined`  
**Descript**:  
 - [`Schema` Options](./Schema/index.md/#options-property).  
### `content` Option
**Default**: `undefined`  
**Required**: `false`  
**Type**: `object`, `array`, `undefined`  
**Descript**:  
 - [`Content` Options](./Content/index.md/#options-property).  
### `autoload` Option
**Default**: `false`  
**Required**: `false`  
**Type**: `boolean`  
**Descript**:  
 - Specifies `content` property instantiated with parametered `localStorage` item.  

## `constructor` Method
 - When `settings.content` is `null` or `undefined` *and* `settings.content` is not type of `object`, return `null`.  
### `$options` Argument

## Public Properties
### `schema` Property
**Type**: `get`  
**Return**: `#_schema`  
**Descript**:  
 - When `settings.schema` is `undefined` then `schema` assigned `null`.  
 - When `settings.schema` is instance of `Schema` then `#_schema` assigned `settings.schema`.  
 - When `settings.schema` is type of `object` then `#_schema` assigned new `Schema` instance parametered with `settings.schema` and `options.schema`. 
### `content` Property
**Type**: `get`  
**Return**: `#_content`  
**Descript**:  
 - When `settings.localStorage` and `options.autoLoad` are `true`, new `Content` instance constructed with `localStorage.get` invocation (locally stored model content).  
### `localStorage` Property
**Type**: `get`  
**Return**: `#_localStorage`  
**Descript**:  
## Public Methods
### `save` Method
**Type**: `function`  
**Return**: `object`  
**Descript**:  
 - When  `localStorage` is defined, evoke `localStorage.set` with parametered `content.object`.  
### `load` Method
**Type**: `function`  
**Return**: `object`  
**Descript**:  
 - When `localStorage` is defined, invoke `localStorage.get`.  
### `unload` Method
**Type**: `function`  
**Return**: `undefined`  
**Descript**:  
 - When `localStorage` is defined, evoke `localStorage.remove`.  
### `parse` Method
**Type**: `function`  
**Descript**:  
 - [Content `parse` Method](./Content/index.md#parse-property)

## Private Properties
### `#_schema` Property
**Type**: `Schema`, `null`
### `#_content` Property
**Type**: `Content`, `null`
### `#_localStorage` property
**Type**: `LocalStorage`  

