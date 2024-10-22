# Content Class
**MVC Framework \| Class System \| Model \| *Content***  
See Also: [Content Guide](../../../Guide/Model/Content/index.md)  
**Directory**  
 - [Handler Class](./Handler/index.md)

**Contents**:  
 - [`Settings` Property]()
 - [`Options` Property]()
   - [`basename` Option]()
   - [`path` Option]()
   - [`parent` Option]()
   - [`enableValidation` Option]()
   - [`validationEvents` Option]()
   - [`contentEvents` Option]()
   - [`enableEvents` Option]()
 - [Constructor Method]()
   - [`$settings` Argument]()
   - [`$schema` Argument]()
   - [`$options` Argument]()
 - [Public Properties]()
   - [`settings` Property]()
   - [`options` Property]()
   - [`schema` Property]()
   - [`Class` Property]()
   - [`object` Property]()
   - [`string` Property]()
   - [`type` Property]()
   - [`typedObjectLiteral` Property]()
   - [`parent` Property]()
   - [`basename` Property]()
   - [`path` Property]()
   - [`root` Property]()
   - [`proxy` Property]()
 - [Public Methods]()
   - [`parse` Method]()
 - [Private Properties]()
   - [`#handler` Property]()
   - [`#_settings` Property]()
   - [`#_options` Property]()
   - [`#_schema` Property]()
   - [`#_type` Property]()
   - [`#_root` Property]()
   - [`#_parent` Property]()
   - [`#_basename` Property]()
   - [`#_path` Property]()
   - [`#_proxy` Property]()
   - [`#_handler` Property]()

## `Settings` Property
No default Content Settings.  

## `Options` Property
Default Content Options.  
```
{
  basename: null,
  path: null,
  parent: null,
  enableValidation: true,
  validationEvents: true,
  contentEvents: true,
  enableEvents: true,
}
```
### `basename` Option
**Type**: `String`, `null`  
**Default**: `null`  
**Descript**:  
 - When `Content` Class Instance is subproperty of other `Content` Class Instance, `basename` is the subproperty key from other `Content` Class Instance.  
 - When `Content` Class Instance is base property, `basename` is `null`.  
 - `basename` is the last subpath of `path`.  
### `path` Option
**Type**: `String`, `null`  
**Default**: `null`  
**Descript**:  
 - When `Content` Class Instance is subproperty of other `Content` Class Instance, `path` is the period-delimited subproperty key from other `Content` Class Instance. 
 - When `Content` Class Instance is base property, `path` is `null`.  
### `parent` Option
**Type**: `Content` Class Instance `proxy` Property, `null`  
**Default**: `null`  
**Descript**:  
 - When `Content` Class Instance is subproperty of other `Content` Class Instance, `parent` is the containing `Content` Class Instance `proxy` property. 
 - When `Content` Class Instance is base property, `parent` is `null`.  
### `enableValidation` Option
**Type**: `boolean`  
**Default**: `true`  
**Descript**:  
 - When `true` and `schema` property value is not `null`, schema validates content properties. 
 - When `false`, no content validation. 
### `validationEvents` Option
**Type**: `boolean`  
**Default**: `true`  
**Descript**:  
 - When `true` and `schema` property value is not `null`, schema validation of content properties dispatches `ValidatorEvent` instances.  
 - When `false`, no `ValidatorEvent` instances dispatched.  
### `contentEvents` Option
**Type**: `boolean`  
**Default**: `true`  
**Descript**:  
 - When `true` and  `content` property values change, dispatch `ContentEvent` instances.  
 - When `false`, no `ContentEvent` instances dispatched.  
### `enableEvents` Option
**Type**: `boolean`  
**Default**: `true`  
**Descript**:  
 - When `true` and `validationEvents` or `contentEvents` values are `true`, dispatch events.  
 - When `false`, no `ContentEvent` or `ValidatorEvent` instances dispatched.  

