import { Validator, Validation } from '/dependencies/mvc-framework.js'
const RegularExpressions = {
  IPV4: new RegExp(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/),
  IPV6: new RegExp(/^(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}$/),
}
export default class IPHostValidator extends Validator {
  #settings
  constructor($settings = {}) {
    super(Object.assign($settings, {
      type: 'ipHost',
      validate: ($context, $contentKey, $contentVal) => {
        let validation = new Validation({
          context: $context,
          contentKey: $contentKey,
          contentVal: $contentVal,
          type: this.type,
          valid: false,
        })
        const ipv4Executive = RegularExpressions.IPV4.exec($contentVal)
        const ipv6Executive = RegularExpressions.IPV6.exec($contentVal)
        if(ipv4Executive !== null || ipv6Executive !== null) {
          validation.valid = true
        }
        return validation
      },
    }))
  }
}