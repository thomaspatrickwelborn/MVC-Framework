# Array Trap Guide
**MVC Framework | Guide | Model \| Content \| Handler \| *Array***  
**Content**  
 - [Overview]()
 -  [Array Trap Methods]()
    - [`concat` Trap Method]()
    - [`fill` Trap Method,]()
    - [`concat` Trap Method,]()
    - [`copyWithin` Trap Method,]()
    - [`pop` Trap Method,]()
    - [`push` Trap Method,]()
    - [`reverse` Trap Method,]()
    - [`shift` Trap Method,]()
    - [`splice` Trap Method,]()
    - [`unshift` Trap Method,]()

## Overview
Array Trap Methods are Array Modifier Methods with Ventability and Validatability.   
## Array Trap Methods
```
const eventLog = ($event) => { console.log(
  "\n", "$event.type", $event.type,
  "\n", "$event.basename", $event.basename,
  "\n", "$event.path", $event.path,
  "\n", "$event.detail", $event.detail,
) }
```
### `concat` Trap Method
```
const array = new Content([])
array.addEventListener("concatValue", eventLog)
array.addEventListener("concat", eventLog)
let concatArray = array.concat({
  id: 0, propertyA: true, propertyB: true
}, {
  id: 1, propertyA: true, propertyB: false
}, {
  id: 2, propertyA: false, propertyB: false
}, {
  id: 3, propertyA: false, propertyB: true
})
console.log("concatArray.string", concatArray.string)
concatArray.addEventListener("concatValue", eventLog)
concatArray.addEventListener("concat", eventLog)
concatArray = concatArray.concat([{
  id: 4, propertyA: true, propertyB: true
}, {
  id: 5, propertyA: true, propertyB: false
}, {
  id: 6, propertyA: false, propertyB: false
}, {
  id: 7, propertyA: false, propertyB: true
}])
console.log("concatArray.string", concatArray.string)
```

### `copyWithin` Trap Method,
```
const array = new Content([{
  id: 0, propertyA: true, propertyB: true
}, {
  id: 1, propertyA: true, propertyB: false
}, {
  id: 2, propertyA: false, propertyB: false
}, {
  id: 3, propertyA: false, propertyB: true
}])
array.addEventListener("copyWithinIndex", eventLog)
array.addEventListener("copyWithin", eventLog)
array.length = 8
array.copyWithin(4, 0, 4)
```
### `fill` Trap Method,
```
array.length = 12
array.fill({
  id: -1, propertyA: undefined, propertyB: undefined
}, 8, array.length)
```
### `pop` Trap Method,
```
array.pop()
```
### `push` Trap Method,
```
array.push({
  id: -1, propertyA: undefined, propertyB: undefined
}, {
  id: -1, propertyA: undefined, propertyB: undefined
}, {
  id: -1, propertyA: undefined, propertyB: undefined
})
```
### `reverse` Trap Method,
```
array.reverse()
```
### `shift` Trap Method,
```
array.pop()
```
### `splice` Trap Method,
```
array.splice(0, 10)
```
### `unshift` Trap Method,
```
array.addEventListener("unshiftProp", )
array.unshift()
```