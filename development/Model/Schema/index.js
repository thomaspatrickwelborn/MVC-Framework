import { typeOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../Core/DynamicEventTarget/index.js'
import { TypeValidator } from './Validators/index.js'
import { Types, Primitives, Objects } from './Variables/index.js'
const Settings = {}
const Options = {
  validation: true,
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
    this.options = $options
    this.context
  }
  get contextType() {
    if(this.#_contextType !== undefined) return this.#_contextType
    this.#_contextType = typeOf(this.settings)
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
      // Context Val Type: Primitive
      if(Object.values(Primitives).includes(settings[$contextKey].type)) {
        this.#_context[$contextKey] = settings[$contextKey]
      }
      // Context Val Type: Object
      else if(Object.keys(Objects).includes(typeOf(settings[$contextKey].type))) {
        this.#_context[$contextKey] = new Schema(
          settings[$contextKey].type, this.options
        )
      }
      // Context Val Type: Schema Instance
      else if(settings[$contextKey].type instanceof Schema) {
        this.#_context[$contextKey] = settings[$contextKey]
      }
    }
    // // Array Schema
    // if(this.contextType === 'array') {
    //   this.#_context = []
    //   // Context Validators
    //   this.settings[0].validators = Validators.concat(
    //     this.settings[0].validators || []
    //   )
    //   // Context Val Type: Primitive
    //   if(Object.values(Primitives).includes(this.settings[0].type)) {
    //     this.#_context[0] = this.settings[0]
    //   }
    //   // Context Val Type: Object
    //   else if(Object.keys(Objects).includes(typeOf(this.settings[0].type))) {
    //     this.#_context[0] = new Schema(
    //       this.settings[0].type, this.options
    //     )
    //   }
    //   // Context Val Type: Schema Instance
    //   else if(this.settings[0].type instanceof Schema) {
    //     this.#_context[0] = this.settings[0]
    //   }
    // }
    // // Object Schema
    // else if(this.contextType === 'object') {
    //   this.#_context = []
    //   for(const [
    //     $contextKey, $contextVal
    //   ] of Object.entries(this.settings)) {
    //     this.settings[$key].validators = Validators.concat(
    //       this.settings[$key].validators || []
    //     )
    //     // Context Val Type: Primitive
    //     if(Object.values(Primitives).includes(this.settings[$key].type)) {
    //       this.#_context[$key] = this.settings[$key]
    //     }
    //     // Context Val Type: Object
    //     else if(Object.keys(Objects).includes(typeOf(this.settings[$key].type))) {
    //       this.#_context[$key] = new Schema(
    //         this.settings[$key].type, this.options
    //       )
    //     }
    //     // Context Val Type: Schema Instance
    //     else if(this.settings[$key].type instanceof Schema) {
    //       this.#_context[$key] = this.settings[$key]
    //     }
    //   }
    // }
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
      else if(typeOfContentVal === 'array') {
        propertyValidation = this.context[0].validate($contentVal)
      }
      else if(typeOfContentVal === 'object') {
        propertyValidation = this.context[$contentKey].validate($contentVal)
      }
      // >>><<<
      console.log(propertyValidation)
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
    let context
    if(this.contextType === 'array') {
      context = this.context[0]
      return context.validators.reduce(
        ($validation, $validator, $validatorIndex, $validators) => {
          const validation = $validator.validateArray(
            this.context, $key, $val
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
        }, Object.create(Validation)
      )
    }
    else if(this.contextType === 'object') {
      context = this.context[$key]
      return context.validators.reduce(
        ($validation, $validator, $validatorIndex, $validators) => {
          const validation = $validator.validateObject(
            this.context, $key, $val
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
        }, Object.create(Validation)
      )
    }
    
  }
}