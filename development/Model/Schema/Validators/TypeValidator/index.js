import {
  typeOf, variables as Variables, recursiveAssign
} from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
import Schema from '../../index.js'
const { PrimitiveKeys, PrimitiveValues } = Variables
export default class TypeValidator extends Validator {
  constructor($definition = {}, $schema) {
    super(Object.assign($definition, {
      type: 'type',
      validate: ($key, $value, $source, $target) => {
        const definition = this.definition
        let verification = new Verification({
          type: this.type,
          definition: definition,
          key: $key,
          value: $value,
          messages: recursiveAssign(this.messages, definition.messages),
        })
        let pass
        let typeOfDefinitionValue = typeOf(definition.value)
        typeOfDefinitionValue = (typeOfDefinitionValue === 'function')
          ? typeOf(definition.value())
          : typeOfDefinitionValue
        const typeOfContentValue = typeOf($value)
        if(typeOfContentValue === 'undefined') { pass = false }
        else if(typeOfDefinitionValue === 'undefined') { pass = true }
        else { pass = (typeOfDefinitionValue === typeOfContentValue) }
        verification.pass = pass
        return verification
      },
    }), $schema)
  }
}