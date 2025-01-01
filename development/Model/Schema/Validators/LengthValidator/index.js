import { recursiveAssign } from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
export default class LengthValidator extends Validator {
  constructor($definition = {}, $schema) {
    super(Object.assign($definition, {
      type: 'length',
      validate: ($key, $value, $source, $target) => {
        const definition = this.definition
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
        return pass
      },
    }), $schema)
  }
}