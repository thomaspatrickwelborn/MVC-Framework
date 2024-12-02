import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
import Schema from '../../index.js'

export default class RangeValidator extends Validator {
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'range',
      validate: ($context, $key, $value) => {
        const verification = new Verification({
          context: $context,
          key: $key,
          value: $value,
          type: this.type,
        })
        let pass
        if(typeof $value !== 'number') { pass = false }
        else {
          const { min, max } = $context
          let validMin, validMax
          if(min !== undefined) { validMin = ($value >= min) }
          else { validMin = true }
          if(max !== undefined) { validMax = ($value <= max) }
          else { validMax = true }
          if(validMin && validMax) { pass = true }          
          else { pass = false}
        }
        verification.pass = pass
        return verification
      }
    }))
  }
}