# Dynamic Event Target (DET) Guide
## Ventilated DET Object Modifier Functions
Ordered Object/Array/Map Property Modifier Function Event Emissions
### DET Object Events
**6** Object Property Modifier Functions  
**8** Object Property Modifier Function Event Emissions  
#### 1. Object Assign
**3** Object Assign Events
##### 1.1. assignSourceProperty
`assignSourceProperty` event occurs after each source property assignment to DET instance. 
```
{
  key,
  val,
  source,
}
```
##### 1.2. assignSource
`assignSource` event occurs after each source assignment to DET instance. 
```
{
  source,
}
```
##### 1.3. assign
`assign` event occurs after all sources assigned to DET instance. 
```
{
  sources
}
```
#### 2. Object Define Properties
**1** Object Define Properties Event
**Triggers** Define Property Event
##### 2.1. defineProperties
`defineProperties` event occurs after all properties defined on DET instance. 
```
{
  descriptors
}
```
#### 3. Object Define Property
**1** Object Define Property Events
##### 3.1. defineProperty
`defineProperty` event occurs after each property definition on DET instance. 
```
{
  prop,
  descriptor
}
```
#### 4. Object Freeze
**1** Object Freeze Event
##### 4.1. freeze
`freeze` event occurs after DET instance frozen. 
```
{}
```
#### 5. Object Seal
**1** Object Seal Event
##### 5.1. seal
`seal` event occurs after DET instance sealed. 
```
{}
```
#### 6. Object Set Prototype
**1** Object Set Prototype Event
##### 6.1. setPrototypeOf
`setPrototypeOf` event occurs after DET instance prototype is set. 
```
{
  prototype
}
```
### DET Object Examples
#### 1. DET Object Instantiation
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
##### 1.1. DET Object Event Listener Signment
```
function objectAssign($event) { console.log($event.type, $event.detail) }
object.addEventListener("assign", objectAssign)
object.assign({ aaa: 111111 })
// CONSOLE LOG: assign { sources: [{ aaa: 111111 }]
object.removeEventListener("assign", objectAssign)
object.assign({ aaa: 111111111 })
// CONSOLE LOG: EMPTY
```
### Ventilated DET Array Methods
**10** Array Property Modifier Functions
**16** Array Property Modifier Function Event Emissions
#### 1. Copy Within
##### 1.1. copyWithinIndex
##### 1.2. copyWithin
#### 2. Fill
##### 2.1. fillIndex
##### 2.2. fill
#### 3. Length
##### 3.1. lengthSet
#### 4. Push
##### 4.1. pushProp
##### 4.2. push
#### 5. Pop
##### 5.1. pop
#### 6. Reverse
##### 6.1. reverse
#### 7. Shift
##### 7.1. shift
#### 8. Sort
##### 8.1. sort
#### 9. Splice
##### 9.1. spliceDelete
##### 9.2. spliceAdd
##### 9.3. splice
#### 10. Unshift
##### 10.1. unshift
##### 10.2. unshiftProp