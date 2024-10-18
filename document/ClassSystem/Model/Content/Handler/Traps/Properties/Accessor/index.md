# Content Accessor Methods
 - [Path Options](#path-potions)
 - [`pathKey` Option](#pathkey-option)
 - [`pathEsc` Option](#pathesc-option)
## `get`/`set`/`delete` Method Configuration
### Path Options
```
{
  traps: {
    accessor: {
      get: {
        pathKey: true,
        pathEsc: '"',
      },
      set: {
        pathKey: true,
        pathEsc: '"',
      },
      delete: {
        pathKey: true,
        pathEsc: '"',
      },
    }
  }
}
```
#### `pathKey` Option
**Type**: `Boolean`  
**Default**: `true`  
**Descript**:  
 - `true`: Property Keys formatted as Property Path.  
 - `false`: Property Keys unformatted. 
#### `pathEsc` Option
**Type**: `String`  
**Default**: `"`  
**Descript**: When `pathKey` is `true`, Property Path Escape character delimits path as key. 

### `pathKey` Option
```
import { Model } from '/dependencies/mvc-framework.js'
const { content, schema } = new Model({
  schema: {
    "aaa.bbb.ccc": { type: String },
    aaa: { type: {
      bbb: { type: {
        ccc: { type: Number }
      } }
    } },
  },
}, {
  content: {
    traps: { accessor: {
      get: { pathKey: true },
      set: { pathKey: true },
      delete: { pathKey: true },
    } }
  },
})
```

#### `pathKey`: `false`
```
content.set("aaa.bbb.ccc", "DDD.EEE.FFF", { pathKey: false })
content.get()
```
**Return**:  
```
Proxy {
  "aaa.bbb.ccc": "DDD.EEE.FFF"
}
```

#### `pathKey`: `true`
```
content.set("aaa.bbb.ccc", 444555666, { pathKey: true })
content.get()
```
*or*  
```
content.set("aaa.bbb.ccc", 444555666)
content.get()
```
**Return**:  
```
Proxy {
  "aaa": {
    "bbb": {
      "ccc": 444555666
    }
  }
}
```

### `pathEsc` Option
```
import { Model } from '/dependencies/mvc-framework.js'
const { content, schema } = new Model({
  schema: {
    "aaa.bbb.ccc": { type: {
      "ddd.eee.fff": { type: {
        "ggg": { type: {
          "hhh": { type: {
            "iii": { type: String }
          } }
        } }
      } }
    } },
    aaa: { type: {
      bbb: { type: {
        ccc: { type: {
          "ddd.eee.fff": { type: {
            "ggg.hhh.iii": { type: Number }
          } }
        } }
      } }
    } },
  },
}, {
  content: {
    traps: { accessor: {
      get: { pathKey: true, pathEsc: "\"" },
      set: { pathKey: true, pathEsc: "\"" },
      delete: { pathKey: true, pathEsc: "\"" },
    } }
  },
})
```
#### #1. `set`/`get` escaped paths
```
content.set("\"aaa.bbb.ccc\".\"ddd.eee.fff\".ggg.hhh.iii, "JJJKKKLLL")
content.get("\"aaa.bbb.ccc\".\"ddd.eee.fff\"")
```
**Return**:  
```
Proxy {
  ggg: {
    hhh: {
      iii: "JJJKKKLLL"
    }
  }
}
```
#### #2. `set`/`get` escaped paths
```
content.set('aaa.bbb.ccc."ddd.eee.fff"."ggg.hhh.iii"', 101111121)
content.get('aaa.bbb.ccc."ddd.eee.fff"')
```
**Return**:  
```
Proxy {
  "ggg.hhh.iii": 101111121
}
```
#### #3. `get` Content with escaped paths
```
content.get()
```
**Return**:  
```
Proxy {
  "aaa.bbb.ccc": {
    "ddd.eee.fff": {
      ggg: {
        hhh: {
          iii: "JJJKKKLLL"
        }
      },

    }
  },
  aaa: {
    bbb: {
      ccc: {
        "ddd.eee.fff": {
          "ggg.hhh.iii": 101111121
        }
      }
    }
  },
}
```