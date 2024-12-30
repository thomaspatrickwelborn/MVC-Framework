import { recursiveAssign } from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
export default class EnumValidator extends Validator {
  constructor($definition = {}, $schema) {
    super(Object.assign($definition, {
      type: 'enum',
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
        if(![
          'string', 'number', 'boolean'
        ].includes(typeof $value)) { pass = false}
        else {
          const enumeration = definition.value
          pass = enumeration.includes($value)
        }
        verification.pass = pass
        return verification
      },
    }), $schema)
  }
}