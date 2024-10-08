# MVC Framework—Model Schema—Validation Class

## Validation Class Properties
### `type` Property
**Type**: `getter`  
**Return**: `String`  
**Descript**:  
Validation type.  
**Retrofer**:  
 1. `Validation.type`
 2. `Validation.settings.type`
 3. `Validation.constructor`. 
 4. `Validator.validate`
 5. `Validator.type`

### `valid` Property
**Type**: `getter`, `setter`  
**Return**: `Boolean`  
**Descript**:  
`contentVal` valuation against complementary `contextVal` qualities.  
**Retrofer**:  
 1. `Validation.valid`
 2. `Validator.validate`  


### `message` Property
**Type**: `getter`
**Return**: `String`  
**Retrofer**:  
1. `Validation.message`
2. `Validation.settings.messages[$message]`
3. `Validation.constructor`.
4. `Validator.validate`
5. `Validator.messages`

### `context` Property
**Type**: `getter`  
**Return**: `Object`—Validator Settings
**Descript**:  
 - Validative Qualities.  
**Retrofer**:  
 1. `Validation.context`
 2. `Validation.settings.context`
 3. `Validation.constructor`
 4. `Validator.validate`
 5. `Schema.validateProperty`

### `contextKey` Property [^4]
**Type**: `getter`  
**Return**: `String`  
**Descript**:  
 - Validative Quality Enominator.  
**Retrofer**:  
 1. 
 
### `contextVal` Property
**Type**: `getter`  
**Return**: `Mixed`  
**Descript**:  
 - Validative Quality Evaluator.  

### `contentKey` Property
**Type**: `getter`  
**Return**: `String`  
**Descript**  
 - Validatable Quality Enom.   

### `contentVal` Property
**Type**: `getter`  
**Return**: `Mixed`  
**Descript**  
 - Validatable Quality Evalue.  
