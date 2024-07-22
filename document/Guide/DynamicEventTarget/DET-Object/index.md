# DET Object
Dynamic Event Target (DET) ventilates Object Modifier Functions
## DET Object Instantiation
### Object Creation
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
**6** Object Property Modifier Functions  
**8** Object Property Modifier Function Event Emissions  
1. Object Assign
   1. assignSourceProperty
   2. assignSource
   3. assign
2. Object Define Properties
   1. defineProperties
3. Object Define Property
   1.defineProperty
4. Object Freeze
   1. freeze
5. Object Seal
   1. seal
6. Object Set Prototype
   1. setPrototypeOf
### 1. Object Assign