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
      const validators = new Map()
      const contextRequired = this.required
      const {
        required,
        type,
        min, max, 
        minLength, maxLength, 
        match,
      } = propertyDefinition
      if(contextRequired === true) {
        propertyDefinition.required = Object.assign({}, propertyDefinition.required, { value: true })
        validators.set('required', { source: propertyDefinition.required, validator: RequiredValidator })
      }
      else if(required?.value === true) {
        propertyDefinition.required = Object.assign({}, propertyDefinition.required, { value: true })
        validators.set('required', { source: propertyDefinition.required, validator: RequiredValidator })
      }
      else {
        propertyDefinition.required = Object.assign({}, propertyDefinition.required, { value: false })
        validators.set('required', { source: propertyDefinition.required, validator: RequiredValidator })
      }
      if(type) { validators.set('type', { source: type, validator: TypeValidator } ) }
      else { validators.set('type', { source: { value: undefined }, validator: TypeValidator } ) }
      if(min || max) validators.set('range', { source: { min, max }, validator: RangeValidator } )
      if(minLength || maxLength) validators.set('length', { source: { minLength, maxLength }, validator: LengthValidator })
      if(propertyDefinition.enum) validators.set('enum', { source: propertyDefinition.enum, validator: EnumValidator })
      if(match) validators.set('match', { source: match, validator: MatchValidator })
      for(const [
        $validatorName, $validatorSettings
      ] of validators.entries()) {
        const { source, validator } = $validatorSettings
        propertyDefinition.validators.push(new validator(source, this.schema))
      }
      source[$propertyKey] = propertyDefinition
    }
    this.#_source = source
    return this.#_source
  }
}
