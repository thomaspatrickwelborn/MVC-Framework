import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
import Schema from '../../index.js'
export default class MatchValidator extends Validator {
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
          const { match } = $context
          const valueMatch = (match.exec($value) !== null)
        }
        verification.pass = pass
          ? true
          : false
        return verification
      },
    }))
  }
}