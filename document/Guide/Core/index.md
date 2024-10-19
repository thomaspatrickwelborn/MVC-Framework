# MVC Framework - Core Guide
 - [Event Formats]()
   - [Impanded Events Format]()
     - [Impanded Event Listener]()
     - [Impanded Event Listener With Options]()
   - [Expanded Events Format]()
 - [Core Instantiation]()
 - [Core Ministration]()
   - [Filter Events]()
     - [Get `enabled` Events]()
     - [Get `type` Events]()
     - [Get `path` Events]()
     - [Get `listener` Events]()
     - [Get `enabled`, `type`, `path`, `listener` Events]()
   - [Add, Remove, Enable, Disable All Events]()
     - [Add All Events]()
     - [Remove All Events]()
     - [Enable All Events]()
     - [Disable All Events]()
   - [Add, Remove, Enable, Disable Expanded Events]()
     - [Add Expanded Events]()
     - [Remove Expanded Events]()
     - [Enable Expanded Events]()
     - [Disable Expanded Events]()
   - [Add, Remove, Enable, Disable Impanded Events]()
     - [Add Impanded Events]()
     - [Remove Impanded Events]()
     - [Enable Impanded Events]()
     - [Disable Impanded Events]()
 - [Core Extension]()

## Event Formats
### Event Properties
```
const $type = "click"
const $path = "eventTargetProperty"
const $listener = ($event) => {
  console.log($event.type, $event.currentTarget)
}
const $options = {}
```
### Impanded Events Format
 - Object literal with property keys containing `$path`, `$type` properties and property values containing `$listener`, `$options` properties.  
 - Events ministrated nonsequentially. 
#### Impanded Event Listener
 - Property key contains `$path`, `$type` properties. 
 - Property value is `$listener`. 
```
const $events = {
  [`${$path} ${$type}`]: $listener
}
```
#### Impanded Event Listener With Options
 - Property key contains `$path`, `$type` properties. 
 - Property value is Array literal containing `$listener`, `$options` properties. 
```
const $events = {
  [`${$path} ${$type}`]: [$listener, $options]
}
```
### Expanded Events Format
 - Array literal containing object literals with `type`, `path`, `listener`, and `options` properties.  
 - Events ministrated sequentially. 
```
const $events = [{
  type: $type,
  path: $path,
  listener: $listener,
  options: $options,
}]
```
## Core Instantiation
```
import { Core } from 'mvc-framework'
const core = new Core({
  eventTargetProperty: document.querySelector('body'),
  events: $events,
}, { defineProperties: {
  "eventTargetProperty": {
    enumerable: false,
    writable: false,
    configurable: false,
  }
} })
```
## Core Ministration
### Filter Events
#### Get `enabled` Events
```
core.getEvents([{ enabled: true }])
```
#### Get `type` Events
```
core.getEvents([{ type: $type }])
```
#### Get `path` Events
```
core.getEvents([{ path: $path }])
```
#### Get `listener` Events
```
core.getEvents([{ listener: $listener }])
```
#### Get `enabled`, `type`, `path`, `listener` Events
```
core.getEvents([{
  type: $type,
  path: $path,
  listener: $listener,
  enable: true,
}])
```
### Add, Remove, Enable, Disable All Events
#### Add All Events *(from `settings` property)*
```
core.addEvents()
```
#### Remove All Events *(from `events` property)*
```
core.removeEvents()
```
#### Enable All Events *(from `events` property)*
```
core.enableEvents()
```
#### Disable All Events *(from `events` property)*
```
core.disableEvents()
```

### Add, Remove, Enable, Disable Expanded Events 
#### Add Expanded Event
```
core.addEvents([{
  type: $type,
  path: $path,
  listener: $listener,
  options: $options
}])
```
#### Remove Expanded Event
*Remove events with matching `$type`, `$path`, `$listener` properties.*  
```
core.removeEvents([{
  type: $type,
  path: $path,
  listener: $listener,
}])
```
#### Enable Expanded Event 
*Enable events with matching `$type`, `$path` properties.*  
```
core.enableEvents([{
  type: $type,
  path: $path,
}])
```
#### Disable Expanded Event 
*Disable events with matching `$type`, `$path`, `$listener` properties.*  
```
core.enableEvents([{
  type: $type,
  path: $path,
  listener: $listener,
}])

```

### Add, Remove, Enable, Disable Impanded Events 
#### Add Impanded Event
```
core.addEvents({
  [`${$path} ${$type}`]: $listener
})
```
#### Add Impanded Events With Options
```
core.addEvents({
  [`${$path} ${$type}`]: [$listener, $options]
})
```
#### Remove Impanded Event
*Remove events with matching `$path`, `$type`.*  
```
core.removeEvents({
  [`${$path} ${$type}`]: undefined
})
```
*Remove events with matching `$path`, `$type`, `$listener`.*  
```
core.removeEvents({
  [`${$path} ${$type}`]: $listener
})
```
#### Enable Impanded Event
*Enable events with matching `$path`.*  
```
core.enableEvents({
  [`${$path}`]: undefined
})
```
#### Disable Impanded Event
*Disable events with matching `$path`, `$type`, `$listener`.*  
```
core.disableEvents({
  [`${$path} ${$type}`]: $listener
})
```

## Core Extension


