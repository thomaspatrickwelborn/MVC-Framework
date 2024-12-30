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
      validate: ($definition, $key, $value, $source, $target) => {
        let verification = new Verification({
          type: this.type,
          definition: $definition,
          key: $key,
          value: $value,
          messages: recursiveAssign(this.messages, $definition.messages),
        })
        let pass
        let typeOfDefinitionValue = typeOf($definition.value)
        typeOfDefinitionValue = (typeOfDefinitionValue === 'function')
          ? typeOf($definition.value())
          : typeOfDefinitionValue
        const typeOfContentValue = typeOf($value)
        if(typeOfDefinitionValue === 'undefined') { pass = true }
        else if(typeOfDefinitionValue === typeOfContentValue) { pass = true }
        else { pass = false }
        verification.pass = pass
        return verification
      },
    }))
  }
}