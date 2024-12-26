import { recursiveAssign, typedObjectLiteral } from '../../../../Coutil/index.js'
import Schema from '../../index.js'
import Validator from '../../Validator/index.js'
import Verification from '../../Verification/index.js'
export default class RequiredValidator extends Validator {
  constructor() {
    super(Object.assign(arguments[0], {
      type: 'required',
      validate: ($definition, $key, $value, $source, $target) => {
        const verification = new Verification({
          type: this.type,
          definition: $definition,
          key: $key,
          value: $value,
          messages: recursiveAssign(this.messages, $definition.type.messages),
        })
        let pass
        const content = $target || $source
        const { requiredProperties, requiredPropertiesSize } = this.schema
        // Corequirements
        const corequiredContext = typedObjectLiteral(this.schema.type)
        const corequiredContent = typedObjectLiteral(this.schema.type)
        iterateRequiredProperties: 
        for(const [
          $requiredPropertyName, $requiredProperty
        ] of Object.entries(requiredProperties)) {
          const contentPropertyDescriptor = Object.getOwnPropertyDescriptor(content, $requiredPropertyName)
          if($requiredPropertyName === $key) continue iterateRequiredProperties
          const corequiredProperty = {}
          iterateRequiredPropertyValidators: 
          for(const [
            $validationType, $validationSettings
          ] of Object.entries($requiredProperty)) {
            if($validationType === 'required') continue iterateRequiredPropertyValidators
            if($validationType === 'validators') {
              corequiredProperty[$validationType] =  $validationSettings.filter(
                ($Validator) => $Validator instanceof RequiredValidator === false
              )
            }
            else {
              try { corequiredProperty[$validationType] = structuredClone($validationSettings) }
              catch($err) { corequiredProperty[$validationType] = $validationSettings }
            }
          }
          corequiredContext[$requiredPropertyName] = corequiredProperty
          if(contentPropertyDescriptor === undefined) { continue iterateRequiredProperties }
          else { corequiredContent[$requiredPropertyName] = content[$requiredPropertyName] }
        }
        const corequiredContextSize = Object.keys(corequiredContext).length
        const corequiredContentSize = Object.keys(corequiredContent).length
        let coschema, coschemaValidation
        if(corequiredContextSize !== corequiredContentSize) { pass = false }
        else if(corequiredContextSize === corequiredContentSize) { pass = true }
        else {
          coschema = new Schema(corequiredContext, this.schema.options)
          coschemaValidation = coschema.validate(corequiredContent)
          pass = coschemaValidation.valid
        }
        verification.pass = pass
        return verification
      }
    }), arguments[1])
  }
}