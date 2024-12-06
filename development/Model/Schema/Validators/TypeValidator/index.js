import {
  typeOf, variables as Variables, recursiveAssign
} from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
const { PrimitiveKeys, PrimitiveValues } = Variables

export default class TypeValidator extends Validator {
  constructor($settings = {}) {
    super(Object.assign($settings, {
      'type': 'type',
      'validate': ($context, $key, $value) => {
        let verification = new Verification({
          type: this.type,
          context: $context,
          key: $key,
          value: $value,
          messages: recursiveAssign(this.messages, $context.type.messages),
        })
        let pass
        const typeOfContextVal = (
          $context.type.value === undefined || $context.type.value === null
        ) ? typeOf($context.type.value)
          : typeOf($context.type.value())
        const typeOfContentVal = typeOf($value)
        if(typeOfContentVal === 'undefined') { pass = false }
        else if(typeOfContextVal === 'undefined') { pass = true }
        else {
          if(
            PrimitiveValues.includes($context.type.value) &&
            PrimitiveKeys.includes(typeOfContentVal)
          ) {
            if(typeOfContextVal === typeOfContentVal) { pass = true }
            else { pass = false }
          }
        }
        verification.pass = pass
        return verification
      },
    }))
  }
}