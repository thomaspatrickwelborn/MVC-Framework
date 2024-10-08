import { typeOf } from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Validation from '../../Validation/index.js'
import { Primitives, Objects } from '../../Variables/index.js'
import Schema from '../../index.js'

export default class EnumValidator extends Validator {
  #settings
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'length',
      validate: ($context, $contentKey, $contentVal) => {
        const enumeration = $context.enum
        const validation = new Validation({
          context: $context,
          contentKey: $contentKey,
          contentVal: $contentVal,
          type: this.type,
          valid: undefined,
        })
        validation.valid = enumeration.includes($contentVal)
        return validation
      },
    }))
  }
}