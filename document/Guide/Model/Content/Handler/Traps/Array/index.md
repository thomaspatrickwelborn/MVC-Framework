# Array Trap Guide
**MVC Framework | Guide | Model \| Content \| Handler \| *Array***  
**Directory**  
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
const array = new Content([{
  id: 0, propertyA: true, propertyB: true
}, {
  id: 1, propertyA: true, propertyB: false
}, {
  id: 2, propertyA: false, propertyB: false
}, {
  id: 3, propertyA: false, propertyB: true
}])
```
### `concat` Trap Method
```
const concatArray = content.concat({
  id: 4, propertyA: true, propertyB: true
}, {
  id: 5, propertyA: true, propertyB: false
}, {
  id: 6, propertyA: false, propertyB: false
}, {
  id: 7, propertyA: false, propertyB: true
})
```
### `copyWithin` Trap Method,
```
array.length = 12
array.copyWithin(8, 4, 8)
```
### `fill` Trap Method,
```
array.length = 16
array.fill({
  id: -1, propertyA: undefined, propertyB: undefined
}, 12, array.length)
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
array.unshift()
```