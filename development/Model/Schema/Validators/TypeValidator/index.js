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
        let typeOfContextValue = typeOf($context.type.value)
        typeOfContextValue = (typeOfContextValue === 'function')
          ? typeOf($context.type.value())
          : typeOfContextValue
        const typeOfContentValue = typeOf($value)
        if(typeOfContentValue === 'undefined') { pass = false }
        else if(typeOfContextValue === 'undefined') { pass = true }
        else {
          if(
            PrimitiveValues.includes($context.type.value) &&
            PrimitiveKeys.includes(typeOfContentValue)
          ) {
            if(typeOfContextValue === typeOfContentValue) { pass = true }
            else { pass = false }
          }
        }
        verification.pass = pass
        return verification
      },
    }))
  }
}