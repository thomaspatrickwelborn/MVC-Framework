# Content Guide
**MVC Framework \| Guide \| Model \| *Content***  
*See also*: [Content Class](../../../ClassSystem/Model/Content/index.md)  
**Directory**  
 - [Handler Guide](./Handler/index.md)

**Contents**:  
 - [Overview]()
 - [Property Location]()
   - [Property Location Propriation]()
     - [Property Keys/Values]()
     - [Enumerable Proxy Properties]()
     - [Proxy Properties]()
  - [Proxy Property Accessors]()
 - [Content Instantiation]()
   - [Object Content]()
   - [Array Content]()
## Overview
 - Validates, Stores, and Ventilates `object` literal, `array` literal content.  
 - Ministrates stored content through Handler Traps. 
 - Exposes Object, Array, EventTarget, Accessor methods and properties through Root Proxy

## Property Location
 - Property location established by property `path`, `basename`, and `parent`.  
### Property Location Propriation
#### Property Keys/Values
```
const $propertyD = Number()
const $propertyDKey = "propertyD"
const $propertyC = { [$propertyDKey]: $propertyD}
const $propertyCKey = "propertyC"
const $propertyB = { [$propertyCKey]: $propertyC }
const $propertyBKey = "propertyB"
const $propertyA = { [$propertyBKey]: $propertyB }
const $propertyAKey = "propertyA"
const $property = new Content({ [$propertyAKey]: $propertyA })
```
#### Enumerable Proxy Properties
```
Content {
  propertyA: {
    propertyB: {
      propertyC: {
        propertyD: 0
      }
    }
  }
}
```
#### Proxy Properties
```
Content {
  parent: null,
  basename: null,
  path: null,
  propertyA: {
    parent: $property,
    basename: "propertyA",
    path: "propertyA",
    propertyBKey: {
      parent: $propertyA,
      basename: "propertyBKey",
      path: "propertyA.propertyBKey",
      propertyC: {
        parent: $propertyB,
        basename: "propertyC",
        path: "propertyA.propertyB.propertyC",
        propertyD: 0
      }
    }
  }
}
```
### Proxy Property Accessors
#### Get Property
```
const propertyC = $property.get(`${propertyAKey}.${propertyBKey}.${propertyCKey}`)
console.log(propertyC.parent.parent.parent === $property)
// true
console.log(propertyC.basename)
// "propertyC"
console.log(propertyC.path)
// "propertyA.propertyB.propertyC"
```

## Content Instantiation
```
import { Content } from '/dependencies/mvc-framework.js'
const $objectSchema = {
  aaa: { type: { bbb: { type: ccc: { type: Number } } } }
}
const $objectContent = {
  aaa: { bbb: { ccc: 333 } }
}
const $objectEventType = 'setProperty'
const $arraySchema = [$objectSchema]
const $arrayContent = [$objectContent]
const $arrayEventType = 'pushProperty'
const $eventListener = ($event) => { console.log($event.type, $event) }
```
### Object Content
```
const objectContent = new Content($objectContent, $objectSchema)
objectContent.get("aaa.bbb").addEventListener($objectEventType, $eventListener)
objectContent.set("aaa.bbb.ccc", 333333)
```
### Array Content
```
const arrayContent = new Content($arrayContent, $arraySchema)
arrayContent.addEventListener($arrayEventType, $eventListener)
arrayContent.push(
  { aaa: { bbb: { ccc: 666 } } },
  { aaa: { bbb: { ccc: 999 } } },
)
```
