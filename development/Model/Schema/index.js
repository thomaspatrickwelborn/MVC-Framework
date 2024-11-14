import { typeOf } from '../../Coutil/index.js'
import Content from '../Content/index.js'
import Validation from './Validation/index.js'
import {
  TypeValidator, RangeValidator, LengthValidator, EnumValidator, MatchValidator
} from './Validators/index.js'
import { Types, Primitives, Objects } from './Variables/index.js'
import Options from './Options/index.js' 
// const Validators = []
const ValidatorKeys = {
  type: ['type'], range: ['min', 'max'], length: ['minLength', 'maxLength']
}
export default class Schema extends EventTarget{
  options
  #properties
  #_contextType
  #_context
  constructor($properties = {}, $options = {}) {
    super()
    this.#properties = $properties
    this.options = Object.assign({}, Options, $options)
    this.context
  }
  get validationType() { return this.options.validationType }
  get contextType() {
    if(this.#_contextType !== undefined) return this.#_contextType
    if(Array.isArray(this.#properties)) { this.#_contextType = 'array' }
    else if(typeOf(this.#properties) === 'object') { this.#_contextType = 'object' }
    return this.#_contextType
  }
  get context() {
    if(this.#_context !== undefined) return this.#_context
    let properties
    if(this.contextType === 'array') {
      properties = this.#properties.slice(0, 1)
      this.#_context = []
    }
    else if(this.contextType === 'object') {
      properties = this.#properties 
      this.#_context = {}
    }
    iterateProperties: 
    for(const [
      $contextKey, $contextVal
    ] of Object.entries(properties)) {
      let contextVal
      // Context Val: Schema
      if($contextVal instanceof Schema) {
        this.#_context[$contextKey] = $contextVal
        continue iterateProperties
      }
      // Context Val: Object
      else if(typeof $contextVal.type === 'object') {
        this.#_context[$contextKey] = new Schema($contextVal.type, this.options)
        continue iterateProperties
      }
      // Context Val: Primitive
      else {
        this.#_context[$contextKey] = $contextVal
      }
      // Context Validators
      this.#_context[$contextKey].validators = [new TypeValidator()]
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
      this.#_context[$contextKey].validators = addValidators.concat(this.#_context[$contextKey].validators)
    }
    return this.#_context
  }
  validate($content) {
    if($content.classToString === Content.toString()) { $content = $content.object }
    let validateProperties
    if(this.contextType === 'array') { validateProperties = [] }
    else if(this.contextType === 'object') { validateProperties = {} }
    const Validation = {
      properties: validateProperties,
      valid: undefined,
    }
    const validation = Object.entries($content).reduce(
      ($validation, [
        $contentKey, $contentVal
      ], $validatorIndex, $contentEntries) => {
        const validation = this.validateProperty($contentKey, $contentVal)
        if(validation === null) return $validation
        if($validation.valid !== false) $validation.valid = validation.valid
        $validation.properties[$contentKey] = validation
        return $validation
      }, structuredClone(Validation)
    )
    return validation
  }
  validateProperty($key, $val) {
    const PropertyValidation = {
      key: $key,
      val: $val,
      advance: [], 
      deadvance: [], 
      unadvance: [], 
      valid: undefined, // Boolean
    }
    const propertyValidation = structuredClone(PropertyValidation)
    let validation
    let contextVal
    if(this.contextType === 'array') { contextVal = this.context[0] }
    else if(this.contextType === 'object') { contextVal = this.context[$key] }
    // Context Val: Undefined
    if(contextVal === undefined) {
      validation = new Validation({
        context: contextVal,
        contentKey: $key,
        contentVal: $val,
        type: 'key',
        valid: null,
      })
      propertyValidation.unadvance.push(validation)
      return propertyValidation
    }
    // Context Val: Object
    else if(contextVal instanceof Schema) {
      validation = contextVal.validate($val)
      // 
      if(validation.valid === true) { propertyValidation.advance.push(validation) }
      else if(validation.valid === false) { propertyValidation.deadvance.push(validation) }
      // 
      if(this.validationType === 'object') { propertyValidation.valid === validation.valid }
      else if(this.validationType === 'primitive') {
        propertyValidation.valid = (validation.valid === false)
          ? !validation.valid
          : validation.valid 
      }
    }
    // Context Val: Primitive
    else {
      validation = contextVal.validators.reduce(
        ($propertyValidation, $validator, $validatorIndex, $validators) => {
          const validation = $validator.validate(contextVal, $key, $val)
          // 
          if(validation.valid === true) { $propertyValidation.advance.push(validation) }
          else if(validation.valid === false) { $propertyValidation.deadvance.push(validation) }
          // 
          if($propertyValidation.valid !== false) $propertyValidation.valid = validation.valid
          return $propertyValidation
        }, propertyValidation
      )
    }
    return propertyValidation
  }
}