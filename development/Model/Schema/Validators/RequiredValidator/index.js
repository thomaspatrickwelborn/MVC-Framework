import { recursiveAssign, typedObjectLiteral } from '../../../../Coutil/index.js'
import Schema from '../../index.js'
import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
export default class RequiredValidator extends Validator {
  constructor($definition, $schema) {
    super(Object.assign($definition, {
      type: 'required',
      validate: ($key, $value, $source, $target) => {
        const definition = this.definition
        let pass
        const verification = new Verification({
          type: this.type,
          definition: definition,
          key: $key,
          value: $value,
          messages: recursiveAssign(this.messages, definition.messages),
        })
        const { requiredProperties, requiredPropertiesSize, type } = this.schema
        if(requiredPropertiesSize === 0) { pass = true }
        else if(type === 'object') {
          const corequiredContextProperties = typedObjectLiteral(type)
          const corequiredContentProperties = typedObjectLiteral(type)
          iterateRequiredProperties: 
          for(const [
            $requiredPropertyName, $requiredProperty
          ] of Object.entries(requiredProperties)) {
            if($requiredPropertyName === $key) { continue iterateRequiredProperties }
            const sourcePropertyDescriptor = Object.getOwnPropertyDescriptor($source, $requiredPropertyName)
            if(sourcePropertyDescriptor !== undefined) {
              corequiredContextProperties[$requiredPropertyName] = $requiredProperty
              corequiredContentProperties[$requiredPropertyName] = $source[$requiredPropertyName]
            }
            else if($target) {
              const targetPropertyDescriptor = Object.getOwnPropertyDescriptor($target, $requiredPropertyName)
              if(targetPropertyDescriptor !== undefined) { continue iterateRequiredProperties }
              else { corequiredContextProperties[$requiredPropertyName] = $requiredProperty }
            }
            else {
              corequiredContextProperties[$requiredPropertyName] = $requiredProperty
            }
          }
          const corequiredContextPropertiesSize = Object.keys(corequiredContextProperties).length
          const corequiredContentPropertiesSize = Object.keys(corequiredContentProperties).length
          if(
            corequiredContextPropertiesSize === 0 && corequiredContentPropertiesSize === 0 ||
            corequiredContextPropertiesSize !== corequiredContentPropertiesSize
          ) { pass = false }
          else {
            const coschema = new Schema(corequiredContextProperties, this.schema.options)
            const coschemaValidation = coschema.validate(corequiredContentProperties)
            pass = coschemaValidation.pass
          }
        }
        else if(type === 'array') {
          pass = true
        }
        verification.pass = pass
        return verification
      }
    }), $schema)
  }
}