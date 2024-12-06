# Schema Class
**MVC Framework \| Class System \| Model \| *Schema***  


```
{
  type: String
}

{
  type: {
    value: String
  }
}

{
  type: {
    type: String
  }
}

{
  type: {
    type: {
      value: String
    }
  }
}
```
Object.get
$propertyDefinition?.type.type.value
$propertyDefinition?.type.type

Variables.TypeValues.includes()

### Expand Tree Statements
#### Statement 1
*statement*  
```
expandTree(String, "0")
```
*returns*  
```
[String]
```

#### Statement 2
*statement*  
```
expandTree(Number, "value")
```
*returns*  
```
{
  value: Number
}
```

#### Statement 3
```
expandTree({
  propertyA: String
}, "type.value")
```
*returns*  
```
{
  propertyA: {
    type: {
      value: String
    }
  }
}
```

#### Statement 4
```
expandTree({
  propertyA: String
}, ($value) => {
  type: { value: $value }
})
```
*returns*  
```
{
  propertyA: {
    type: {
      value: String
    }
  }
}
```

#### Statement 5
```
impandTree({})
```

### Impand Tree Statements
#### Statement 1
*statement*  
```
impandTree([String], "0")
```
*returns*  
```
String
```

#### Statement 2
*statement*  
```
impandTree({
  value: Number
}, "value")
```
*returns*  
```
Number
```

#### Statement 3
```
impandTree({
  propertyA: {
    type: {
      value: String
    }
  }
}, ":$property.type.value")
```
*returns*  
```
{
  propertyA: String
}
```

#### Statement 4
```
impandTree({
  propertyA: {
    type: {
      value: String
    }
  }
}, ($value) => {
  type: { value: $value }
})
```
*returns*  
```
{
  propertyA: String
}
```

#### Statement 5
```
expandTree({})
```


```
Schema Property Definitions ($propertyDefinitions)
{
  [$propertyName]: $propertyDefinition
}

Schema Property Definition ($propertyDefinition)
{
  [$validatorName]: $validator
}

Schema Property Definition Validator ($validator)
{
  [$validatorSettingName]: $validatorSetting,
}

Schema Property Definition Validator Setting ($validatorSetting)
{
  value: $value,
  messages: {
    "true": $messageTrue,
    "false": $messageFalse,
  },
}

Schema Property Definition Validator Keys ($validatorSetting)
[
  "type", // TypeValidator
  ["length", ["min", "max"]], // LengthValidator
  "minLength", "maxLength", // LengthValidator
  ["range", ["min", "max"]] // RangeValidator
  "min", "max", // RangeValidator
  "enum", // EnumValidator
  "match", // MatchValidator
]


{
  [$propertyName]: {
    [$validatorName]: {
      [$validatorSettingName]: {
        value: $value,
        messages: {
          true: $messageTrue,
          false: $messageFalse,
        }
      }
    }
  }
}

```

```
{
  propertyA: String
}
{
  propertyA: {
    type: String
  }
}
{
  propertyA: {
    type: {
      value: String,
      messages: {
        true: ($verification) => `${$verification.pass}`,
        false: ($verification) => `${$verification.pass}`,
      }
    }
  }
}
```

```
{
  propertyA: {
    propertyB: {
      propertyC: String
    }
  }
}
```
```
{
  // Property A
  propertyA: {
    type: {
      value: {
        // Property B
        propertyB: {
          type: {
            value: {
              // Property C
              propertyC: {
                type: {
                  value: String
                }
              }
            }
          }
        }
      }
    }
  }
}
```
```
expandTree({
  propertyA: String
}, ["type.value"])
```