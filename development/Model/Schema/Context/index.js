import {
  expandTree, isPropertyDefinition, typedObjectLiteral, typeOf, variables as Variables
} from '../../../Coutil/index.js'
import {
  RequiredValidator, TypeValidator, RangeValidator, LengthValidator, EnumValidator, MatchValidator
} from '../Validators/index.js'
import Schema from '../index.js'
import Handler from './Handler/index.js'
export default class Context extends EventTarget {
  #_properties
  #_options
  #_schema
  #_type
  #_proxy
  #_handler
  #_source
  constructor($properties, $options, $schema) {
    super()
    this.#properties = $properties
    this.options = $options
    this.schema = $schema
    return this.proxy
  }
  get #properties() { return this.#_properties }
  set #properties($properties) {
    if(this.#_properties !== undefined) return
    this.#_properties = $properties
    return this.#_properties
  }
  get options() { return this.#_options }
  set options($options) {
    if(this.#_options !== undefined) return
    this.#_options = $options
    return this.#_options
  }
  get required() { return this.options.required }
  get schema() { return this.#_schema }
  set schema($schema) {
    if(this.#_schema !== undefined) return
    this.#_schema = $schema
    return this.#_schema
  }
  get type() {
    if(this.#_type !== undefined) return this.#_type
    this.#_type = typeOf(typedObjectLiteral(this.#properties))
    return this.#_type
  }
  get proxy() {
    if(this.#_proxy !== undefined) return this.#_proxy
    this.#_proxy = new Proxy(this.source, this.#handler)
    return this.#_proxy
  }
  get #handler() {
    if(this.#_handler !== undefined) return this.#_handler
    this.#_handler = new Handler(this)
    return this.#_handler
  }
  get source() {
    if(this.#_source !== undefined) return this.#_source
    let properties
    const source = typedObjectLiteral(this.type)
    if(this.type === 'array') {
      properties = this.#properties.slice(0, 1)
    }
    else if(this.type === 'object') {
      properties = this.#properties
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
          propertyDefinition = { validators: [] }
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
          $propertyDefinition.validators = $propertyDefinition.validators || []
          iterateAlterPropertyValidators: 
          for(const $propertyDefinitionValidator of $propertyDefinition.validators) {
            for(const $Validator of [
              RequiredValidator, TypeValidator, RangeValidator, LengthValidator, EnumValidator, MatchValidator
            ]) {
              if($propertyDefinitionValidator instanceof $Validator === false) {
                propertyDefinition.validators.push($propertyDefinitionValidator)
              }
            }
          }
        }
      }
      propertyDefinition.validators = []
      const validators = new Map()
      const contextRequired = this.required
      const {
        required,
        type,
        range, min, max, 
        length, minLength, maxLength, 
        match,
      } = propertyDefinition
      // Required
      if(contextRequired === true) { validators.set('required', Object.assign({}, propertyDefinition.required, {
        type: 'required', validator: RequiredValidator, value: true
      })) }
      else if(required?.value === true) { validators.set('required', Object.assign({}, propertyDefinition.required, {
        type: 'required', validator: RequiredValidator, value: true }))
      }
      else { validators.set('required', Object.assign({}, propertyDefinition.required, {
        type: 'required', validator: RequiredValidator, value: false
      })) }
      // Type
      if(type) { validators.set('type', Object.assign({}, type, {
        type: 'type', validator: TypeValidator
      })) }
      else { validators.set('type', Object.assign({}, type, {
        type: 'type', validator: TypeValidator, value: undefined
      })) }
      // Range
      if(range) { validators.set('range', Object.assign({}, range, {
        type: 'range', validator: RangeValidator
      })) }
      else if(min || max) { validators.set('range', Object.assign({}, {
        type: 'range', validator: RangeValidator, min, max
      })) }
      // Length
      if(length) { validators.set('length', Object.assign({}, length, {
        type: 'length', validator: LengthValidator
      })) }
      else if(minLength || maxLength) { validators.set('length', Object.assign({}, {
        type: 'length', validator: LengthValidator, minLength, maxLength
      })) }
      // Enum
      if(propertyDefinition.enum) { validators.set('enum', Object.assign({}, propertyDefinition.enum, {
        type: 'enum', validator: EnumValidator
      })) }
      // Match
      if(match) { validators.set('match', Object.assign({}, match, {
        type: 'match', validator: MatchValidator
      })) }
      delete propertyDefinition.min
      delete propertyDefinition.max
      delete propertyDefinition.minLength
      delete propertyDefinition.maxLength
      for(const [
        $validatorName, $validatorSettings
      ] of validators.entries()) {
        // const { source, validator } = $validatorSettings
        const ValidatorClass = $validatorSettings.validator
        const validatorSource = $validatorSettings
        propertyDefinition[$validatorName] = $validatorSettings
        propertyDefinition.validators.push(new ValidatorClass(validatorSource, this.schema))
      }
      source[$propertyKey] = propertyDefinition
    }
    this.#_source = source
    return this.#_source
  }
}
