import { typeOf } from '../../Coutil/index.js'
import Content from '../Content/index.js'
import Validation from './Validation/index.js'
import {
  TypeValidator, RangeValidator, LengthValidator, EnumValidator, MatchValidator
} from './Validators/index.js'
import { Types, Primitives, Objects } from './Variables/index.js'
import Options from './Options/index.js' 
const Validators = [new TypeValidator()]
const ValidatorKeys = {
  type: ['type'], range: ['min', 'max'], length: ['minLength', 'maxLength']
}
export default class Schema extends EventTarget{
  settings
  options
  #_contextType
  #_context
  constructor($settings = {}, $options = {}) {
    super()
    this.settings = $settings
    this.options = Object.assign({}, Options, $options)
    this.context
  }
  get validationType() { return this.options.validationType }
  get contextType() {
    if(this.#_contextType !== undefined) return this.#_contextType
    if(Array.isArray(this.settings)) { this.#_contextType = 'array' }
    else if(typeOf(this.settings) === 'object') { this.#_contextType = 'object' }
    return this.#_contextType
  }
  get context() {
    if(this.#_context !== undefined) return this.#_context
    let settings
    if(this.contextType === 'array') {
      settings = this.settings.slice(0, 1)
      this.#_context = []
    }
    else if(this.contextType === 'object') {
      settings = this.settings 
      this.#_context = {}
    }
    for(const [
      $contextKey, $contextVal
    ] of Object.entries(settings)) {
      // Context Validators: Transform
      const addValidators = []
      // Context Validator: Add Range
      if(
        typeof settings[$contextKey].min === 'number' || 
        typeof settings[$contextKey].max === 'number'
      ) addValidators.push(new RangeValidator())
      // Context Validator: Add Length
      if(
        typeof settings[$contextKey].minLength === 'number' ||
        typeof settings[$contextKey].maxLength === 'number'
      ) addValidators.push(new LengthValidator())
      // Context Validator: Add Enum
      if(
        Array.isArray(settings[$contextKey].enum) &&
        settings[$contextKey].enum.length > 0
      ) addValidators.push(new EnumValidator())
      // Context Validators: Concat
      settings[$contextKey].validators = Validators.concat(
        addValidators, settings[$contextKey].validators || []
      )
      // Context Val Type: Schema Instance
      if(settings[$contextKey].type instanceof Schema) {
        this.#_context[$contextKey] = settings[$contextKey]
      }
      // Context Val Type: Primitive Prototype
      else if(Object.values(Primitives).includes(settings[$contextKey].type)) {
        this.#_context[$contextKey] = settings[$contextKey]
      }
      // Context Val Type: Object Prototype
      else if(Object.values(Objects).includes(settings[$contextKey].type)) {
        this.#_context[$contentKey] = new Schema(
          new settings[$contentKey].type(), this.options
        )
      }
      // Context Val Type: Object Literal
      else if(Object.keys(Objects).includes(typeOf(settings[$contextKey].type))) {
        this.#_context[$contextKey] = new Schema(
          settings[$contextKey].type, this.options
        )
      }
      // Context Val Type: Primitive Literal
      else {
        this.#_context[$contextKey] = settings[$contextKey]
      }
    }
    return this.#_context
  }
  validate($content) {
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