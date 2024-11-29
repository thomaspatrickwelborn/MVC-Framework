import Validator from '../../Validator/index.js'
import Verification from '../../Validation/index.js'
import { Primitives, Objects } from '../../Variables/index.js'
import Schema from '../../index.js'

export default class RangeValidator extends Validator {
  #settings
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'range',
      validate: ($context, $contentKey, $contentValue) => {
        const { min, max } = $context
        const validation = new Verification({
          context: $context,
          contentKey: $contentKey,
          contentValue: $contentValue,
          type: this.type,
          valid: undefined,
        })
        let valid = undefined
        if(min !== undefined) {
          validation.min = min
          const validMin = ($contentValue >= min)
          if(valid !== false) valid = validMin
        }
        if(max !== undefined) {
          validation.max = max
          const validMax = ($contentValue <= max)
          if(valid !== false) valid = validMax
        }
        validation.valid = valid
        return validation
      },
    }))
  }
}