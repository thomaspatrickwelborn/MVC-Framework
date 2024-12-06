import { recursiveAssign } from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
export default class MatchValidator extends Validator {
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
          const { match } = $context
          const valueMatch = (match.value.exec($value) !== null)
        }
        verification.pass = pass
          ? true
          : false
        return verification
      },
    }))
  }
}