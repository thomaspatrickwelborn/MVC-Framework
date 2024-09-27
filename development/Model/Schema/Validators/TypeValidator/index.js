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
              validation.contextVal = $contextVal
              validation.valid = true
              break iterateContextProperties
            } else if(contextValIndex === $context.length - 1) {
              validation.valid = false
            }
          }
          // Context Property: Schema
          // else if(
          //   // Context Val Type Instance Of Schema
          //   $contextVal.type instanceof Schema &&
          //   // Object Types Include Content Val Type
          //   ['object', 'array'].includes(typeOfContentVal) 
          // ) {
          //   const schemaValidation = $contextVal.validate($contentVal)
          //   if(schemaValidation.valid === true) {
          //     validation.valid = true
          //     break iterateContextProperties
          //   }
          // }
          contextValIndex++
        }
        return validation
      },
      // Validate Object
      validateObject: ($context, $contentKey, $contentVal) => {},
    }))
  }
}