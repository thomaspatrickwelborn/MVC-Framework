import { recursiveAssign } from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
export default class LengthValidator extends Validator {
  constructor($definition = {}, $schema) {
    super(Object.assign($definition, {
      type: 'length',
      validate: ($key, $value, $source, $target) => {
        const definition = this.definition
        const verification = new Verification({
          type: this.type,
          definition: definition,
          key: $key,
          value: $value,
          messages: recursiveAssign(this.messages, definition.messages),
        })
        let pass
        if(typeof $value !== 'string') { pass = false }
        else {
          const { minLength, maxLength } = definition
          let validMin, validMax
          if(minLength.value !== undefined) {
            validMin = ($value.length >= minLength.value)
          }
          else { validMin = true }
          if(maxLength.value !== undefined) {
            validMax = ($value.length <= maxLength.value)
          }
          else { validMax = true }
          if(validMin && validMax) { pass = true }          
          else { pass = false}
        }
        verification.pass = pass
        return verification
      },
    }), $schema)
  }
}