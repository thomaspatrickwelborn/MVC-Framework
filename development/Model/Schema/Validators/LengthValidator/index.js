import { recursiveAssign } from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
import Schema from '../../index.js'
export default class LengthValidator extends Validator {
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'length',
      validate: ($context, $key, $value) => {
        const verification = new Verification({
          type: this.type,
          context: $context,
          key: $key,
          value: $value,
          messages: recursiveAssign(this.messages, $context.type.messages),
        })
        let pass
        if(typeof $value !== 'string') { pass = false }
        else {
          const { minLength, maxLength } = $context
          let validMin, validMax
          if(minLength.value !== undefined) {
            validMin = ($value.length >= minLength.value)
          }
          else { validMin = true }
          if(maxLength.value !== undefined) {
            validMax = ($value.length <= maxLength.value)
          }
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