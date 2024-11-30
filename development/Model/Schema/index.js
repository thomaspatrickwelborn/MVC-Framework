import { typeOf, typedObjectLiteral } from '../../Coutil/index.js'
import Content from '../Content/index.js'
import Verification from './Verification/index.js'
import Validation from './Validation/index.js'
import PropertyValidation from './PropertyValidation/index.js'
import {
  TypeValidator, RangeValidator, LengthValidator, EnumValidator, MatchValidator
} from './Validators/index.js'
import { Types, Primitives, Objects } from './Variables/index.js'
import Options from './Options/index.js' 
const ValidatorKeys = {
  type: ['type'], range: ['min', 'max'], length: ['minLength', 'maxLength']
}
export default class Schema extends EventTarget{
  options
  #properties
  #_type
  #_context
  constructor($properties = {}, $options = {}) {
    super()
    this.#properties = $properties
    this.options = Object.assign({}, Options, $options)
  }
  get validationType() { return this.options.validationType }
  get type() {
    if(this.#_type !== undefined) return this.#_type
    this.#_type = typeOf(typedObjectLiteral(this.#properties))
    return this.#_type
  }
  get context() {
    if(this.#_context !== undefined) return this.#_context
    let properties
    if(this.type === 'array') {
      properties = this.#properties.slice(0, 1)
      this.#_context = []
    }
    else if(this.type === 'object') {
      properties = this.#properties 
      this.#_context = {}
    }
    iterateProperties: 
    for(const [
      $contextKey, $contextValue
    ] of Object.entries(properties)) {
      let contextValue
      // Context Val: Schema
      if($contextValue instanceof Schema) {
        this.#_context[$contextKey] = $contextValue
        continue iterateProperties
      }
      // Context Val: Object
      else if(typeof $contextValue.type === 'object') {
        this.#_context[$contextKey] = new Schema($contextValue.type, this.options)
        continue iterateProperties
      }
      // Context Val: Primitive
      else {
        this.#_context[$contextKey] = $contextValue
      }
      // Context Validators
      this.#_context[$contextKey].validators = (this.#_context[$contextKey].validators)
        ? this.#_context[$contextKey].validators
        : [new TypeValidator()]
      // this.#_context[$contextKey].validators.unshift()
      const addValidators = []
      // Context Validator: Add Range
      if(
        typeof this.#_context[$contextKey].min === 'number' || 
        typeof this.#_context[$contextKey].max === 'number'
      ) { addValidators.push(new RangeValidator()) }
      // Context Validator: Add Length
      if(
        typeof this.#_context[$contextKey].minLength === 'number' ||
        typeof this.#_context[$contextKey].maxLength === 'number'
      ) { addValidators.push(new LengthValidator()) }
      // Context Validator: Add Enum
      if(
        Array.isArray(this.#_context[$contextKey].enum) &&
        this.#_context[$contextKey].enum.length > 0
      ) { addValidators.push(new EnumValidator()) }
      // Context Validator: Add Match
      if(
        Array.isArray(this.#_context[$contextKey].match) &&
        this.#_context[$contextKey].match.length > 0
      ) { addValidators.push(new MatchValidator()) }
      this.#_context[$contextKey].validators = this.#_context[$contextKey].validators.concat(addValidators)
    }
    return this.#_context
  }
  validate($content) {
    if($content?.classToString === Content.toString()) { $content = $content.object }
    const validation = new Validation({
      type: this.validationType,
      context: this.context,
      value: $content,
      properties: typedObjectLiteral(this.type),
    })
    // Iterate Content Properties 
    Object.entries($content).reduce(
      ($validation, [$contentKey, $contentValue]) => {
        // Validate Content Property
        const propertyValidation = this.validateProperty($contentKey, $contentValue)
        $validation.properties[$contentKey] = propertyValidation
        if(this.validationType === 'object') {
          if(!$validation.valid) $validation.valid = propertyValidation.valid
        }
        return $validationx
      }, validation
    )
    return validation
  }
  validateProperty($key, $value) {
    let contextValue
    if(this.type === 'array') { contextValue = this.context[0] }
    else if(this.type === 'object') { contextValue = this.context[$key] }
    let propertyValidation = new PropertyValidation({
      type: this.validationType,
      context: contextValue,
      key: $key,
      value: $value,
    })
    // Context Val: Undefined
    if(contextValue === undefined) {
      const verification = new Verification({
        type: null,
        context: contextValue,
        key: $key,
        value: $value,
      }, this)
      verification.pass = false
      propertyValidation.unadvance.push(verification)
      
    }
    // Context Val: Object
    else if(contextValue instanceof Schema) {
      const propertyValidation = contextValue.validate($value)
      if(propertyValidation.valid === true) { propertyValidation.advance.push(propertyValidation) }
      else if(propertyValidation.valid === false) { propertyValidation.deadvance.push(propertyValidation) }
      // else if(propertyValidation.valid === undefined) { propertyValidation.unadvance.push(propertyValidation) }
    }
    // Context Val: Primitive
    else {
      iterateContextValueValidators: 
      contextValue.validators.reduce(
        ($propertyValidation, $validator, $validatorIndex, $validators) => {
          const verification = $validator.validate(contextValue, $key, $value)
          if(verification.pass === true) { $propertyValidation.advance.push(verification) }
          else if(verification.pass === false) { $propertyValidation.deadvance.push(verification) }
          // else if(verification.pass === undefined) { $propertyValidation.unadvance.push(verification) }
          if(!$propertyValidation.valid) $propertyValidation.valid = verification.pass
          return $propertyValidation
        }, propertyValidation
      )
    }
    console.log("propertyValidation", propertyValidation)
    return propertyValidation
  }
}