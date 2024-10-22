# Object Trap Guide
**MVC Framework | Guide | Model \| Content \| Handler \| *Object***  
**Directory**  
 - [Overview]()
   - [`assign` Trap Method]()
   - [`defineProperties` Trap Method]()
   - [`defineProperty` Trap Method]()
   - [`freeze` Trap Method]()
   - [`seal` Trap Method]()
## Object Trap Methods
```
const object = new Content({
  propertyA: {
    propertyB: {
      propertyC: 333,
      propertyD: "DDD",
      propertyE: false
    }
  },
  propertyF: {
    propertyG: {
      propertyH: 888,
      propertyI: "III",
      propertyJ: true
    }
  }
})
```
### `assign` Trap Method
```
object.assign({
  propertyA: {
    propertyB: {
      propertyC: 333333
    }
  }
}, {
  propertyF: {
    propertyG: {
      propertyI: "IIIIII"
    }
  }
})
```
### `defineProperties` Trap Method
```
object.defineProperties({
  propertyJ: {
    value: {
      propertyK: {
        value: {
          propertyL: { value: 121212 },
          propertyM: { value: "MMM" }
        }
      }
    }
  }
})
```
### `defineProperty` Trap Method
```
```
### `freeze` Trap Method
### `seal` Trap Method