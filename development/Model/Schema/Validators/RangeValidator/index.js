import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
import { Primitives, Objects } from '../../Variables/index.js'
import Schema from '../../index.js'

export default class RangeValidator extends Validator {
  #settings
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'range',
      validate: ($context, $key, $value) => {
        const { min, max } = $context
        const verification = new Verification({
          context: $context,
          key: $key,
          value: $value,
          type: this.type,
        })
        let pass = undefined
        if(min !== undefined) {
          verification.min = min
          const validMin = ($value >= min)
          if(pass !== false) pass = validMin
        }
        if(max !== undefined) {
          verification.max = max
          const validMax = ($value <= max)
          if(pass !== false) pass = validMax
        }
        verification.pass = pass
        return verification
      },
    }))
  }
}