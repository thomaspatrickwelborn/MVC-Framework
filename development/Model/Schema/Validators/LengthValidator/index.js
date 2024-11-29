import Validator from '../../Validator/index.js'
import Verification from '../../Validation/index.js'
import { Primitives, Objects } from '../../Variables/index.js'
import Schema from '../../index.js'

export default class LengthValidator extends Validator {
  #settings
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'length',
      validate: ($context, $contentKey, $contentValue) => {
        const { minLength, maxLength } = $context
        const validation = new Verification({
          context: $context,
          contentKey: $contentKey,
          contentValue: $contentValue,
          type: this.type,
          valid: undefined,
        })
        let valid = undefined
        if(minLength !== undefined) {
          validation.minLength = minLength
          const validMinLength = (contentValue.length >= minLength)
          if(valid !== false) valid = validMinLength
        }
        if(maxLength !== undefined) {
          validation.maxLength = maxLength
          const validMaxLength = (contentValue.length <= maxLength)
          if(valid !== false) valid = validMaxLength
        }
        validation.valid = valid
        return validation
      },
    }))
  }
}