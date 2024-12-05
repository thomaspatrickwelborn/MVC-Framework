import { typeOf, variables as Variables } from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
import Schema from '../../index.js'
const { Primitives, Objects } = Variables

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
          messages: this.messages,
        })
        let pass
        console.log("$context", $context)
        const typeOfContextVal = (
          $context.type === undefined || $context.type === null
        ) ? typeOf($context.type)
          : typeOf($context.type())
        const typeOfContentVal = typeOf($value)
        if(typeOfContentVal === 'undefined') { pass = false }
        else if(typeOfContextVal === 'undefined') { pass = true }
        else {
          if(
            Object.values(Primitives).includes($context.type) &&
            Object.keys(Primitives).includes(typeOfContentVal)
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