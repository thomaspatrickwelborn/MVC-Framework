import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
import { Primitives, Objects } from '../../Variables/index.js'
import Schema from '../../index.js'

export default class LengthValidator extends Validator {
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'length',
      validate: ($context, $key, $value) => {
        const verification = new Verification({
          context: $context,
          key: $key,
          value: $value,
          type: this.type,
        })
        let pass
        if(typeof $value !== 'string') { pass = false }
        else {
          const { minLength, maxLength } = $context
          let validMin, validMax
          if(minLength !== undefined) { validMin = ($value.length >= minLength) }
          else { validMin = true }
          if(maxLength !== undefined) { validMax = ($value.length <= maxLength) }
          else { validMax = true }
          if(validMin && validMax) { pass = true }          
          else { pass = false}
        }
        verification.pass = pass
        return verification
      },
    }))
  }
}