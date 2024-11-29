import { typeOf } from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Verification from '../../Validation/index.js'
import { Primitives, Objects } from '../../Variables/index.js'
import Schema from '../../index.js'

export default class TypeValidator extends Validator {
  #settings
  constructor($settings = {}) {
    super(Object.assign($settings, {
      'type': 'type',
      'messages': {
        'true': ($validation) => `${$validation.valid}`,
        'false': ($validation) => `${$validation.valid}`,
      },
      'validate': ($context, $contentKey, $contentValue) => {
        let validation = new Verification({
          context: $context,
          contentKey: $contentKey,
          contentValue: $contentValue,
          type: this.type,
          valid: undefined,
          messages: this.messages,
        })
        const typeOfContentVal = typeOf($contentValue)
        const typeOfContextVal = ($context.type === undefined)
          ? $context.type
          : typeOf($context.type())
        if(
          Object.values(Primitives).includes($context.type) &&
          Object.keys(Primitives).includes(typeOfContentVal)
        ) {
          if(
            typeOfContextVal === typeOfContentVal ||
            typeOfContextVal === undefined
          ) { validation.valid = true }
          else { validation.valid = false }
        }
        return validation
      },
    }))
  }
}