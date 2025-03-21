# Array Trap Guide
**MVC Framework | Guide | Model \| Content \| Handler \| *Array***  
**Content**  
 - [Overview]()
 -  [Array Trap Methods]()
    - [`concat` Trap Method]()
    - [`fill` Trap Method]()
    - [`concat` Trap Method]()
    - [`copyWithin` Trap Method]()
    - [`pop` Trap Method]()
    - [`push` Trap Method]()
    - [`reverse` Trap Method]()
    - [`shift` Trap Method]()
    - [`splice` Trap Method]()
    - [`unshift` Trap Method]()

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
})
concatArray.addEventListener("concatValue", eventLog)
concatArray.addEventListener("concat", eventLog)
concatArray = concatArray.concat([{
  id: 2, propertyA: false, propertyB: false
}, {
  id: 3, propertyA: false, propertyB: true
}])
```

### `copyWithin` Trap Method
```
const array = new Content([{
  id: 0, propertyA: true, propertyB: true
}, {
  id: 1, propertyA: true, propertyB: false
}])
array.addEventListener("copyWithinIndex", eventLog)
array.addEventListener("copyWithin", eventLog)
array.length = 8
array.copyWithin(4, 0, 4)
```
### `fill` Trap Method
```
const array = new Content([])
array.addEventListener("fillIndex", eventLog)
array.addEventListener("fill", eventLog)
array.length = 4
array.fill({
  id: -1, propertyA: undefined, propertyB: undefined
}, 0, array.length)
```
### `pop` Trap Method
```
const array = new Content([{
  id: 0, propertyA: true, propertyB: true
}, {
  id: 1, propertyA: true, propertyB: false
}])
array.addEventListener("pop", eventLog)
array.pop()
array.pop()
```
### `push` Trap Method
```
const array = new Content([])
array.addEventListener("pushProp", eventLog)
array.addEventListener("push", eventLog)
array.push({
  id: 0, propertyA: true, propertyB: true
}, {
  id: 1, propertyA: true, propertyB: false
})
```
### `reverse` Trap Method
```
const array = new Content([{
  id: 0, propertyA: true, propertyB: true
}, {
  id: 1, propertyA: true, propertyB: false
}])
array.addEventListener("reverse", eventLog)
array.reverse()
```
### `shift` Trap Method
```
array.shift()
```
### `splice` Trap Method
```
const array = new content([{
  id: 0, propertyA: true, propertyB: true
}, {
  id: 1, propertyA: true, propertyB: false
}, {
  id: 2, propertyA: true, propertyB: true
}, {
  id: 3, propertyA: true, propertyB: false
}])
array.addEventListener("spliceDelete", eventLog)
array.addEventListener("spliceAdd", eventLog)
array.addEventListener("splice", eventLog)
array.splice(0, 4, {
  id: 0, propertyA: true, propertyB: true
}, {
  id: 1, propertyA: true, propertyB: false
}, {
  id: 2, propertyA: true, propertyB: true
}, {
  id: 3, propertyA: true, propertyB: false
})
```
### `unshift` Trap Method
```
const array = new content([{
  id: 0, propertyA: true, propertyB: true
}, {
  id: 1, propertyA: true, propertyB: false
}])
array.addEventListener("unshiftProp", eventLog)
array.addEventListener("unshift", eventLog)
array.unshift({
  id: 2, propertyA: true, propertyB: true
}, {
  id: 3, propertyA: true, propertyB: false
})
```