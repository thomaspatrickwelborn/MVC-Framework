import { recursiveAssign } from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
export default class RequiredValidator extends Validator {
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'range',
      validate: ($context, $key, $value) => {
        const verification = new Verification({
          type: this.type,
          context: $context,
          key: $key,
          value: $value,
          messages: recursiveAssign(this.messages, $context.type.messages),
        })
        let pass
        verification.pass = pass
        return verification
      }
    }))
  }
}