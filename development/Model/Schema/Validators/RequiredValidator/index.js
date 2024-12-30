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
          messages: recursiveAssign(this.messages, $definition.messages),
        })
        if($definition.value === false) {
          verification.pass = true
          return verification
        }
        const requiredContextProperties = this.schema.requiredProperties
        const corequiredContextProperties = typedObjectLiteral(this.schema.type)
        let corequiredContentProperties = {
          source: typedObjectLiteral(this.schema.type),
          target: typedObjectLiteral(this.schema.type),
        }
        for(const [
          $requiredContextPropertyName, $requiredContextPropertyDefintition
        ] of Object.entries(requiredContextProperties)) {
          if(Number.isNaN(Number($requiredContextPropertyName))) {
            if($requiredContextPropertyName !== $key) {
              if(Object.getOwnPropertyDescriptor($source, $requiredContextPropertyName)) {
                corequiredContentProperties.source[$requiredContextPropertyName] = $source[$requiredContextPropertyName]
              }
              else if(Object.getOwnPropertyDescriptor($target, $requiredContextPropertyName)) {
                corequiredContentProperties.target[$requiredContextPropertyName] = $target[$requiredContextPropertyName]
              }
            }
          }
          else {
            for(const [$sourcePropertyName, $sourceProperty] of Object.entries($source)) {
              if(Number($sourcePropertyName) !== Number($key)) {
                corequiredContentProperties.source.push($source[$sourcePropertyName])
              }
            }
          }
          const corequiredContextPropertyDefinition = {
            required: { value: false },
            validators: $requiredContextPropertyDefintition.validators.filter(
              ($validator) => $validator instanceof RequiredValidator === false
            )
          }
          corequiredContextProperties[$requiredContextPropertyName] = Object.assign(
            {}, $requiredContextPropertyDefintition, corequiredContextPropertyDefinition
          )
        }
        if(this.schema.type === 'array') {
          corequiredContentProperties = Array.prototype.concat(
            corequiredContentProperties.source, corequiredContentProperties.target
          )
        }
        else if(this.schema.type === 'object') {
          corequiredContentProperties = Object.assign(
            {}, corequiredContentProperties.target, corequiredContentProperties.source
          )
        }
        const coschema = new Schema(corequiredContextProperties)
        const coschemaValidation = coschema.validate(corequiredContentProperties)
        let pass = coschemaValidation.valid
        verification.pass = pass
        return verification
      }
    }), arguments[1])
  }
}