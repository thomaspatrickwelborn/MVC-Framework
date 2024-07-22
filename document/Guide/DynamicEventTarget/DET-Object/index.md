# Dynamic Event Target (DET) Object
Dynamic Event Target (DET) ventilates Object Property Modifier Functions: 
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
## DET Object Instantiation
### Object Creation
#### New DET Object
```
const object = new DynamicEventTarget({
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
### Object Event Listener Signment
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
### 1. Object Assign
#### 1.1. assignSourceProperty
`assignSourceProperty` event occurs after each source property assignment to DET instance. 
```

{
  key,
  val,
  source
}
```
#### 1.2. assignSource
`assignSource` event occurs after each source assignment to DET instance. 
```
{
  source
}
```
#### 1.3. assign
`assign` event occurs after all sources assigned to DET instance. 
```
{
  sources
}
```
### 2. Object Define Properties
**Triggers** Define Property Event
#### 2.1. defineProperties
`defineProperties` event occurs after all properties defined on DET instance. 
```
{
  descriptors
}
```
### 3. Object Define Property
#### 3.1. defineProperty
`defineProperty` event occurs after each property definition on DET instance. 
```	
{	
  prop,
  descriptor
}	
```	

### 4. Object Freeze
#### 4.1. freeze
`freeze` event occurs after DET instance frozen. 
```
{}
```
### 5. Object Seal
#### 5.1. seal
`seal` event occurs after DET instance sealed. 
```
{}
```
### 6. Object Set Prototype
#### 6.1. setPrototypeOf
`setPrototypeOf` event occurs after DET instance prototype is set. 
```
{
  prototype
}
```