| [MVC Framework](../../../../README.md) | [Guide](../../index.md) | [Model](../index.md) | *Content Class* |
| :-- | :-- | :-- | :-- |
# MVC Framework Guide \| `Content` Class

## Introduction
 - Manage structured content using familiar JS `Object`, `Array`, `EventTarget` APIs.  
 - Schematize data structures with property validators.  
 - Capture **content *and* validation events** for property changes (includes **nested** property events).  

## Impetus
 - Frontend, backend applications often require or benefit from structured content with validatable schema.  
 - Changes to structured content often result in some futher change to a visual interface or database, including changes to nested properties.  
 - There are limited libraries with Browser/NodeJS compatibility that manage schematized content with validators or capture nested property change events.  

## Impact
 - Manage structured content for primitive/non-primitive data types: 
   - `string`, `number`, `bigint`, `boolean`, `undefined`, `null` primitives; 
   - `object`, `array` non-primitives. 
 - Schematize content with property definitions validators.  
   - `type`, `required`, `match`, `enum`, `range`, `length` and custom validators.  
 - Capture content and validation events for any any methods that modify content.  
   - `Object` Events: `assign`, `defineProperties`, `defineProperty`, `freeze`, and `seal`.  
   - `Array` Events: `concat`, `copyWithin`, `fill`, `pop`, `push`, `reverse`, `shift`, `splice`, and `unshift`.  
   - `Accessor` Events: `get`, `set`, `delete`  

## Illustrations
```
import { Content } from 'mvc-framework'
```
### Object `assign` Method
#### `assignSourceProperty:$key` Event
```
detail:  {
  key: $assignSourcePropKey,
  value: $assignSourcePropVal,
  source: $assignSource,
}
```



### Object `set` Method
#### `setProperty` Event
```
const object = new Content({})
object.addEventListener('setProperty', eventLog)
object.set({
  propertyA: { propertyB: { propertyG: 777 } },
  propertyD: { '0': { propertyE: 555 } },
  propertyF: true,
})
object.removeEventListener('set', eventLog)
```
**object.toString**  
```
{
  "propertyA": {
    "propertyB": {
      "propertyH": 101010
    }
  },
  "propertyD": {
    "1": {
      "propertyE": 555
    }
  },
  "propertyF": false
}
```
##### `setProperty` Method Event Logs
```
type: setProperty
path: propertyA.propertyB.propertyH
detail:  {
  "key": "propertyH",
  "value": 101010
}
```
```
type: setProperty
path: propertyA.propertyB
detail:  {
  "key": "propertyB",
  "value": {}
}
```
```
type: setProperty
path: propertyA
detail:  {
  "key": "propertyA",
  "value": {}
}
```
```
type: setProperty
path: propertyD.2.propertyE
detail:  {
  "key": "propertyE",
  "value": 555
}
```
```
type: setProperty
path: propertyD.2
detail:  {
  "key": "2",
  "value": {}
}
```
```
type: setProperty
path: propertyD
detail:  {
  "key": "propertyD",
  "value": {}
}
```
```
type: setProperty
path: propertyF
detail:  {
  "key": "propertyF",
  "value": false
}
```

#### `set` Event
```
object.addEventListener('set', eventLog)
object.set({
  propertyA: { propertyB: { propertyH: 101010 } },
  propertyD: { '1': { propertyE: 555 } },
  propertyF: false,
})
object.removeEventListener('set', eventLog)

```
**object.toString**:  
```
{
  "propertyA": {
    "propertyB": {
      "propertyG": 777
    }
  },
  "propertyD": {
    "0": {
      "propertyE": 555
    }
  },
  "propertyF": true
}
```

##### `set` Method Event Logs
```
type: set
path: propertyA.propertyB
detail:  {
  "value": {
    "propertyG": 777
  }
}
```
```
type: set
path: propertyA
detail:  {
  "value": {
    "propertyB": {
      "propertyG": 777
    }
  }
}
```
```
type: set
path: propertyD.1
detail:  {
  "value": {
    "propertyE": 555
  }
}
```
```
type: set
path: propertyD
detail:  {
  "value": {
    "1": {
      "propertyE": 555
    }
  }
}
```
```
type: set
path: null
detail:  {
  "value": {
    "propertyA": {
      "propertyB": {
        "propertyG": 777
      }
    }
  }
}