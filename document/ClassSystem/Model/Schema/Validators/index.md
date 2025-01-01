# Schema Validators
**MVC Framework \| Guide \| Model \| Schema \| *Validators***  

## Schema Context Property Definitions 
 - Schema Context Property Definitions are comprised of Validator Definitions that describe validity of some structured content through `Schema.validate` and `Schema.validateProperty` methods.  
 - Property and Validator Definitions are syntaxed in Impanded/Expanded Formats 
### Property Definition Syntax
#### Object Simplex *Impanded* Property Definition  
```
{
  propertyA: Boolean,
  propertyB: Number,
  propertyC: String,
  propertyD: null,
  propertyE: undefined,
}
```
#### Object Simplex *Expanded* Property Definition  
```
{
  propertyA: { type: Boolean },
  propertyB: { type: Number },
  propertyC: { type: String },
  propertyD: { type: null },
  propertyE: { type: undefined },
}
```
#### Object Complex *Impanded* Property Definition  
```
{
  propertyA: {
    propertyB: {
      propertyC: {
        propertyD: Boolean
      },
      propertyE: Number
    },
    propertyF: String
  }
  propertyG: null,
  propertyH: {
    propertyI: undefined
  },
}
```
#### Object Complex *Expanded* Property Definition  
```
{
  propertyA: Schema {
    context: {
      propertyB: Schema {
        context: {
          propertyC: {
            context: {
              propertyD: { type: Boolean }
            }
          },
          propertyE: { type: Number }
        }
      },
      propertyF: { type: String }
    }
  },
  propertyG: { type: null },
  propertyH: Schema {
    constext: {
      propertyI: { type: undefined }
    }
  },
}
```

### Property Validator Definition Syntax
#### Object Simplex *Impanded* Property Validator Definitions
```
{
  propertyA: {
    type: Boolean,
  },
  propertyB: {
    type: Number,
    min: -100,
    max: 100,
  },
  propertyC: {
    type: String,
    minLength: 64,
    maxLength: 128,
  },
  propertyD: {
    type: String,
    enum: ["AAAAA", "BBBBB", "CCCCC"],
  },
  propertyE: {
    type: String,
    match: ["/^aa$/", "/^bb$/", "/^cc$/"],
  },
  propertyF: {
    type: null
  },
  propertyG: {
    type: undefined
  }
}
```
#### Object Simplex *Expanded* Property Validator Definitions
```
{
  propertyA: {
    type: { value: Boolean },
  },
  propertyB: {
    type: { value: Number },
    range: {
      min: { value: -100 },
      max: { value: 100 },
    }
  },
  propertyC: {
    type: { value: String },
    length: {
      minLength: { value: 64 },
      maxLength: { value: 128 },
    }
  },
  propertyD: {
    type: { value: String },
    enum: { value: ["AAAAA", "BBBBB", "CCCCC"] },
  },
  propertyE: {
    type: { value: String },
    match: { value: ["/^aa$/", "/^bb$/", "/^cc$/"] }
  },
  propertyF: {
    type: { value: null }
  },
  propertyG: {
    type: { value: undefined }
  }
}
```

#### Object Complex *Impanded* Property Validator Definitions
```
{
  propertyA: { type: {
    propertyB: { type: {
      propertyC: { type: {
        propertyD: { type: Boolean },
      } },
      propertyE: {
        type: Number,
        min: -100,
        max: 100,
      },
    } },
    propertyF: {
      type: String,
      minLength: 64,
      maxLength: 128,
      match: ["/^aa$/", "/^bb$/", "/^cc$/"],
    }
  } },
  propertyG: { type: null },
  propertyH: { type: undefined },
}
```

#### Object Complex *Expanded* Property Validator Definitions
```
{
  propertyA: Schema {
    context: {
      propertyB: Schema {
        context: { 
          propertyC: Schema {
            context: {
              propertyD: { type: { value: Boolean } },
            }
          },
          propertyE: {
            type: { value: Number },
            range: {
              min: -100,
              max: 100,
            }
          },
        }
      },
      propertyF: {
        type: String,
        minLength: 64,
        maxLength: 128,
        match: ["/^aa$/", "/^bb$/", "/^cc$/"],
      }
    }
  },
  propertyG: { type: null },
  propertyH: { type: undefined },
}
```