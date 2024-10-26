# Object Traps
**MVC Framework \| Class System \| Model \| Content \| Handler \| Traps \| *Object***  
**Content**  
 - [Object Handler Trap Options]()
   - [`assign` Options]()
     - [`assign.sourceTree` Option]()
     - [`assign.events` Option]()
   - [`defineProperties` Options]()
     - [`defineProperties.descriptorTree` Option]()
     - [`defineProperties.events` Option]()
   - [`defineProperty` Options]()
     - [`defineProperty.descriptorTree` Option]()
     - [`defineProperty.events` Option]()
   - [`freeze` Options]()
     - [`freeze.recursive` Option]()
     - [`freeze.events` Option]()
   - [`seal` Options]()
     - [`seal.recursive` Option]()
     - [`seal.events` Option]()
 - [Object Handler Trap Methods]()
   - [`assign` Trap Method]()
   - [`defineProperties` Trap Method]()
   - [`defineProperty` Trap Method]()
   - [`freeze` Trap Method]()
   - [`seal` Trap Method]()

## Object Handler Trap Options
Object Handler Trap Options are defined with new `Content` Instance creation.  
**Defaults**:  
```
import { Content } from 'mvc-framework'
const $contentOptions = {
  traps: {
    object: {
      assign: {
        sourceTree: true,
        events: {
          'assignSourceProperty': true,
          'assignSource': true,
          'assign': true,
        },
      },
      defineProperties: {
        descriptorTree: true,
        events: {
          'defineProperties': true
        },
      },
      defineProperty: {
        descriptorTree: true,
        events: {
          'defineProperty': true
        },
      },
      freeze: {
        recursive: true,
        events: {
          'freeze': true
      }
      },
      seal: {
        recursive: true,
        events: {
          'seal': true
      }
      },
    }
  }
}
const content = new Content({}, null, $contentOptions)
```
### `assign` Options
#### `assign.sourceTree` Option
#### `assign.events` Option

### `defineProperties` Options
#### `defineProperties.descriptorTree` Option
#### `defineProperties.events` Option

### `defineProperty` Options
#### `defineProperty.descriptorTree` Option
#### `defineProperty.events` Option

### `freeze` Options
#### `freeze.recursive` Option
#### `freeze.events` Option

### `seal` Options
#### `seal.recursive` Option
#### `seal.events` Option

## Object Handler Trap Methods
### `assign` Method
#### `assign` Arguments
### `defineProperties` Method
#### `defineProperties` Arguments
### `defineProperty` Method
#### `defineProperty` Arguments
### `freeze` Method
#### `freeze` Arguments
### `seal` Method
#### `seal` Arguments
