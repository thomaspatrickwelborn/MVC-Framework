import {
  typeOf, variables as Variables, recursiveAssign
} from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
const { PrimitiveKeys, PrimitiveValues } = Variables

export default class TypeValidator extends Validator {
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'type',
      validate: ($definition, $key, $value) => {
        let verification = new Verification({
          type: this.type,
          definition: $definition,
          key: $key,
          value: $value,
          messages: recursiveAssign(this.messages, $definition.type.messages),
        })
        let pass
        let typeOfDefinitionValue = typeOf($definition.type.value)
        typeOfDefinitionValue = (typeOfDefinitionValue === 'function')
          ? typeOf($definition.type.value())
          : typeOfDefinitionValue
        const typeOfContentValue = typeOf($value)
        if(typeOfContentValue === 'undefined') { pass = false }
        else if(typeOfDefinitionValue === 'undefined') { pass = true }
        else {
          if(
            PrimitiveValues.includes($definition.type.value) &&
            PrimitiveKeys.includes(typeOfContentValue)
          ) {
            if(typeOfDefinitionValue === typeOfContentValue) { pass = true }
            else { pass = false }
          }
        }
        verification.pass = pass
        return verification
      },
    }))
  }
}