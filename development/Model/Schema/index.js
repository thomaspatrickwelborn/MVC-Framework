import {
  expandTree, isPropertyDefinition, typedObjectLiteral, typeOf, variables as Variables
} from '../../Coutil/index.js'
import Content from '../Content/index.js'
import Verification from './Verification/index.js'
import Validation from './Validation/index.js'
import {
  TypeValidator, RangeValidator, LengthValidator, EnumValidator, MatchValidator
} from './Validators/index.js'
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
      $propertyKey, $propertyDefinition
    ] of Object.entries(properties)) {
      const typeOfPropertyDefinition = typeOf($propertyDefinition)
      let propertyDefinition
      // Property Definition: Schema
      if($propertyDefinition instanceof Schema) {
        propertyDefinition = expandTree($propertyDefinition, 'type.value')
      }
      // Property Definition: String, Number, Boolean, Object, Array, null, undefined
      else if(Variables.TypeValues.includes($propertyDefinition)) {
        propertyDefinition = expandTree($propertyDefinition, 'type.value')
      }
      // Property Definition: 'string', 'number', 'boolean', 'object', 'array', 'null', 'undefined'
      else if(Variables.TypeKeys.includes($propertyDefinition)) {
        propertyDefinition = expandTree(Variables.TypeValues[
          Variables.TypeKeys.indexOf($propertyDefinition)
        ], 'type.value')
      }
      // Property Definition: Object Literal
      else if(typeOfPropertyDefinition === 'object') {
        let propertyDefinitionIsPropertyDefinition = isPropertyDefinition($propertyDefinition)
        if(propertyDefinitionIsPropertyDefinition === false) {
          propertyDefinition = {
            type: {
              value: new Schema($propertyDefinition, this.options)
            }
          }
        }
        else if(propertyDefinitionIsPropertyDefinition === true) {
          propertyDefinition = {}
          // Property Definition: 
          iteratePropertyValidators: 
          for(const [
            $propertyValidatorName, $propertyValidator
          ] of Object.entries($propertyDefinition)) {
            if($propertyValidatorName === 'validators') { continue iteratePropertyValidators }
            const typeOfPropertyValidator = typeOf($propertyValidator)
            let propertyValidator
            if(typeOfPropertyValidator && typeOfPropertyValidator === 'object') {
              propertyValidator = $propertyValidator
            }
            else {
              propertyValidator = {
                value: $propertyValidator
              }
            }
            propertyDefinition[$propertyValidatorName] = propertyValidator
          }
        }
      }
      propertyDefinition.validators = []
      const validators = {}
      const {
        type,
        min, max, 
        minLength, maxLength, 
        match,
      } = propertyDefinition
      if(type) validators.type = { properties: { type }, validator: TypeValidator } 
      if(min || max) validators.range = { properties: { min, max }, validator: RangeValidator } 
      if(minLength || maxLength) validators.length = { properties: { minLength, maxLength }, validator: LengthValidator }
      if(propertyDefinition.enum) validators.enum = { properties: { enum: propertyDefinition.enum }, validator: EnumValidator }
      if(match) validators.match = { properties: { match }, validator: MatchValidator }
      for(const [
        $validatorName, $validatorSettings
      ] of Object.entries(validators)) {
        const { properties, validator } = $validatorSettings
        propertyDefinition.validators.push(new validator(properties))
      }
      this.#_context[$propertyKey] = propertyDefinition
    
    }
    return this.#_context
  }
  validate() {
    let $arguments = [...arguments]
    let $contentName, $content
    if($arguments.length === 1) { $contentName = null; $content = $arguments.shift() }
    if($arguments.length === 2) { $contentName = $arguments.shift(); $content = $arguments.shift() }
    if($content?.classToString === Content.toString()) { $content = $content.object }
    const validation = new Validation({
      type: this.validationType,
      context: this.context,
      key: $contentName, 
      value: $content,
      properties: typedObjectLiteral(this.type),
    })
    const contentProperties = Object.entries($content)
    let contentPropertyIndex = 0
    // Iterate Content Properties 
    while(contentPropertyIndex < contentProperties.length) {
      const [$contentKey, $contentValue] = contentProperties[contentPropertyIndex]
      const propertyValidation = this.validateProperty($contentKey, $contentValue)
      validation.properties[$contentKey] = propertyValidation
      if(propertyValidation.valid === true) { validation.advance.push(propertyValidation) } 
      else if(propertyValidation.valid === false) { validation.deadvance.push(propertyValidation) } 
      else if(propertyValidation.valid === undefined) { validation.unadvance.push(propertyValidation )}
      contentPropertyIndex++
    }
    if(this.validationType === 'object') {
      if(validation.deadvance.length) { validation.valid = false }
      else if(validation.advance.length) { validation.valid = true }
      else if(validation.unadvance.length) { validation.valid = undefined }
    }
    else if(this.validationType === 'primitive') {
      if(validation.advance.length) { validation.valid = true }
      else if(validation.deadvance.length) { validation.valid = true }
      else if(validation.unadvance.length) { validation.valid = undefined }
    }
    return validation
  }
  validateProperty($key, $value) {
    let contextValue
    if(this.type === 'array') { contextValue = this.context[0] }
    else if(this.type === 'object') { contextValue = this.context[$key] }
    let propertyValidation = new Validation({
      type: this.validationType,
      context: contextValue,
      key: $key,
      value: $value,
    })
    // Context Value: Undefined
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
    // Context Value: Object
    else if(contextValue instanceof Schema) {
      const validation = contextValue.validate($key, $value)
      if(validation.valid === true) { propertyValidation.advance.push(validation) }
      else if(validation.valid === false) { propertyValidation.deadvance.push(validation) }
      else if(validation.valid === undefined) { propertyValidation.unadvance.push(validation) }
    }
    // Context Value: Primitive
    else {
      iterateContextValueValidators: 
      contextValue.validators.reduce(
        ($propertyValidation, $validator, $validatorIndex, $validators) => {
          const verification = $validator.validate(contextValue, $key, $value)
          if(verification.pass === true) { $propertyValidation.advance.push(verification) }
          else if(verification.pass === false) { $propertyValidation.deadvance.push(verification) }
          else if(verification.pass === undefined) { $propertyValidation.unadvance.push(verification) }
          return $propertyValidation
        }, propertyValidation
      )
    }
    if(propertyValidation.deadvance.length) { propertyValidation.valid = false }
    else if(propertyValidation.advance.length) { propertyValidation.valid = true }
    else if(propertyValidation.unadvance.length) { propertyValidation.valid = false }
    return propertyValidation
  }
}