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
    // Array Schema
    if(this.contextType === 'array') {
      this.#_context = []
      for(const [
        $contextKey, $contextValSettings
      ] of Object.entries(this.settings)) {
        if(
          Primitives.includes($contextValSettings.type) &&
          !this.#_context.find(($context) => {
            return $context.type === $contextValSettings.type
          })
        ) {
          $contextValSettings.validators = Validators.concat(
            $contextValSettings.validators || []
          )
          this.#_context.push($contextValSettings)
        }
        else if($contextValSettings.type instanceof Schema) {
          this.#_context.push($contextValSettings)
        }
        else if(Objects.includes($contextValSettings.type)) {
          this.#_context.push(new Schema($contextValSettings.type))
        }
      }
    }
    else if(this.contextType === 'object') {
      this.#_context = {}
    }
    return this.#_context
  }
  validate($content) {
    let validation = {
      properties: [],
      valid: undefined,
    }
    const contentEntries = Object.entries($content)
    contentEntries.reduce(($validation, [
      $validatorKey, $validatorVal
    ], $validatorIndex) => {
      const propertyValidation = this.validateProperty($validatorKey, $validatorval)
      $validation.properties.push(propertyValidation)
      if($validatorIndex === contentEntries.length - 1) {
        $validation.valid = !$validator.properties.find(
          ($propertyValidation) => $propertyValidation.valid === false
        )
      }
      return $validation
    }, validation)
    return validation
  }
  validateProperty($key, $val) {
    let validation = {
      advance: [], // Array
      deadvance: [], // Array
      valid: undefined, // Boolean
    }
    if(this.contextType === 'array') {
      for(const $contextVal of this.context) {
        const { validators } = $contextVal
        validators.reduce(
          ($validation, $validator, $validatorIndex) => {
            const arrayValidation = $validator.validateArray(
              this.context, $key, $val
            )
            if(arrayValidation.valid === true) {
              $validation.advance.push(arrayValidation)
            }
            else if(arrayValidation.valid === false) {
              $validation.deadvance.push(arrayValidation)
            }
            if($validatorIndex === validators.length - 1) {
              $validation.valid = (
                $validation.deadvance.length === 0
              ) ? true
                : false
            }
            return $validation
          }, validation
        )
      }
    }
    return validation
  }
}
