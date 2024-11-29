import Validator from '../../Validator/index.js'
import Verification from '../../Validation/index.js'
import { Primitives, Objects } from '../../Variables/index.js'
import Schema from '../../index.js'

export default class EnumValidator extends Validator {
  #settings
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'length',
      validate: ($context, $contentKey, $contentValue) => {
        const enumeration = $context.enum
        const validation = new Verification({
          context: $context,
          contentKey: $contentKey,
          contentValue: $contentValue,
          type: this.type,
          valid: undefined,
        })
        validation.valid = enumeration.includes($contentValue)
        return validation
      },
    }))
  }
}