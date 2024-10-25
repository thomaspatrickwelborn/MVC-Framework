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
  traps: {
    accessor: {
      get: {
        pathkey: true,
        events: [
          'get',
          'getProperty'
        ],
      },
      set: {
        pathkey: true,
        recursive: true,
        events: [
          'set',
          'setProperty'
        ],
      },
      delete: {
        pathkey: true,
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
#### `pathkey` Option
**Type**: `Boolean`  
**Default**: `true`  
**Descript**:  
 - When `true`, properties accessed through dot-notation path.  
 - When `false`, properties accessed through key. 
##### `pathKey`: `true`
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
##### `pathKey`: `false`
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
##### `pathKey` Escape
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
#### `keychaining` Option
**Type**: `Boolean`  
**Default**: `true`  
**Descript**:  
 - When `true` and `pathkey` is also `true`, 

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
Accepts zero or one arguments:  
```
content.get()
content.get($propertyPath)
```
 - **Zero Arguments**: Gets all properties (gets `content`, or self)  
 - **One Argument**: Gets property value at `$propertyPath`.  
#### `get` Arguments
##### `$propertyPath` Argument
**Type**: `String` Literal
**Descript**:  
 - Dot-notation path to property, or property key.  


### `set` Method
Accepts one or two arguments:  
```
content.set($propertyTree)
content.set($propertyPath, $propertyValue)
```
 - **One Argument**: Sets all properties from `$propertyTree` to `content`.  
 - **Two Arguments**: Sets `$propertyValue` at `$propertyPath`  
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
Accepts zero or one arguments:  
```
content.delete()
content.delete($propertyPath)
```
 - **Zero Arguments**: Deletes all properties from `content`.  
 - **One Argument**: Deletes property value at `$propertyPath`.  
#### `delete` Arguments
##### `$propertyPath` Argument
**Type**: `String` Literal  
**Descript**:  
Dot-notation path to property, or property key.  
