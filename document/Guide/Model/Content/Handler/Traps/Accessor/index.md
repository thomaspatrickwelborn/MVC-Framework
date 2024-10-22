# Accessor Trap Guide
**MVC Framework | Guide | Model \| Content \| Handler \| *Accessor***  
**Directory**  
 - [Overview]()
 - [Accessor Trap Methods]

## Overview

## Accessor Trap Methods
```
import { Content } from '/dependencies/mvc-framework.js'
const object = new Content({
  propertyA: {
    propertyB: {
      propertyC: 333
    }
  }
})
```
### `get` Trap Method
```
// Get All
object.get()
// Get Property A
object.get("propertyA")
// Get Property B
object.get("propertyA.propertyB")
// Get Property C
object.get("propertyA.propertyB.propertyC")
```
### `set` Trap Method
```
// Set All
object.set({ propertyA: { propertyB: { propertyC: "333333" } } })
// Set Property A
object.set("propertyA", { propertyB: { propertyC: "333333" } })
// Set Property B
object.set("propertyA.propertyB", { propertyC: "333333" })
// Set Property C
object.set("propertyA.propertyB.propertyC", "333333")
```
### `delete` Trap Method
```
// Delete All
object.delete()
// Delete Property A
object.delete("propertyA")
// Delete Property B
object.delete("propertyA.propertyB")
// Delete Property C
object.delete("propertyA.propertyB.propertyC")
```
