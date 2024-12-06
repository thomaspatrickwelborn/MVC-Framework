import { recursiveAssign } from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
import Schema from '../../index.js'
export default class EnumValidator extends Validator {
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'length',
      validate: ($context, $key, $value) => {
        const verification = new Verification({
          type: this.type,
          context: $context,
          key: $key,
          value: $value,
          messages: recursiveAssign(this.messages, $context.type.messages),
        })
        let pass
        if(![
          'string', 'number', 'boolean'
        ].includes(typeof $value)) { pass = false}
        else {
          const enumeration = $context.enum.value
          pass = enumeration.includes($value)
        }
        verification.pass = pass
        return verification
      },
    }))
  }
}