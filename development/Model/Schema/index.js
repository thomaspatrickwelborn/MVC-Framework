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
  validateProperty($key, $val) {
    let validation
    if(this.contextType === 'array') {
      for(const $contextVal of this.context) {
        const { validators } = $contextVal
        validation = validators.reduce(
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
          }, {
            advance: [], // Array
            deadvance: [], // Array
            valid: undefined, // Boolean
          }
        )
      }
    }
    return validation
  }
}
