import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
import { Primitives, Objects } from '../../Variables/index.js'
import Schema from '../../index.js'

export default class EnumValidator extends Validator {
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'length',
      validate: ($context, $key, $value) => {
        const enumeration = $context.enum
        const verification = new Verification({
          context: $context,
          key: $key,
          value: $value,
          type: this.type,
        })
        verification.pass = enumeration.includes($value)
        return verification
      },
    }))
  }
}