import { typeOf } from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Validation from '../../Validation/index.js'
import Schema from '../../index.js'

export default class TypeValidator extends Validator {
  #settings
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'type',
      validate: ($contextVal, $contentKey, $contentVal) => {
        let validation = new Validation({
          contextVal: $contextVal,
          contentKey: $contentKey,
          contentVal: $contentVal,
          type: this.type,
          validation: undefined,
        })
        const typeOfContentVal = typeOf($contentVal)
        const typeOfContextVal = typeOf($contextVal.type())
        if(
          [Number, String, Boolean].includes($contextVal.type) &&
          ['number', 'string', 'boolean'].includes(typeOfContentVal)
        ) {
          if(typeOfContextVal === typeOfContentVal) {
            validation.valid = true
          }
          else {
            validation.valid = false
          }
        }
        return validation
      },
    }))
  }
}