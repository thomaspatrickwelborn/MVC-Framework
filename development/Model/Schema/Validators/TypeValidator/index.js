import { typeOf } from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Validation from '../../Validation/index.js'
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
      'validate': ($context, $contentKey, $contentVal) => {
        let validation = new Validation({
          context: $context,
          contentKey: $contentKey,
          contentVal: $contentVal,
          type: this.type,
          valid: undefined,
          messages: this.messages,
        })
        const typeOfContentVal = typeOf($contentVal)
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