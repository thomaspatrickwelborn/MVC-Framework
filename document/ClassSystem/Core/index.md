# Core Class
**MVC Framework \| Class System \| *Core***  
See Also: [**Core Guide**](../../Guide/Core/index.md)  
**Contents**  
 - [`Settings` Property](#settings-property)
 - [`Options` Property](#options-property)
 - [`constructor` Method](#constructor-method)
 - [Private Properties](#private-properties)
 - [Private Methods](#private-methods)
 - [Public Properties](#public-properties)
 - [Public Methods](#public-methods)
 - [Static Properties](#static-properties)

## `Settings` Property
```
{
  events: [],
  propertyClasses: {},
}
```
### `events` Setting
**Type**: `object`, `array`  
**Descript**:  
`object` or `array` describing events.  
#### Impanded Events (`object`)
```
{
  events: {
    'path.to.target click': function pathToTargetClick($event) {},
    ':scope click': function scopeClick($event) {}, 
    'click': function click($event) {}
  }
}
```
#### Expanded Events (`array`)
```
{
  events: [{
    path: 'path.to.target',
    type: 'click',
    listener: function pathToTargetClick($event) {},
    enable: false,
  }, {
    path: ':scope',
    type: ' click',
    listener: function scopeClick($event) {},
    enable: false,
  }, {
    path: '':
    type: 'click', 
    listener: function click($event) {},
    enable: false,
  }]
}
```
### `propertyClasses` Setting
Property Classes define serialized class instances using Property Class Definition objects.  
**Type**: `object`
#### Property Class Definition
***Exemplary `propertyClasses` Definition***:  
```
{
  propertyClasses: [{
    ID: "CORE",
    Class: Core,
    ClassInstantiator: function($propertyClass, $property, $value) {},
    ClassDeinstantiator: function($propertyClass, $property) {},
    Names: {
      Monople: { Formal: 'Core', Nonformal: 'core' },
      Multiple: { Formal: 'Cores', Nonformal: 'cores' },
      Minister: {
        Ad: { Formal: "Add", Nonformal: "add" }
        Dead: { Formal: "Remove", Nonformal: "remove" },
      },
    },
    Events: {
      Assign: 'addEventListener', Deassign: 'removeEventListener',
    },
  }]
}
```
***...produces***:  
```
Core {
  cores: {},
  addCores: function() { ... },
  removeCores: function() { ... },
}
```
#### Property Class Definition \| ID
**Type**: `String`    
**Required**: `true`  
**Default**:  `undefined`  
**Descript**: Identify Property Class Definition.  
#### Property Class Definition \| Class
**Type**: Provided Class  
**Required**: `true`  
**Default**:  `undefined`  
**Descript**: Some `Class` or `Function` that returns an assignatory value.  
#### Property Class Definition \| Class Instantiator
**Type**: `function`  
**Required**: `false`  
**Default**:  `CoreClassInstantiator`  
**Arguments**: `($propertyClass, $property, $value)`  
**Returns**:  Returns assignatory property value based on argumentative `$value` and `$propertyClass.Class` instantiation/evocation.  
#### Property Class Definition \| Class Deinstantiator
**Type**: `function`  
**Required**: `false`  
**Default**:  `CoreClassDeinstantiator`  
**Arguments**:  `($propertyClass, $property)`  
**Returns**: Returns `$propertyClass.target[$property]` (or `undefined`)  
**Descript**: Nonoperative function that may call any `$propertyClass.target[$property]` method prior to deletion.  
#### Property Class Definition \| Names.Monople.Formal
**Type**: `String`  
**Required**: `true`  
**Default**:  `undefined`  
**Descript**: Singular uppercase property class name.  
#### Property Class Definition \| Names.Monople.Nonformal
**Type**: `String`  
**Required**: `true`  
**Default**:  `undefined`   
**Descript**: Singular lowercase property class name.  
#### Property Class Definition \| Names.Multiple.Formal
**Type**: `String`  
**Required**: `true`  
**Default**:  `undefined`  
**Descript**: Plural uppercase property class name.  
#### Property Class Definition \| Names.Multiple.Nonformal
**Type**: `String`  
**Required**: `true`  
**Default**:  `undefined`  
**Descript**: Plural lowercase property class name.  
#### Property Class Definition \| Names.Minister.Ad.Formal
**Type**: `String`  
**Required**: `false`  
**Default**:  `Add`  
#### Property Class Definition \| Names.Minister.Ad.Nonformal
**Type**: `String`  
**Required**: `false`  
**Default**:  `add`  
#### Property Class Definition \| Names.Minister.Dead.Formal
**Type**: `String`  
**Required**: `false`  
**Default**:  `Remove`  
#### Property Class Definition \| Names.Minister.Dead.Nonformal
**Type**: `String`  
**Required**: `false`  
**Default**:  `remove`  
#### Property Class Definition \| Events.Assign
**Type**: `String`  
**Required**: `false`  
**Default**: "addEventListener"  
#### Property Class Definition \| Events.Deassign
**Type**: `String`  
**Required**: `false`  
**Default**: "removeEventListener"  

## `Options` Property
```
{
  assign: [],
  defineProperties: {},
  enableEvents: false,
}
```
### `assign` Option
### `defineProperties` Option
### `enableEvents` Option

## `constructor` Method
### `$settings` Argument
### `$options` Argument
### `super` Statement
### `constructor` Body

## Private Properties
### `#settings` Property
### `#options` Property
### `#events` Property
### `#key` Property
### `#path` Property
### `#parent` Property
### `#_propertyClassEvents` Property
### `#_propertyClasses` Property
### `#propertyClassEvents` Property
### `#propertyClasses` Property

## Private Methods
### `defineProperties` Method
### `assign` Method
### `toggleEventAbility` Method

## Public Properties
### `settings` Property
### `options` Property
### `events` Property
### `key` Property
### `path` Property
### `parent` Property
### `root` Property

## Public Methods
### `getEvents` Method
### `addEvents` Method
### `removeEvents` Method
### `enableEvents` Method
### `disableEvents` Method

## Static Properties