# Array Traps
**MVC Framework \| Class System \| Model \| Content \| Handler \| Traps \| *Array***  
**Content**  
 - [Array Handler Trap Options]()
   - [`concat` Options]()
     - [ `concat.events` Option]()
   - [`copyWithin` Options]()
     - [ `copyWithin.events` Option]()
   - [`fill` Options]()
     - [ `fill.events` Option]()
   - [`pop` Options]()
     - [ `pop.events` Option]()
   - [`push` Options]()
     - [ `push.events` Option]()
   - [`reverse` Options]()
     - [ `reverse.events` Option]()
   - [`shift` Options]()
     - [ `shift.events` Option]()
   - [`splice` Options]()
     - [ `splice.events` Option]()
   - [`unshift` Options]()
     - [ `unshift.events` Option]()
 - [Array Handler Trap Methods]()
   - [`concat` Method]()
     - [`concat` Arguments]()
   - [`copyWithin` Method]()
     - [`copyWithin` Arguments]()
   - [`fill` Method]()
     - [`fill` Arguments]()
   - [`pop` Method]()
     - [`pop` Arguments]()
   - [`push` Method]()
     - [`push` Arguments]()
   - [`reverse` Method]()
     - [`reverse` Arguments]()
   - [`shift` Method]()
     - [`shift` Arguments]()
   - [`splice` Method]()
     - [`splice` Arguments]()
   - [`unshift` Method]()
     - [`unshift` Arguments]()

## Array Handler Trap Options
Array Handler Trap Options are defined with new `Content` Instance creation.  
```
import { Content } from 'mvc-framework'
const $contentOptions = {
  traps: {
    array: {
      concat: {
        events: [
          'concatValue',
          'concat'
        ]
      },
      copyWithin: {
        events: [
          'copyWithinIndex',
          'copyWithin'
        ]
      },
      fill: {
        events: [
          'fillIndex',
          'fill'
        ]
      },
      pop: {
        events: ['pop']
      },
      push: {
        events: [
          'pushProp',
          'push'
        ]
      },
      reverse: {
        events: ['reverse']
      },
      shift: {
        events: ['shift']
      },
      splice: {
        events: [
          'spliceDelete',
          'spliceAdd',
          'splice'
        ]
      },
      unshift: {
        events: [
          'unshiftProp',
          'unshift'
        ]
      },
    }
  }
}
const content = new Content([], null, $contentOptions)
```

### `concat` Options
#### `concat.events` Option

### `copyWithin` Options
#### `copyWithin.events` Option

### `fill` Options
#### `fill.events` Option

### `pop` Options
#### `pop.events` Option

### `push` Options
#### `push.events` Option

### `reverse` Options
#### `reverse.events` Option

### `shift` Options
#### `shift.events` Option

### `splice` Options
#### `splice.events` Option

### `unshift` Options
#### `unshift.events` Option

## Array Handler Trap Methods
### `concat` Method
#### `concat` Arguments
### `copyWithin` Method
#### `copyWithin` Arguments
### `fill` Method
#### `fill` Arguments
### `pop` Method
#### `pop` Arguments
### `push` Method
#### `push` Arguments
### `reverse` Method
#### `reverse` Arguments
### `shift` Method
#### `shift` Arguments
### `splice` Method
#### `splice` Arguments
### `unshift` Method
#### `unshift` Arguments