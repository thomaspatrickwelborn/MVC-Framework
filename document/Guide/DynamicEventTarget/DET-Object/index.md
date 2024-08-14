# Dynamic Event Target (DET) Object
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
## DET Object Importation
```
import { DET } from '/dependencies/mvc-framework.js'
```
## DET Object Instantiation
### DET Object Creation
#### New DET Object
```
const object = new DET({
  aaa: 111,
  bbb: true,
  ccc: "333",
  ddd: {
    eee: 555,
    fff: false,
    ggg: "777",
    hhh: {
      iii: 999,
      jjj: null,
      kkk: "111111"
    }
  }
})
```
### DET Object Parsement
#### Parse
```
object.parse()
```
#### Inspect
```
object.inspect()
```
### DET Object Event Listener Signment
#### Add Event Listener
```
function objectAssign($event) {
  console.log($event.type, $event.detail)
}
object.addEventListener("assign", objectAssign)
object.assign({ aaa: 111111 })

// CONSOLE LOG: assign { sources: [{ aaa: 111111 }]
```
#### Remove Event Listener
```
object.removeEventListener("assign", objectAssign)
object.assign({ aaa: 111111111 })
// CONSOLE LOG: EMPTY
```
## DET Object Ventilation
### 1. DET Object Assign Events
#### 1.1. "assignSourceProperty" Event
`assignSourceProperty` event occurs after each source property assignment to DET instance. 
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
#### 1.2. "assignSource" Event
`assignSource` event occurs after each source assignment to DET instance. 
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
```
{
  prototype
}
```
|Property Key|Property Val Type|Property Description|
|-|-|-|
|prototype|Any|Set Prototype|