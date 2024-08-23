# Dynamic Event Target (DET) Object
- [Overview](#overview)
- [Importation](#importation)
- [Instantiation](#instantiation)
- [Parsement](#parsement)
  - [Parse Object](#parse-object)
  - [Parse JSON](#parse-json)
- [DET Object Event Listener Signment](#det-object-event-listener-signment)
  - [Add Event Listener - Base Object](#add-event-listener---base-object)
    - [Assign Base-Referenced Object Property](#assign-base-referenced-object-property)
    - [Assign Base-Referenced Subbase Object Property](#assign-base-referenced-subbase-object-property)
  - [Add Event Listener - Subbase Object](#add-event-listener---subbase-object)
    - [Assign subbase object property](#assign-subbase-referenced-object-property)
    - [Assign Subbase-Referenced Subbbase Object Property](#assign-subbase-referenced-subbbase-object-property)
  - [Remove Event Lister](#remove-event-listener)
    - [Remove Base-Referenced Event Listener](#remove-base-referenced-event-listener)
    - [Remove Subbased-Referenced Event Listener](#remove-subbased-referenced-event-listener)
- [DET Object Ventilation](#det-object-ventilation)
  - [1. DET Object Assign Events](#1-det-object-assign-events)
    - [1.1. "assignSourceProperty Event"](#11-assignsourceproperty-event)
    - [1.2. "assignSource" Event](#12-assignsource-event)
    - [1.3. "assign" Event](#13-assign-event)
  - [2. DET Object Define Properties Events](#2-det-object-define-properties-events)
    - [2.1. "defineProperties" Event](#21-defineproperties-event)
  - [3. DET Object Define Property Events](#3-det-object-define-property-event)
    - [3.1. "defineProperty" Event](#31-defineproperty-event)
  - [4. DET Object Freeze Event](#4-det-object-freeze-event)
    - [4.1. "freeze" Event](#41-freeze)
  - [5. Object Seal](#5-object-seal)
    - [5.1. "seal" Event](#51-seal)
  - [Object Set Prototype](#6-object-set-prototype)
    - ["setPrototypeOf" Event](#61-setprototypeof)
## Overview
Dynamic Event Target (DET) ventilates **Object Property Modifier Functions**: 
- **6** Object Property Modifier Functions  
- **8** Object Property Modifier Function Event Emissions  
1. **Object Assign**
   1. assignSourceProperty
   2. assignSource
   3. assign
2. **Object Define Properties**
   1. defineProperties
3. **Object Define Property**
   1. defineProperty
4. **Object Freeze**
   1. freeze
5. **Object Seal**
   1. seal
6. **Object Set Prototype**
   1. setPrototypeOf
## Importation
```
import { DET } from '/dependencies/mvc-framework.js'
```
## Instantiation
### New DET Object
```
const object = new DET({
  aaa: 111,
  bbb: 222,
  ccc: {
    ddd: 444,
    eee: 555,
    fff: {
      ggg: 777
    }
  }
})
```
## Parsement
### Parse Object
```
object.parse()
```
*Returns Plain JS Object*  
```
{
  aaa: 111,
  bbb: 222,
  ccc: {
    ddd: 444,
    eee: 555,
    fff: {
      ggg: 777
    }
  }
}
```
### Parse JSON
```
object.parse({
  type: "JSON"
})
```
*Returns JSON String*  
```
{
  "aaa": 111,
  "bbb": 222,
  "ccc": {
    "ddd": 444,
    "eee": 555,
    "fff": {
      "ggg": 777
    }
  }
}
```
## DET Object Property Signment
## DET Object Event Listener Signment
For demonstration purposes, a simple event logger:  
```
function DETEventLog($event) {
  console.log(
    '\n', 'basename', $event.basename, 
    '\n', 'path', $event.path,
    '\n', 'type', $event.type, 
    '\n', 'detail', JSON.stringify(
      $event.detail, null, 2
    )
  )
}
```
### Add Event Listener - Base Object
```
object.addEventListener('assign', DETEventLog)
```
#### Assign Base-Referenced Object Property
```
object.assign({
  aaa: 111111
})
```
##### Emits DynamicEvent
```
basename null 
path null 
type assign 
detail {
  "sources": [
    {
      "aaa": 111111
    }
  ]
}
```
#### Assign Base-Referenced Subbase Object Property
```
object.assign({
  ccc: {
    ddd: 444444
  }
})
```
##### Emits DynamicEvents
###### Event Log #1
```
basename ccc 
path ccc 
type assign 
detail {
  "sources": [
    {
      "ddd": 444444
    }
  ]
}
```
###### Event Log #2
```
basename null 
path null 
type assign 
detail {
  "sources": [
    {
      "ccc": {
        "ddd": 444444
      }
    }
  ]
}
```
### Add Event Listener - Subbase Object
```
object.ccc.addEventListener("assign", DETEventLog)
```
#### Assign Subbase-Referenced Object Property
```
object.ccc.assign({
  ddd: 444444444
})
```
##### Emits DynamicEvent
```
basename ccc 
path ccc 
type assign 
detail {
  "sources": [
    {
      "ddd": 444444444
    }
  ]
}
```
#### Assign Subbase-Referenced Subbbase Object Property
```
object.ccc.fff.assign({
  ggg: 777777
})
```
##### Emits DynamicEvent
```
basename fff 
path ccc.fff 
type assign 
detail {
  "sources": [
    {
      "ggg": 777777
    }
  ]
}
```
### Remove Event Listener
#### Remove Base-Referenced Event Listener
```
object.removeEventListener("assign", DETEventLog)
object.assign({ aaa: 111111111 })
```
##### Emits Nothing
#### Remove Subbased-Referenced Event Listener
```
object.ccc.removeEventListener("assign", DETEventLog)
object.ccc.assign({
  ddd: 444444444
})
```
##### Emits Nothing
## DET Object Ventilation
### 1. DET Object Assign Events
#### 1.1. "assignSourceProperty" Event
`assignSourceProperty` event occurs after each source property assignment to DET instance. 
##### Event Detail
```
{
  key,
  val,
  source
}
```
|Property Key|Property Val Type|Property Description|
|-|-|-|
|key|String, Number|Assigned Source Property Key|
|val|Any|Assigned Source Property Val|
|source|Object|Assigned Source|
##### Subbase-Referenced Property Assignment
```
object.ccc.assign({
  eee: 555
})
```
#### 1.2. "assignSource" Event
`assignSource` event occurs after each source assignment to DET instance.  
##### Event Detail
```
{
  source
}
```
|Property Key|Property Val Type|Property Description|
|-|-|-|
|source|Object|Assigned Source|
#### 1.3. "assign" Event
`assign` event occurs after all sources assigned to DET instance.  
##### Event Detail
```
{
  sources
}
```
|Property Key|Property Val Type|Property Description|
|-|-|-|
|sources|Object|Assigned Sources|
### 2. DET Object Define Properties Events
**Triggers** Define Property Events before Define Properties Event
#### 2.1. "defineProperties" Event
`defineProperties` event occurs after all properties defined on DET instance.  
##### Event Detail
```
{
  descriptors
}
```
|Property Key|Property Val Type|Property Description|
|-|-|-|
|descriptors|Object|Assigned Property Descriptors|
### 3. DET Object Define Property Event
#### 3.1. "defineProperty" Event
`defineProperty` event occurs after each property definition on DET instance. 
##### Event Detail
```	
{	
  prop,
  descriptor
}	
```	

|Property Key|Property Val Type|Property Description|
|-|-|-|
|prop|String|Property Key|
|descriptor|Object|Assigned Property Descriptor|
### 4. DET Object Freeze Event
#### 4.1. freeze
`freeze` event occurs after DET instance frozen.
##### Event Detail
```
{
  isFrozen
}
```
|Property Key|Property Val Type|Property Description|
|-|-|-|
|isFrozen|Boolean|Frozen Property Is Frozen|
### 5. Object Seal
#### 5.1. seal
`seal` event occurs after DET instance sealed. 
##### Event Detail
```
{
  isSealed
}
```
|Property Key|Property Val Type|Property Description|
|-|-|-|
|isSealed|Boolean|Sealed Property Is Frozen|
### 6. Object Set Prototype
#### 6.1. setPrototypeOf
`setPrototypeOf` event occurs after DET instance prototype is set. 
##### Event Detail
```
{
  prototype
}
```
|Property Key|Property Val Type|Property Description|
|-|-|-|
|prototype|Any|Set Prototype|