| [MVC Framework](../../README.md) | [API](../index.md) | *Model* |
| :-- | :-- | :-- |
# MVC Framework API \| Model Class
| [Content Class](./content/index.md) | [Schema Class](./schema/index.md) |
| :-- | :-- |

## `Settings` Property
```
{ content, schema, localStorage }
```
### `schema` Setting
**Type**: `object`, `array`, `Schema`, `undefined`  
**Default**: `undefined`  
**Required**: `false`  
**Descript**:  
 - [`Schema` settings](./schema/index.md#settings-property).  
### `content` Setting
**Default**: `undefined`  
**Required**: `true`  
**Type**: `object`, `array`, `Content`  
**Descript**:  
 - [`Content` Settings](./content/index.md#settings-property).  
 - Required to instantiate model, otherwise `constructor` returns `null`.  
### `localStorage` Setting
**Type**: `string`, `undefined`  
**Default**: `undefined`  
**Required**: `false`  
**Descript**:  
 - [`LocalStorage` Settings](./local-storage/index.md#settings-property).  

## `Options` Property
```
{ schema, content, enableEvents, autoLoad }
```
### `schema` Option
**Type**: `object`, `array`, `undefined`  
**Default**: `undefined`  
**Required**: `false`  
**Descript**:  
 - [`Schema` Options](./schema/index.md/#options-property).  
### `content` Option
**Type**: `object`, `array`, `undefined`  
**Default**: `undefined`  
**Required**: `false`  
**Descript**:  
 - [`Content` Options](./content/index.md/#options-property).  
### `autoload` Option
**Type**: `boolean`  
**Default**: `false`  
**Required**: `false`  
**Descript**:  
   - Specifies `content` property instantiated with `localStorage` item.  
### `autosave` Option
**Type**: `boolean`  
**Default**: `false`  
**Required**: `false`  
**Descript**:  
 - Specifies `content` saved to `localStorage` after each content property modifier event.  
### `changeEvents` Options
**Type**: `Boolean`  
**Default**: `false`  
**Required**: `false`  
**Descript**:  
 - Specifies `content` property modifier events (`ChangeEvents`) captured

## `constructor` Method
 - When `settings.content` is `null` or `undefined` *and* `settings.content` is not type of `object`, return `null`.  


## Public Properties
### `schema` Property
**Type**: `get`  
**Return**: `#_schema`  
**Descript**:  
 - When `settings.schema` is `undefined` then `schema` assigned `null`.  
 - When `settings.schema` is instance of `Schema` then `#_schema` assigned `settings.schema`.  
 - When `settings.schema` is type of `object` then `#_schema` assigned new `Schema` instance with `settings.schema` and `options.schema`. 
### `content` Property
**Type**: `get`  
**Return**: `#_content`  
**Descript**:  
 - When `settings.localStorage` and `options.autoLoad` are `true`, new `Content` instance constructed with `localStorage.get` invocation (locally stored model content).  
### `localStorage` Property
**Type**: `get`  
**Return**: `#_localStorage`  
**Descript**:  
### `changeEvents` Property
**Type**: `get`, `set`  
**Inturn**: `$changeEvents`  
**Return**: `#_changeEvents`
**Descript**:  
 - When `$changeEvents` differs from `#_changeEvents` the new value is assigned. 
   - When `$changeEvents` is `true` an event listener is added to `content` for each `ChangeEvents` type.  
   - When `$changeEvents` is `false` an event listener is removed from `content` for each `ChangeEvents` type.  

## Public Methods
### `save` Method
**Type**: `function`  
**Return**: `object`  
**Descript**:  
 - When  `localStorage` is defined, evoke `localStorage.set` with `content.object`.  
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
 - [Content `parse` Method](./content/index.md#parse-property)

## Private Properties
### `#_schema` Property
**Type**: `Schema`, `null`
### `#_content` Property
**Type**: `Content`, `null`
### `#_localStorage` Property
**Type**: `LocalStorage`  
### `#_changeEvents` Property
**Type**: `Boolean`  
