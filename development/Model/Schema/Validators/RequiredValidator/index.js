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
        const { requiredProperties, requiredPropertiesSize } = this.context
        if(requiredPropertiesSize === 0) { pass = true }
        else {
          // Corequirements
          const corequiredContext = typedObjectLiteral(this.context.type)
          const corequiredContent = typedObjectLiteral(this.context.type)
          iterateRequiredProperties: 
          for(const [
            $requiredPropertyName, $requiredProperty
          ] of Object.entries(requiredProperties)) {
            // if($requiredPropertyName === $key) continue iterateRequiredProperties
            const corequiredContextProperty = {}
            iterateRequiredPropertyValidators: 
            for(const [
              $validationType, $validationSettings
            ] of Object.entries($requiredProperty)) {
              if($validationType === 'required') continue iterateRequiredPropertyValidators
              if($validationType === 'validators') {
                corequiredContextProperty[$validationType] =  $validationSettings.filter(
                  ($Validator) => $Validator instanceof RequiredValidator === false
                )
              }
              else {
                try { corequiredContextProperty[$validationType] = structuredClone($validationSettings) }
                catch($err) { corequiredContextProperty[$validationType] = $validationSettings }
              }
            }
            corequiredContext[$requiredPropertyName] = corequiredContextProperty
            if(Object.getOwnPropertyDescriptor(content, $requiredPropertyName) !== undefined) { 
              corequiredContent[$requiredPropertyName] = content[$requiredPropertyName]
            }
          }
          const corequiredContextSize = Object.keys(corequiredContext).length
          const corequiredContentSize = Object.keys(corequiredContent).length
          if(corequiredContextSize !== corequiredContentSize) { pass = false }
          else {
            const coschema = new Schema(corequiredContext, this.context.options)
            const coschemaValidation = coschema.validate(corequiredContent)
            pass = coschemaValidation.valid
          }
        }
        verification.pass = pass
        return verification
      }
    }), arguments[1])
  }
}