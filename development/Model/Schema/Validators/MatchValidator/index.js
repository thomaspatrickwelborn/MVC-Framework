import { recursiveAssign } from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
export default class MatchValidator extends Validator {
  constructor($settings = {}, $schema) {
    super(Object.assign($settings, {
      type: 'match',
      validate: ($key, $value, $source, $target) => {
        const definition = this.settings
        const verification = new Verification({
          type: this.type,
          definition: definition,
          key: $key,
          value: $value,
          messages: recursiveAssign(this.messages, definition.messages),
        })
        let pass
        if(![
          'string', 'number', 'boolean'
        ].includes(typeof $value)) { pass = false}
        else {
          const match = definition
          const valueMatch = (match.value.exec($value) !== null)
        }
        verification.pass = pass
          ? true
          : false
        return verification
      },
    }), $schema)
  }
}