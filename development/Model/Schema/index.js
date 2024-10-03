import { typeOf } from '../../Coutil/index.js'
import Content from '../Content/index.js'
import { TypeValidator } from './Validators/index.js'
import { Types, Primitives, Objects } from './Variables/index.js'
const Options = {
  enableValidation: true,
  validationType: 'property', // 'object', 
}
const Validators = [new TypeValidator()]
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
      settings[$contextKey].validators = Validators.concat(
        settings[$contextKey].validators || []
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
    }
    return this.#_context
  }
  validate($content) {
    return Object.entries($content).reduce(($validation, [
      $contentKey, $contentVal
    ], $validatorIndex, $contentEntries) => {
      const typeOfContentVal = typeOf($contentVal)
      let propertyValidation
      if(Object.keys(Primitives).includes(typeOfContentVal)) {
        propertyValidation = this.validateProperty($contentKey, $contentVal)
      }
      else if(this.contextType === 'array') {
        propertyValidation = this.context[0].validate($contentVal)
      }
      else if(this.contextType === 'object') {
        propertyValidation = this.context[$contentKey].validate($contentVal)
      }
      $validation.properties.push(propertyValidation)
      if($validatorIndex === $contentEntries.length - 1) {
        $validation.valid = !$validation.properties.find(
          ($propertyValidation) => $propertyValidation.valid === false
        )
      }
      return $validation
    }, {
      properties: [],
      valid: undefined,
    })
    return validation
  }
  validateProperty($key, $val) {
    const Validation = {
      advance: [], // Array
      deadvance: [], // Array
      valid: undefined, // Boolean
    }
    let contextVal
    switch(this.contextType) {
      case 'array': contextVal = this.context[0]; break
      case 'object': contextVal = this.context[$key]; break
    } 
    return contextVal.validators.reduce(
      ($validation, $validator, $validatorIndex, $validators) => {
        const validation = $validator.validate(
          contextVal, $key, $val
        )
        if(validation.valid === true) {
          $validation.advance.push(validation)
        }
        else if(validation.valid === false) {
          $validation.deadvance.push(validation)
        }
        if($validatorIndex === $validators.length - 1) {
          $validation.valid = (
            $validation.deadvance.length === 0
          ) ? true
            : false
        }
        return $validation
      }, Object.assign({}, Validation)
    )
  }
}