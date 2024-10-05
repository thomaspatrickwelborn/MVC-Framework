// 65535
import { Validator, Validation } from '/dependencies/mvc-framework.js'
const PortRange = { min: 1, max: 65535 }
export default class IPPortValidator extends Validator {
  #settings
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'ipPort',
      validate: ($context, $contentKey, $contentVal) => {
        let validation = new Validation({
          context: $context,
          contentKey: $contentKey,
          contentVal: $contentVal,
          type: this.type,
          valid: false,
        })
        if($contentVal >= PortRange.min && $contentVal <= PortRange.max) {
          validation.valid = true
        }
        return validation
      },
    }))
  }
}