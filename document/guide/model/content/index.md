| [MVC Framework](../../../../README.md) | [Guide](../../index.md) | [Model](../index.md) | *Content Class* |
| :-- | :-- | :-- | :-- |
# MVC Framework Guide \| `Content` Class

## Introduction
 - Manage structured content using familiar JS `Object`, `Array`, `EventTarget` APIs.  
 - Schematize data structures with property validators.  
 - Capture **content *and* validation events** for property changes (includes **nested** property events).  

## Impetus
 - Frontend, backend applications often require or benefit from structured content with validatable schema.  
 - Changes to structured content often result in some futher change to a visual interface or database.  
 - There are limited libraries with Browser/NodeJS compatibility that manage schematized content with validators or capture nested property change events.  

## Impact
 - Manage structured content for primitive/non-primitive data types: 
   - `string`, `number`, `bigint`, `boolean`, `undefined`, `null` primitives; 
   - `object`, `array` non-primitives. 
 - Schematize content with property definitions validators.  
   - `type`, `required`, `match`, `enum`, `range`, `length` and custom validators.  
 - Capture content and validation events for any any methods that modify content.  
   - `Object` Events: `assign`, `defineProperties`, `defineProperty`, `freeze`, and `seal`.  
   - `Array` Events: `concat`, `copyWithin`, `fill`, `pop`, `push`, `reverse`, `shift`, `splice`, and `unshift`.  
   - `Accessor` Events: `get`, `set`, `delete`  

## Illustrations
```
import { Content } from 'mvc-framework'
```
### Content Object
```
const object = new Content({})
object.addEventListener('assign', eventLog)
object.assign({
  propertyA: { propertyB: propertyC: 333 },
  propertyD: [{
    propertyE: 555
  }],
  propertyF: false,
})
```
```
function eventLog($event) {
  console.log($event.type, $event.path, $event.detail)
}
```