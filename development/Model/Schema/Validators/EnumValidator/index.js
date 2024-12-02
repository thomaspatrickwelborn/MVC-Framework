import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
import Schema from '../../index.js'
export default class EnumValidator extends Validator {
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'length',
      validate: ($context, $key, $value) => {
        const verification = new Verification({
          context: $context,
          key: $key,
          value: $value,
          type: this.type,
        })
        let pass
        if(!['string', 'number', 'boolean'].includes(typeof $value)) { pass = false}
        else {
          const enumeration = $context.enum
          pass = enumeration.includes($value)
          }
        verification.pass = pass
        return verification
      },
    }))
  }
}