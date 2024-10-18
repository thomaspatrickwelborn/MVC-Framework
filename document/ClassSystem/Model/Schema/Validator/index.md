# MVC Framework—Model Schema—Validator Class
 - Presents `type` and `validate` properties.  
 - Extends Reserved Type, Range, Length, Match, and Enum Validator Classes.  
 - Extends Custom Validator classes.  

## Validator Class Properties
### `type` Property
**Type**: `Getter`  
**Return**: `String`  
**Descript**:    
 - Typify validation method purpose.  
 - Reserved Types: `type`, `range`, `match`, `length`, `enum`  

## Validator Class Methods
### `validate` Method
**Type**: `Function`  
**Return**: `Validation` Class Instance  
**Descript**:  
 - Evaluate contentual property against contextual property.  

**Arguments**:  
`($context, $contentKey, $contentVal)`
 - **$context**—Schema Context Property Validation Settings.  
 - **$contentKey**—Content Key to validate.  
 - **$contentVal**—Content Val to validate.  

 ## Extend Validator Class

```
import { Validator, Validation } from '/mvc-framework.js'
class CustomValidator extends Validator {
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'custom',
      validate: ($context, $contentKey, $contentVal) => {
        let valid = ($contentVal === 'custom')
        return new Validation({
          context: $context,
          contentKey: $contentKey,
          contentVal: $contentVal,
          type: this.type,
          valid,
        })
    	},
    }))
  }
}
```
## Instantiate Validator Class
```
new CustomValidator()
```
## Incorporate Validator Class With Schema Validation
```
new Schema({
  propertyA: {
    type: Number,
    validators: [new CustomValidator()],
  }
})
```