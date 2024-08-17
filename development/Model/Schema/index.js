import { typeOf } from '../../Coutil/index.js'
import DynamicEventTarget from '../../Core/DynamicEventTarget/index.js'
const types = {
  'string': String,
  'number': Number,
  'boolean': Boolean,
  'object': Object,
  'array': Array,
  'map': Map,
}
export default class Schema {
  #root
  constructor($schema) {
    const type = typeOf($schema)
    const $this = this
    return new Proxy($schema, {
      get($target, $property) {
        return function($value) {
          let typeOfValue = types[typeOf($value)]
          // Array Type
          if(type === 'array') {
            const schemaIncludesTypeOfValue = $schema
            .includes(typeOfValue)
            if(schemaIncludesTypeOfValue === true) {
              return schemaIncludesTypeOfValue
            }
          } else 
          // Object, Map Type
          if(
            type === 'object' || 
            type === 'map'
          ) {
            const schemaPropertyIsTypeOfValue = $schema[$property] === typeOfValue
            if(schemaPropertyIsTypeOfValue === true) {
              return schemaPropertyIsTypeOfValue
            }
          }
        }
      },
      set($target, $property, $value) {
        if(typeof $value === 'object') {
          $value = new Schema($value)
        }
        $target[$property] = $value
        return true
      },
    })
  }
}