## Constructor Method
 - Sets `settings`, `options`, `schema` properties.  
 - Explicitly returns `proxy` property.  
### `$settings` Argument
**Type**: `Array` Literal, `Object` Literal  
**Descript**:  
 - `$settings` assigned to `settings`.  
### `$options` Argument
**Type**: `Object` Literal  
**Descript**:  
 - `$options` assigned to `options`.  
### `$schema` Argument
**Type**: `Schema` Instance, `Object` Literal, `Array` Literal, `undefined`, `null`  
**Descript**:  
 - `$schema` assigned to `schema`.  

## Public Properties
### `settings` Property
**Type**: `get`, `set`  
**Inturn**: `$settings` (from `constructor`)  
**Return**: `#_settings`  
**Descript**:  
 - Sets `$settings` to `#_settings`  
### `options` Property
**Type**: `get`, `set`    
**Inturn**: `$options` (from `constructor`)  
**Return**: `#_options`  
**Descript**:  
 - Recursively Assigns `Options`, `$options` to `#_options`.  
### `schema` Property
**Type**: `get`, `set`  
**Inturn**: `$schema` (from `constructor`)  
**Return**: `#_schema`  
**Descript**:  
 - When `$schema` is `undefined` or `null`, `#_schema` assigned `null` value.  
 - When `$schema` is instance of `Schema`, `#_schema` assigned `$schema` value.  
 - When `$schema` is an `Array` literal, create a new `Schema` Class Instance with options. 
 - When `$schema` is an `Object` literal, create a new `Schema` without options.  
### `Class` Property
**Type**: `get`  
**Return**: `Content` Class
### `object` Property
**Type**: `get`  
**Return**: `parse` invocation with "object" type.  
### `string` Property
**Type**: `get`  
**Return**: `parse` invocation with "string" type.  
### `type` Property
**Type**: `get`  
**Return**: `#_type`  
**Descript**:  
 - Assigns type of `settings` to `#_type` (either `object` or `array`.  
### `typedObjectLiteral` Property
**Type**: `get`  
**Return**: `Array` Literal, `Object` Literal  
**Descript**:  
 - Return an `Array` or `Object` dependent on `type`  property `array` or `object` value.  
### `parent` Property
**Type**: `get`  
**Return**: `Content` Class Instance `proxy` property.  
**Descript**:  
 - Assigns `$parent` to `#_parent`.  
### `basename` Property
**Type**: `get`  
**Return**: `#_basename`  
**Descript**:  
 - Assigns `$basename` to `#_basename`.  
### `path` Property
**Type**: `get`  
**Return**: `#_path`  
**Descript**:  
 - Assigns `$path` to `#_path`.  
### `root` Property
**Type**: `get`  
**Return**: `#_root`  
**Descript**:  
 - Assigns `typedObjectLiteral` to `#_root`.  
### `proxy` Property
**Type**: `get`  
**Return**: `#_proxy`  
**Descript**:  
- Creates new `Proxy` Instance with `root` target and `Handler` Instance handler.  
- Sets `settings` to `proxy`.  
- Assigns new `Proxy` Instance to `#_proxy`.  

## Public Methods
### `parse` Method

## Private Properties
### `#handler` Property
**Type**: `Handler` Instance  
### `#_settings` Property
**Type**: `Array` Literal, `Object` Literal  
### `#_options` Property
**Type**: `Object` Literal  
### `#_schema` Property
**Type**: `Schema` Instance, `null`  
### `#_type` Property
**Type**: `String` Literal  
### `#_root` Property
**Type**: `Array` Literal, `Object` Literal  
### `#_parent` Property
**Type**: `Content Proxy`  
### `#_basename` Property
**Type**: `String` Literal  
### `#_path` Property
**Type**: `String` Literal  
### `#_proxy` Property
**Type**: `Proxy` Instance  
### `#_handler` Property
**Type**: `Handler` Instance  
