# Accessor Traps
**MVC Framework \| Class System \| Model \| Content \| Handler \| Traps \| *Accessor***  
**Content**  
 - [Accessor Handler Trap Options]()
   - [`set` Options]()
   - [`get` Options]()
   - [`delete` Options]()
 - [Accessor Handler Trap Methods]()
   - [`set` Method]()
   - [`get` Method]()
   - [`delete` Method]()
 - [Accessor Handler Trap Events]()

## Accessor Handler Trap Options
Accessor Handler Trap Options are defined with new `Content` Instance creation. 
```
import { Content } from 'mvc-framework'
const $contentOptions = {
  pathkey: true,
  subpathError: true,
  traps: {
    accessor: {
      get: {
        pathkey: true,
        subpathError: true,
        events: [
          'get',
          'getProperty'
        ],
      },
      set: {
        pathkey: true,
        subpathError: true,
        recursive: true,
        events: [
          'set',
          'setProperty'
        ],
      },
      delete: {
        pathkey: true,
        subpathError: true,
        events: [
          'delete',
          'deleteProperty'
        ],
      },
    }
  }
}
const content = new Content({}, null, $contentOptions)
```
### `get`, `set`, `delete` Shared Options
 - Shared Accessor Options may be set as `content` options or overriden as `content.traps.accessor.get`, `content.traps.accessor.set`, and `content.traps.accessor.delete`.  
**All Accessor Methods**:  
```
const content = new Content({}, null, {
  pathkey: false,
  subpathError: false,
})
```
**Individual Accessor Methods**:  
```
const content = new Content({}, null, {
  traps: { accessor: {
    get: { pathkey: false, subpathError: false },
    set: { pathkey: false, subpathError: false },
    delete: { pathkey: false, subpathError: false },
  } }
})
```
#### `pathkey` Option
**Type**: `Boolean`  
**Default**: `true`  
**Descript**:  
 - When `true`, properties accessed through dot-notation path.  
 - When `false`, properties accessed through key. 
##### `pathkey`: `true`
```
const content = new Content({
  propertyA: {
    propertyB: {
      propertyC: "CCC"
    }
  }
}, null, { pathkey: true })
console.log(
  content.get("propertyA.propertyB.propertyC")
)
// LOG: "CCC"
```
##### `pathkey`: `false`
Path accessor notation disabled, returns `undefined`.  
```
const content = new Content({
  propertyA: {
    propertyB: {
      propertyC: "CCC"
    }
  }
}, null, { pathkey: false })
console.log(
  content.get("propertyA.propertyB.propertyC")
)
// LOG: undefined
```
##### `pathkey` Escape
Quotation enclosures escape path accessor notation.  
```
const content = new Content({
  "propertyA.propertyB.propertyC": 333,
  propertyA: {
    propertyB: {
      propertyC: "CCC"
    }
  }
}, null, { pathkey: true })
console.log(
  content.get("\"propertyA.propertyB.propertyC\"")
)
// LOG: 333
console.log(
  content.get("propertyA.propertyB.propertyC")
)
// LOG: "CCC"
```
#### `subpathError` Option
**Type**: `Boolean`  
**Default**: `false`  
**Descript**:  
 - When `true` and `pathkey` is `true`, throws error when no subpath exists.  
 - When `false` and `pathkey` is `true`, returns `undefined` when no subpath exists.  
##### `subpathError`: `true`  
```
const content = new Content({
  propertyA: {}
})
console.log(
  content.get("propertyA.propertyB.propertyC")
)
// LOG: Uncaught TypeError: Cannot read properties of undefined
```
##### `subpathError`: `false`  
```
const content = new Content({
  propertyA: {}
})
console.log(
  content.get("propertyA.propertyB.propertyC")
)
// LOG: undefined
```

### `get` Options
#### `get.events` Option
**Type**: `Array`  
**Descript**:  
 - There are two types of events:  `get` and `getProperty`.  
 - Empty array indicates no events.  


### `set` Options
#### `set.pathkey` Option
#### `set.recursive`
#### `set.events` Option
##### `set` Event Type
##### `setProperty` Event Type


### `delete` Options
#### `delete.pathkey` Option
#### `delete.events` Option
##### `delete` Event Type
##### `deleteProperty` Event Type


## Accessor Handler Trap Methods
### `get` Method
Accepts zero, one, or two arguments:  
```
content.get()
content.get($contentOptions)
content.get($propertyPath)
content.get($propertyPath, $contentOptions)
```
#### `get` Arguments
##### `$propertyPath` Argument
**Type**: `String` Literal
**Descript**:  
 - Dot-notation path to property, or property key.  


### `set` Method
Accepts one, two, or three arguments:  
```
content.set($propertyTree)
content.set($propertyTree, $contentOptions)
content.set($propertyPath, $propertyValue)
content.set($propertyPath, $propertyValue, $contentOptions)
```
#### `set` Arguments
##### `$propertyTree` Argument
**Type**: `Object` Literal, `Array` Literal, `Content` Instance
**Descript**: 
##### `$propertyPath` Argument
**Type**: `String` Literal
**Descript**:  
Dot-notation path to property, or property key.  
##### `$propertyValue` Argument
**Type**: `Mixed`  
**Descript**:  
Property value assigned to `$propertyPath`.  


### `delete` Method
Accepts zero, one, or two arguments:  
```
content.delete()
content.delete($contentOptions)
content.delete($propertyPath)
content.delete($propertyPath, $contentOptions)
```
 - **Zero Arguments**: Deletes all properties from `content`.  
 - **One Argument**: Deletes property value at `$propertyPath`.  
#### `delete` Arguments
##### `$propertyPath` Argument
**Type**: `String` Literal  
**Descript**:  
Dot-notation path to property, or property key.  
