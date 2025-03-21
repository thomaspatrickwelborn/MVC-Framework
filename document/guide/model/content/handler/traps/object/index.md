# Object Traps Guide
**MVC Framework | Guide | Model \| Content \| Handler \| Traps \| *Object***  
**Content**  
 - [Overview]()
   - [`assign` Trap Method]()
   - [`defineProperties` Trap Method]()
   - [`defineProperty` Trap Method]()
   - [`freeze` Trap Method]()
   - [`seal` Trap Method]()
## Object Trap Methods
```
const eventLog = ($event) => { console.log(
  "\n", "$event.type", $event.type,
  "\n", "$event.basename", $event.basename,
  "\n", "$event.path", $event.path,
  "\n", "$event.detail", $event.detail,
) }
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
object.addEventListener("assign", eventLog)
object.addEventListener("assignSource", eventLog)
object.addEventListener("assignSourceProperty", eventLog)
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
object.addEventListener("defineProperties", eventLog)
object.defineProperties({
  propertyJ: {
    value: {
      propertyK: {
        value: {
          propertyL: { value: 121212 }
        }
      }
    }
  }
})
```
### `defineProperty` Trap Method
```
object.addEventListener("defineProperty", eventLog)
object.defineProperty({
  propertyJ: {
    value: {
      propertyK: {
        value: {
          propertyM: { value: "MMM" }
        }
      }
    }
  }
})
```
### `freeze` Trap Method
### `seal` Trap Method