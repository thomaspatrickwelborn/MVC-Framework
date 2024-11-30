import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
import { Primitives, Objects } from '../../Variables/index.js'
import Schema from '../../index.js'

export default class LengthValidator extends Validator {
  #settings
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'length',
      validate: ($context, $key, $value) => {
        const { minLength, maxLength } = $context
        const verification = new Verification({
          context: $context,
          key: $key,
          value: $value,
          type: this.type,
        })
        let pass
        if(minLength !== undefined) {
          verification.minLength = minLength
          const validMinLength = ($value.length >= minLength)
          if(pass !== false) pass = validMinLength
        }
        if(maxLength !== undefined) {
          verification.maxLength = maxLength
          const validMaxLength = ($value.length <= maxLength)
          if(pass !== false) pass = validMaxLength
        }
        verification.pass = pass
        return verification
      },
    }))
  }
}