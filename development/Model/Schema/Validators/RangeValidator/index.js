import Validator from '../../Validator/index.js'
import Validation from '../../Validation/index.js'
import { Primitives, Objects } from '../../Variables/index.js'
import Schema from '../../index.js'

export default class RangeValidator extends Validator {
  #settings
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'range',
      validate: ($context, $contentKey, $contentVal) => {
        const { min, max } = $context
        const validation = new Validation({
          context: $context,
          contentKey: $contentKey,
          contentVal: $contentVal,
          type: this.type,
          valid: undefined,
        })
        let valid = undefined
        if(min !== undefined) {
          validation.min = min
          const validMin = ($contentVal >= min)
          if(valid !== false) valid = validMin
        }
        if(max !== undefined) {
          validation.max = max
          const validMax = ($contentVal <= max)
          if(valid !== false) valid = validMax
        }
        validation.valid = valid
        return validation
      },
    }))
  }
}