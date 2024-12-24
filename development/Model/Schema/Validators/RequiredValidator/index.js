import { recursiveAssign, typedObjectLiteral } from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
export default class RequiredValidator extends Validator {
  constructor() {
    super(Object.assign(arguments[0], {
      type: 'required',
      validate: ($context, $key, $value, $source, $target) => {
        const verification = new Verification({
          type: this.type,
          context: $context,
          key: $key,
          value: $value,
          messages: recursiveAssign(this.messages, $context.type.messages),
        })
        let pass
        const content = $target || $source
        const { requiredProperties } = this.schema
        delete requiredProperties[$key]
        const requiredContent = typedObjectLiteral(this.schema.type)
        Object.keys(requiredProperties).forEach(($requiredProperty) => {
          delete requiredProperties[$requiredProperty]?.required
          requiredProperties[$requiredProperty].validators.splice(
            requiredProperties[$requiredProperty].validators.findIndex(
              ($validator) => $validator.type === 'required'
            ), 1
          )
          requiredContent[$requiredProperty] = content[$requiredProperty]
        })
        const requiredSchemaValidation = this.schema.validate(requiredContent)
        verification.pass = requiredSchemaValidation.valid
        return verification
      }
    }), arguments[1])
  }
}