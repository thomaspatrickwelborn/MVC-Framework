import { typeOf } from '../../../../Coutil/index.js'
import Validator from '../../Validator/index.js'
import Validation from '../../Validation/index.js'
import Schema from '../../index.js'

export default class TypeValidator extends Validator {
  #settings
  constructor($settings = {}) {
    super(Object.assign($settings, {
      // Type
      type: 'type',
      // Validate Array
      validateArray: ($context, $contentKey, $contentVal) => {
        let validation = new Validation({
          contentKey: $contentKey,
          contentVal: $contentVal,
          type: this.type,
        })
        const typeOfContentVal = typeOf($contentVal)
        let contextValIndex = 0
        iterateContextProperties: 
        for(const $contextVal of $context) {
          validation.contextVal = $contextVal.type
          const typeOfContextVal = typeof $contextVal.type()
          // Context Property: Primitive
          if(
            // Primitives Include Context Val Type
            [Number, String, Boolean].includes($contextVal.type) &&
            // Primitive Types Include Content Val Type
            ['number', 'string', 'boolean'].includes(typeOfContentVal)
          ) {
            // Context Val Type Strictly Equals Content Val Type  
            if(typeOfContextVal === typeOfContentVal) {
              validation.valid = true
              break iterateContextProperties
            } else if(contextValIndex === $context.length - 1) {
              validation.valid = false
              break iterateContextProperties
            }
          }
          contextValIndex++
        }
        return validation
      },
      // Validate Object
      validateObject: ($context, $contentKey, $contentVal) => {
        console.log(
          '\n', '$context', $context,
          '\n', '$contentKey', $contentKey,
          '\n', '$contentVal', $contentVal,
        )
        // let validation = new Validation({
        //   contentKey: $contentKey,
        //   contentVal: $contentVal,
        //   type: this.type,
        // })
        // const typeOfContentVal = typeOf($contentVal)

      },
    }))
  }
}