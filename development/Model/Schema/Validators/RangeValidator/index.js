import { recursiveAssign } from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
export default class RangeValidator extends Validator {
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'range',
      validate: ($definition, $key, $value) => {
        const verification = new Verification({
          type: this.type,
          definition: $definition,
          key: $key,
          value: $value,
          messages: recursiveAssign(this.messages, $definition.type.messages),
        })
        let pass
        if(typeof $value !== 'number') { pass = false }
        else {
          const { min, max } = $definition
          let validMin, validMax
          if(min.value !== undefined) { validMin = ($value >= min.value) }
          else { validMin = true }
          if(max.value !== undefined) { validMax = ($value <= max.value) }
          else { validMax = true }
          if(validMin && validMax) { pass = true }          
          else { pass = false}
        }
        verification.pass = pass
        return verification
      }
    }))
  }
}