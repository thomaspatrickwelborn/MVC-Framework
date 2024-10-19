# MVC Framework - Core Class
 - Defines `settings` and `options` properties.  
 - Ventilates pathed Event Target properties.  

## Public Properties
### `settings` Property
**Type**: `getter`, `setter`  
**Inturn**:  
```
{
  events: $events
}
```
**Return**: `#_settings`  
**Descript**:  

### `options` Property
**Type**: `object`  
**Inturn**:  
```
{
  defineProperties: $defineProperties,
  assignProperties: $assignProperties,
  enableEvents: $enableEvents,
}
```
### `events` Property
**Type**: `getter`  
**Return**: `#_events` Property  


## Public Methods
### `addEvents` Method
**Type**: `function`  
### `removeEvents` Method
### `enableEvents` Method
### `disableEvents` Method


## Private Methods
### `#assignProperties` Method
### `#defineProperties` Method
### `#toggleEventAbility` Method

## Private Properties
### `#_settings` Property
**Type**: `object`  
### `#_options` Property
**Type**: `object`  
### `#_events` Property
**Type**: `object`   


## Events
```
const $eventType = "click"
const $eventTargetPath = "eventTargetProperty"
const $eventCallback = ($event) => {
  console.log($event.type, $event.currentTarget)
}
```
### Impanded Event Format
```
const $events = {
  [`${$eventTargetPath} ${$eventType}`]: $eventCallback
}
```
### Expanded Event Format
```
const $events = [{
  type: $eventType,
  target: $eventTargetPath,
  callback: $eventCallback,
}]
```
### Core Instantiation
```
import { Core } from 'mvc-framework'
const core = new Core({
  eventTargetProperty: document.querySelector('body'),
  events: $events,
}, { defineProperties: {
  "eventTargetProperty": { enumerable: true, writable: true, configurable: true }
} })
```
### Ministration
```
// Enable All Events (from events property)
core.enableEvents()
// Disable All Events (from events property)
core.disableEvents()
// Add All Events (from settings property)
core.addEvents()
// Remove All Events (from events property)
core.removeEvents()
core.enableEvents({

})
```

## References
**Class Extensions**:  
 - [Model](../Model/index.md)
 - [View](../View/index.md)
 - [Control](../Control/index.md)
 - [FetchRouter](../Router/Fetch/index.md)
 - [LocationRouter](../Router/Location/index.md)
